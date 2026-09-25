# Talent Hunter AI

API backend para uma plataforma de recrutamento orientada a eventos, criada para conectar empresas a candidatos de tecnologia e automatizar etapas do processo de seleção.

> **Status:** em desenvolvimento. A base atual utiliza NestJS, RabbitMQ e MongoDB, com módulos iniciais para candidatos e outreach e uma camada compartilhada de mensageria.

## Visão geral

O projeto propõe um fluxo de recrutamento no qual as empresas podem publicar oportunidades, processar informações de candidatos e, futuramente, automatizar matching, enriquecimento de perfis e comunicação.

A aplicação está estruturada como um monólito modular NestJS preparado para comunicação assíncrona. O RabbitMQ é usado como transporte de eventos de domínio, enquanto o MongoDB fornece a infraestrutura de persistência local definida no ambiente Docker.

## Arquitetura atual

```text
Cliente / RH
    │
    ▼
Aplicação NestJS
    ├── API HTTP
    │   ├── /candidates
    │   └── /outreach
    │
    ├── Swagger
    │   └── /talent-api
    │
    └── Microserviço RabbitMQ
        └── fila cats_queue

RabbitMQ
    └── ProxyRouterService
        └── eventos de domínio, como job.created
```

O `ProxyRouterService` encapsula o envio de eventos para o RabbitMQ. As mensagens são publicadas com um envelope contendo timestamp, nome do evento e payload. A conexão é configurada por meio do token `RABBITMQ_CLIENT` e da variável `RABBITMQ_URL`.

## Stack

- **Node.js + TypeScript**
- **NestJS 11** para a API e organização modular
- **RabbitMQ** para mensageria assíncrona
- **MongoDB** para persistência local e futura integração com o domínio
- **Mongoose / NestJS Mongoose** para modelagem de dados
- **Swagger / OpenAPI** para documentação da API
- **Jest + Supertest** para testes unitários e end-to-end
- **Docker Compose** para subir MongoDB, Mongo Express e RabbitMQ

## Estrutura do projeto

```text
.
├── src/
│   ├── main.ts                         # Bootstrap HTTP, Swagger e RabbitMQ
│   ├── app.module.ts                   # Módulo principal da aplicação
│   ├── app.controller.ts               # Endpoint raiz
│   ├── candidates/                     # Módulo inicial de candidatos
│   │   ├── candidates.controller.ts
│   │   ├── candidates.service.ts
│   │   └── candidates.module.ts
│   ├── outreach/                       # Módulo inicial de outreach
│   │   ├── outreach.controller.ts
│   │   ├── outreach.service.ts
│   │   └── outreach.module.ts
│   └── shared/messaging/               # Infraestrutura compartilhada de eventos
│       ├── constants/events.constant.ts
│       ├── interfaces/event-payloads.interface.ts
│       ├── proxy-router.service.ts
│       ├── rabbitmq.module.ts
│       ├── rabbitmq.service.ts
│       └── shared-messaging.module.ts
├── test/                               # Testes end-to-end
├── docker-compose.infra.yaml           # MongoDB, Mongo Express e RabbitMQ
├── definitions.json                    # Definições do RabbitMQ
├── package.json                        # Scripts e dependências
└── tsconfig*.json                      # Configuração TypeScript
```

## Pré-requisitos

- Node.js 18 ou superior
- npm
- Docker e Docker Compose

## Configuração local

1. Clone o repositório:

```bash
git clone https://github.com/dbrickaraujo87/talent-hunter-ai.git
cd talent-hunter-ai
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto:

```env
PORT=4000
NODE_ENV=development
RABBITMQ_URL=amqp://admin:admin123@localhost:5672
```

O RabbitMQ também utiliza esses valores no ambiente Docker:

- Usuário: `admin`
- Senha: `admin123`
- AMQP: `localhost:5672`
- Painel web: `http://localhost:15672`

4. Suba a infraestrutura:

```bash
docker compose -f docker-compose.infra.yaml up -d
```

A infraestrutura disponibiliza:

| Serviço | Endereço | Finalidade |
| --- | --- | --- |
| MongoDB | `localhost:27017` | Banco de dados |
| Mongo Express | `http://localhost:8081` | Interface web do MongoDB |
| RabbitMQ AMQP | `localhost:5672` | Transporte de mensagens |
| RabbitMQ Management | `http://localhost:15672` | Administração do broker |

5. Inicie a API em modo de desenvolvimento:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:4000` e a documentação Swagger em `http://localhost:4000/talent-api`.

## Scripts disponíveis

```bash
npm run start          # Inicia a aplicação
npm run start:dev      # Inicia com watch mode
npm run start:prod     # Executa a versão compilada
npm run build          # Compila o projeto
npm run lint           # Executa o ESLint
npm run format         # Formata os arquivos TypeScript
```

## Testes

```bash
npm run test           # Testes unitários
npm run test:watch     # Testes em modo watch
npm run test:e2e       # Testes end-to-end
npm run test:cov       # Testes com cobertura
```

O teste end-to-end atual valida o endpoint raiz `GET /`, que deve responder `Hello World!`.

## Mensageria

Os eventos são enviados pelo `ProxyRouterService` usando o cliente RabbitMQ configurado no módulo de mensageria. O padrão de mensagem possui o seguinte formato:

```json
{
  "timestamp": "2026-01-01T00:00:00.000Z",
  "event": "job.created",
  "data": {}
}
```

O evento `job.created` já possui um fluxo de despacho representado por `dispatchJobCreated`. Novos eventos podem ser adicionados em `src/shared/messaging/constants/events.constant.ts`, com seus payloads tipados em `src/shared/messaging/interfaces/event-payloads.interface.ts`.

## Próximos passos

- Implementar os casos de uso dos módulos de candidatos e outreach.
- Adicionar schemas e repositories para MongoDB.
- Evoluir o fluxo de eventos para análise de vagas, matching e enriquecimento de perfis.
- Adicionar autenticação e autorização.
- Expandir a documentação Swagger com os endpoints de negócio.
- Ampliar a cobertura dos testes unitários e end-to-end.

## Licença

Este projeto ainda não possui uma licença open source definida.

---

Desenvolvido por **Davi Brick de Araújo**.
