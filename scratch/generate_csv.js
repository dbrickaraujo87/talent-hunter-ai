const fs = require('fs');
const path = require('path');

const tasks = [
  {
    id: 'TASK-01',
    ordem: 1,
    fase: 'Fase 1: Correções Críticas de Segurança & Integridade',
    prioridade: 'Crítica',
    categoria: 'Segurança',
    modulo: 'users / auth',
    arquivos: 'src/modules/users/entities/users.entity.ts, src/modules/auth/auth.service.ts',
    titulo: 'Ocultar hash de senha e proteger endpoint getProfile',
    descricao: 'Adicionar @Exclude() na propriedade password da User entity. Alterar getProfile no AuthService para selecionar apenas campos seguros (id, name, email, role, companyId, isActive, createdAt) evitando vazamento do hash bcrypt na resposta HTTP.',
    esforco: '1h',
    status: 'Pendente'
  },
  {
    id: 'TASK-02',
    ordem: 2,
    fase: 'Fase 1: Correções Críticas de Segurança & Integridade',
    prioridade: 'Crítica',
    categoria: 'Segurança',
    modulo: 'auth',
    arquivos: 'src/modules/auth/strategies/jwt.strategy.ts',
    titulo: 'Remover fallback inseguro da JWT_SECRET',
    descricao: 'Remover a string estática defaultSecret como fallback da JWT_SECRET. Lançar uma exceção explícita no construtor da JwtStrategy caso a variável de ambiente não esteja definida.',
    esforco: '0.5h',
    status: 'Pendente'
  },
  {
    id: 'TASK-03',
    ordem: 3,
    fase: 'Fase 1: Correções Críticas de Segurança & Integridade',
    prioridade: 'Crítica',
    categoria: 'Bug / Correção',
    modulo: 'jobs / companies / candidates',
    arquivos: 'src/modules/jobs/jobs.controller.ts, src/modules/jobs/jobs.service.ts, src/modules/companies/companies.controller.ts',
    titulo: 'Corrigir conversão de ID (+id) para UUID (string)',
    descricao: 'Remover o operador unário +id nos parâmetros de rota @Param("id"). Alterar o tipo de id para string com ParseUUIDPipe e atualizar a assinatura dos serviços correspondentes.',
    esforco: '1.5h',
    status: 'Pendente'
  },
  {
    id: 'TASK-04',
    ordem: 4,
    fase: 'Fase 1: Correções Críticas de Segurança & Integridade',
    prioridade: 'Crítica',
    categoria: 'Bug / Correção',
    modulo: 'jobs',
    arquivos: 'src/modules/jobs/jobs.service.ts, src/modules/jobs/jobs.controller.ts',
    titulo: 'Ajustar retorno de JobsService.create() e HTTP Exceptions',
    descricao: 'Alterar o retorno de JobsService.create() para devolver a entidade Job criada ao invés da Promise void do RabbitMQ. Substituir throw new Error() genéricos por BadRequestException e InternalServerErrorException.',
    esforco: '1h',
    status: 'Pendente'
  },
  {
    id: 'TASK-05',
    ordem: 5,
    fase: 'Fase 1: Correções Críticas de Segurança & Integridade',
    prioridade: 'Crítica',
    categoria: 'Limpeza de Código',
    modulo: 'shared',
    arquivos: 'src/shared/database/database.condig.ts',
    titulo: 'Remover arquivo vazio database.condig.ts',
    descricao: 'Deletar o arquivo database.condig.ts que está zerado (0 bytes) e possui erro de digitação no nome.',
    esforco: '0.1h',
    status: 'Pendente'
  },
  {
    id: 'TASK-06',
    ordem: 6,
    fase: 'Fase 2: Validações, Swagger & Infraestrutura',
    prioridade: 'Alta',
    categoria: 'Validação de Dados',
    modulo: 'Todos os módulos (jobs, candidates, companies, etc.)',
    arquivos: 'src/modules/*/dto/*.dto.ts',
    titulo: 'Adicionar validações (class-validator) em todos os DTOs',
    descricao: 'Incluir decorators (@IsString(), @IsNotEmpty(), @IsNumber(), @IsEmail(), @IsArray(), @IsUUID(), @Min(), etc.) nos DTOs de entrada para acionar a validação do ValidationPipe global.',
    esforco: '3h',
    status: 'Pendente'
  },
  {
    id: 'TASK-07',
    ordem: 7,
    fase: 'Fase 2: Validações, Swagger & Infraestrutura',
    prioridade: 'Alta',
    categoria: 'Documentação',
    modulo: 'Todos os módulos',
    arquivos: 'src/modules/*/*.controller.ts, src/modules/*/dto/*.dto.ts',
    titulo: 'Enriquecer a documentação Swagger OpenAPI em /talent-api',
    descricao: 'Decorar controllers com @ApiTags(), @ApiOperation(), @ApiResponse(), @ApiBearerAuth() e DTOs com @ApiProperty() para gerar a documentação interativa.',
    esforco: '3h',
    status: 'Pendente'
  },
  {
    id: 'TASK-08',
    ordem: 8,
    fase: 'Fase 2: Validações, Swagger & Infraestrutura',
    prioridade: 'Alta',
    categoria: 'Arquitetura / Infra',
    modulo: 'shared',
    arquivos: 'src/shared/messaging/shared-messaging.module.ts',
    titulo: 'Migrar SharedMessagingModule para forRootAsync',
    descricao: 'Substituir a leitura direta de process.env.RABBITMQ_URL por RabbitMQModule.forRootAsync com injeção do ConfigService para aderir às boas práticas do NestJS.',
    esforco: '1h',
    status: 'Pendente'
  },
  {
    id: 'TASK-09',
    ordem: 9,
    fase: 'Fase 2: Validações, Swagger & Infraestrutura',
    prioridade: 'Média',
    categoria: 'Banco de Dados',
    modulo: 'users',
    arquivos: 'src/modules/users/entities/users.entity.ts',
    titulo: 'Tratar hashing de senha do TypeORM para operações de Update',
    descricao: 'Verificar e tratar a atualização de senha para garantir que o hash seja gerado se a senha for alterada e prevenir re-hashing indevido de hashes já gerados.',
    esforco: '1h',
    status: 'Pendente'
  },
  {
    id: 'TASK-10',
    ordem: 10,
    fase: 'Fase 3: Lógica de Negócio & Consumidores RabbitMQ',
    prioridade: 'Alta',
    categoria: 'Mensageria',
    modulo: 'hunter-engine',
    arquivos: 'src/modules/hunter-engine/hunter-engine.consumer.ts, hunter-engine.service.ts',
    titulo: 'Implementar lógica do Consumidor HunterEngineConsumer',
    descricao: 'Implementar a busca/garimpo de candidatos no handler handleJobAnalyzed ao receber o evento job.analyzed do RabbitMQ.',
    esforco: '4h',
    status: 'Pendente'
  },
  {
    id: 'TASK-11',
    ordem: 11,
    fase: 'Fase 3: Lógica de Negócio & Consumidores RabbitMQ',
    prioridade: 'Alta',
    categoria: 'Mensageria',
    modulo: 'ai-analyzer / profile-enricher / matching / outreach',
    arquivos: 'src/modules/*/*.consumer.ts',
    titulo: 'Criar consumidores RabbitMQ para as filas restantes',
    descricao: 'Implementar as classes consumidoras decoradas com @RabbitSubscribe para as filas AI_JOB_ANALYZER (job.created), PROFILE_ENRICHER (candidate.raw.found), MATCHING (candidate.consolidated) e OUTREACH (matching.completed).',
    esforco: '6h',
    status: 'Pendente'
  },
  {
    id: 'TASK-12',
    ordem: 12,
    fase: 'Fase 3: Lógica de Negócio & Consumidores RabbitMQ',
    prioridade: 'Alta',
    categoria: 'Negócio / Persistência',
    modulo: 'candidates / companies / matching / outreach / profile-enricher',
    arquivos: 'src/modules/*/*.service.ts, src/modules/*/*.controller.ts',
    titulo: 'Substituir stubs de texto por repositórios TypeORM reais',
    descricao: 'Implementar as operações CRUD reais com os repositórios do TypeORM em todos os serviços que atualmente retornam strings fixas. Descomentar e ativar endpoints no CompaniesController.',
    esforco: '8h',
    status: 'Pendente'
  },
  {
    id: 'TASK-13',
    ordem: 13,
    fase: 'Fase 3: Lógica de Negócio & Consumidores RabbitMQ',
    prioridade: 'Média',
    categoria: 'Testes',
    modulo: 'Todos os módulos',
    arquivos: 'src/**/*.spec.ts, test/',
    titulo: 'Atualizar e expandir testes unitários e E2E',
    descricao: 'Atualizar os mocks nos arquivos .spec.ts para refletir o comportamento real dos repositórios, validações de DTOs e fluxos de mensageria.',
    esforco: '5h',
    status: 'Pendente'
  }
];

// Gera CSV com BOM UTF-8 (\uFEFF) para abertura perfeita no Excel
const headers = ['ID Tarefa', 'Ordem de Controle', 'Fase', 'Prioridade', 'Categoria', 'Módulo', 'Arquivos Afetados', 'Título da Tarefa', 'Descrição Detalhada', 'Estimativa de Esforço', 'Status'];

function escapeCsvField(field) {
  if (field === null || field === undefined) return '""';
  const str = String(field).replace(/"/g, '""');
  return `"${str}"`;
}

const csvRows = [
  headers.map(escapeCsvField).join(';')
];

tasks.forEach(t => {
  const row = [
    t.id,
    t.ordem,
    t.fase,
    t.prioridade,
    t.categoria,
    t.modulo,
    t.arquivos,
    t.titulo,
    t.descricao,
    t.esforco,
    t.status
  ];
  csvRows.push(row.map(escapeCsvField).join(';'));
});

const csvContent = '\uFEFF' + csvRows.join('\n');

const projectFilePath = path.join('c:', 'Users', 'User', 'Projetos', 'talent-hunter-api', 'plano_de_acao_code_review.csv');
const artifactFilePath = path.join('C:', 'Users', 'User', '.gemini', 'antigravity', 'brain', '731f7a2d-1367-4794-b628-8bd7123c80f5', 'plano_de_acao_code_review.csv');

fs.writeFileSync(projectFilePath, csvContent, 'utf8');
fs.writeFileSync(artifactFilePath, csvContent, 'utf8');

console.log('Arquivos CSV gerados com sucesso!');
