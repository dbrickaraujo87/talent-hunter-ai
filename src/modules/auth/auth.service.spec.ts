import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UserRole } from '../../shared/enums/user-role.enum';
import { LoginDto } from './dto/login.dto';

jest.mock('bcrypt');

const mockAuth: Auth = {
  id: 'uuid-1',
  email: 'test@example.com',
  password: 'hashed_password',
  role: UserRole.RECRUITER,
  companyId: 'company-1',
  name: 'Test User',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  hashPassword: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<Repository<Auth>>;
  let jwtService: jest.Mocked<JwtService>;

  const mockAuthRepository = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Auth), useValue: mockAuthRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(getRepositoryToken(Auth));
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      authRepository.findOne.mockResolvedValue(null);

      await expect(
        service.validateUser('notfound@example.com', 'any_pass'),
      ).rejects.toThrow(new UnauthorizedException('User not found'));

      expect(authRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'notfound@example.com' },
      });
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      authRepository.findOne.mockResolvedValue(mockAuth);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateUser('test@example.com', 'wrong_pass'),
      ).rejects.toThrow(new UnauthorizedException('Invalid password'));
    });

    it('should return the user when credentials are valid', async () => {
      authRepository.findOne.mockResolvedValue(mockAuth);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(
        'test@example.com',
        'correct_pass',
      );

      expect(result).toEqual(mockAuth);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'correct_pass',
        mockAuth.password,
      );
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'correct_pass',
    };

    beforeEach(() => {
      authRepository.findOne.mockResolvedValue(mockAuth);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValue('signed_jwt_token');
    });

    it('should return an access token and user info on valid credentials', async () => {
      const result = await service.login(loginDto);

      expect(result).toEqual({
        access_token: 'signed_jwt_token',
        user: {
          id: mockAuth.id,
          email: mockAuth.email,
          role: mockAuth.role,
          companyId: mockAuth.companyId,
        },
      });
    });

    it('should sign the JWT with the correct payload', async () => {
      await service.login(loginDto);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockAuth.email,
        sub: mockAuth.id,
        role: mockAuth.role,
        companyId: mockAuth.companyId,
      });
    });

    it('should propagate UnauthorizedException when validateUser fails', async () => {
      authRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the user matching the userId in req.params', async () => {
      const req = { params: { userId: 'uuid-1' } };
      authRepository.findOne.mockResolvedValue(mockAuth);

      const result = await service.getProfile(req);

      expect(authRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
      });
      expect(result).toEqual(mockAuth);
    });

    it('should return null when the user is not found', async () => {
      const req = { params: { userId: 'non-existent-id' } };
      authRepository.findOne.mockResolvedValue(null);

      const result = await service.getProfile(req);

      expect(result).toBeNull();
    });
  });
});
