# EduPost — FIAP Tech Challenge (Mobile)

Aplicativo mobile desenvolvido em **React Native (Expo)** para leitura e gestão de postagens educacionais, com autenticação e controle de acesso por perfil (**Aluno / Professor / Admin**).

## Sumário

- Visão geral
- Funcionalidades
- Perfis e permissões
- Telas (GUI)
- Requisitos do desafio (checklist)
- Tecnologias
- Arquitetura do projeto
- Como rodar o projeto (passo a passo)
- Configuração do back-end
- Troubleshooting

## Visão geral

O EduPost permite listar e ler postagens, além de criar/editar/excluir conteúdo conforme o perfil do usuário.
O projeto utiliza **Expo Router** (rotas por pastas/arquivos) e **Context API** para autenticação.

## Funcionalidades

- Lista de posts com campo de busca
- Leitura do post completo
- Criação e edição de postagens (Professor/Admin)
- Exclusão de postagens com confirmação
- Gestão de usuários (Professores e Alunos) para perfis com permissão
- Autenticação (login) e autorização por perfil

## Perfis e permissões

Observação: algumas regras de edição/exclusão podem depender do back-end (por exemplo: “professor só pode editar seus próprios posts”).

| Ação                    | Aluno |                       Professor |              Admin |
| ----------------------- | ----: | ------------------------------: | -----------------: |
| Ver lista de posts      |    ✅ |                              ✅ |                 ✅ |
| Ler post                |    ✅ |                              ✅ |                 ✅ |
| Criar post              |    ❌ |                              ✅ |                 ✅ |
| Editar post             |    ❌ | ✅ (conforme regra do back-end) | ✅ (qualquer post) |
| Excluir post            |    ❌ | ✅ (conforme regra do back-end) | ✅ (qualquer post) |
| CRUD Professores/Alunos |    ❌ |                              ❌ |                 ✅ |

## Telas (GUI)

### Página principal — Lista de posts

- Exibe uma lista de posts (título, autor e data)
- Campo de busca por palavras-chave
- Botão “Ler Post” abre o detalhe

Arquivos relevantes:

- `src/app/(tabs)/(home)/index.tsx`
- `src/components/PostItem/index.tsx`

### Página de leitura do post

- Exibe o conteúdo completo do post
- Para Admin: botões “Editar” e “Deletar” ao final do post

Arquivos relevantes:

- `src/app/(tabs)/(home)/[postId]/index.tsx`
- `src/components/PostForm/index.tsx`
- `src/components/DeleteModal/index.tsx`

### Criação/Edição de postagens

- Formulário com campos: título e conteúdo
- Quando em modo edição, carrega os dados do post

Arquivos relevantes:

- `src/components/PostForm/index.tsx`
- `src/app/(tabs)/MeusPosts/NovoPost/index.tsx`
- `src/app/(tabs)/MeusPosts/[postId]/index.tsx`

### Gestão de usuários (Professores/Alunos)

- Telas para listar e editar usuários (conforme permissões)

Arquivos relevantes:

- `src/app/(tabs)/Usuarios/index.tsx`
- `src/app/(tabs)/Usuarios/[userId]/index.tsx`
- `src/services/users.service.ts`

## Requisitos do desafio (checklist)

### Interface gráfica

1. Página principal (lista de posts) ✅
2. Página de leitura de post ✅
3. Página de criação de postagens ✅
4. Página de edição de postagens ✅
5. Página de criação de professores ✅ _(_se aplicável via telas de Usuários_)_
6. Página de edição de professores ✅
7. Página de listagem de professores ✅
8. Requisitos 5/6/7 para estudantes ✅
9. Página administrativa de posts ✅ _(_Admin gerencia via detalhe do post_)_
10. Autenticação e autorização ✅

### Requisitos técnicos

1. Desenvolvimento em React Native (hooks + funcionais) ✅
2. Estilização conforme layout do grupo ✅
3. Integração com back-end (REST) ✅
4. Documentação técnica detalhada no README ✅

## Tecnologias

- Expo + React Native
- Expo Router
- Axios (HTTP)
- Context API (Auth)
- date-fns (datas)
- react-native-toast-message (toasts)

## Arquitetura do projeto

Principais pastas:

- `src/app/` — Rotas e telas (Expo Router)
- `src/components/` — Componentes reutilizáveis (ex.: PostForm, PostItem, DeleteModal)
- `src/services/` — Integração com API REST (posts, usuários)
- `src/models/` — Models/formatadores dos dados
- `src/providers/` — Contextos e providers (Auth)
- `src/utils/` — Utilitários (ex.: datas)

## Como rodar o projeto (passo a passo)

### 1) Pré-requisitos

- Node.js (recomendado: LTS)
- npm (ou yarn)
- iOS (macOS): Xcode + iOS Simulator
- Android (opcional): Android Studio + Emulator

### 2) Instalação

Na raiz do projeto:

```bash
npm install
```

### 3) Iniciar o app

```bash
npx expo start
```

Opções no terminal:

- `i` abre o iOS Simulator
- `a` abre o Android Emulator
- `w` abre a versão web

### 4) Rodar limpando cache (recomendado para evitar erros de bundle)

```bash
npx expo start --clear
```

## Configuração do back-end

### URL da API

Atualmente a base URL está definida em `src/api/axios.ts`.

Para apontar para outro ambiente (dev/local), edite:

- `baseURL` em `src/api/axios.ts`

Exemplo:

- Local: `http://localhost:3000`
- Rede (device físico): `http://SEU_IP:3000`

### Observações importantes

- Em atualização de post, a API pode rejeitar campos imutáveis (ex.: `createdAt`). O app evita enviar `createdAt` no update.

## Troubleshooting

### “Text strings must be rendered within a `<Text>` component”

Isso normalmente acontece quando existe uma string solta no JSX (ex.: `{" "}`) fora de um `<Text>`.
Remova a string ou envolva em `<Text>`.

### Erros estranhos após alterações / bundle inconsistente

Rode com cache limpo:

```bash
npx expo start --clear
```

Se persistir:

```bash
rm -rf node_modules
npm install
npx expo start --clear
```
