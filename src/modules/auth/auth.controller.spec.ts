import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../../shared/enums/user-role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockAuthService = {
    login: jest.fn(),
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'secret123',
    };

    const loginResponse = {
      access_token: 'signed_jwt',
      user: {
        id: 'uuid-1',
        email: 'test@example.com',
        role: UserRole.RECRUITER,
        companyId: 'company-1',
      },
    };

    it('should delegate to authService.login and return the result', async () => {
      authService.login.mockResolvedValue(loginResponse);

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(loginResponse);
    });

    it('should propagate errors thrown by authService.login', async () => {
      authService.login.mockRejectedValue(new Error('Service error'));

      await expect(controller.login(loginDto)).rejects.toThrow('Service error');
    });
  });

  describe('getProfile', () => {
    it('should delegate to authService.getProfile with the userId param', async () => {
      const userId = 'uuid-1';
      const profileResult = { id: userId, email: 'test@example.com' };
      authService.getProfile.mockResolvedValue(profileResult as any);

      const result = await controller.getProfile({ user: { sub: userId } });

      expect(authService.getProfile).toHaveBeenCalledWith(userId);
      expect(result).toEqual(profileResult);
    });

    it('should return null when authService.getProfile returns null', async () => {
      authService.getProfile.mockResolvedValue(null);

      const result = await controller.getProfile({
        user: { sub: 'non-existent-id' },
      });

      expect(result).toBeNull();
    });
  });
});
