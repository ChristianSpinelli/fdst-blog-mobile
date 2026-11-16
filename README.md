# 📱 Blog FDST - Mobile (Fase 4)

Este repositório contém a aplicação mobile do **Blog FDST**, desenvolvida em **React Native com Expo** como parte do Tech Challenge (Fase 4) da FIAP. A interface foi projetada com foco em experiência nativa, navegação fluida por pilhas (Stack Navigation), gestão administrativa completa de conteúdos e usuários (docentes e discentes), e integração direta com a API REST containerizada do ecossistema Blog FDST.

---

## 🛠️ Tecnologias Utilizadas e Como Foram Aplicadas

O projeto foi estruturado integrando ferramentas modernas do ecossistema mobile, tipagem estática, gerenciamento de estado e validação de formulários:

* **React Native & Expo:** Framework base para o desenvolvimento multiplataforma (Android e iOS). O Expo foi utilizado para agilizar o ciclo de desenvolvimento, gerenciamento de dependências nativas e execução instantânea em dispositivos físicos via Expo Go ou emuladores locais.
* **TypeScript:** Aplicado em toda a base de código para garantir segurança de tipos na comunicação com a API, tipagem estrita de rotas, contextos e modelos de domínio (`Post`, `User`, `UserRequest` e `UserRole`).
* **React Navigation (`@react-navigation/native-stack`):** Gerenciamento de navegação nativo baseado em pilhas, estruturado com blocos condicionais de autenticação (`!isAuthenticated` / `isAuthenticated`) e controle de acesso por perfil (`RBAC`), garantindo que telas administrativas fiquem inacessíveis para alunos.
* **Styled-Components (`styled-components/native`):** Utilizado para estilização baseada em componentes com mapeamento direto de um tema escuro padronizado (fundo `#09090B` e detalhes em `#ED145B`), além de estilos compartilhados (`shared.styles.ts`) para manter consistência visual entre painéis administrativos e formulários.
* **Formik & Yup:** Aplicados em conjunto para o controle de estado, sanitização de entradas em tempo real (como bloqueio de espaços em `username` via `setFieldValue`) e validação dinâmica de esquemas (como tornar o campo de senha obrigatório apenas no cadastro e opcional na edição).
* **Context API (`AuthContext`, `PostContext`, `UserContext`):** Centralização dos estados globais da aplicação, controlando o ciclo de sessão com armazenamento local seguro, sincronização de postagens condicionada à autenticação e CRUD completo de usuários por perfil (`PROFESSOR` e `STUDENT`).
* **Axios:** Cliente HTTP configurado com interceptadores para injeção automática do token JWT nas requisições autenticadas e comunicação com o backend local.

---

## 🏛️ Arquitetura do Sistema e Estrutura de Pastas

A aplicação adota uma arquitetura modular separada por responsabilidades, facilitando a manutenção e o reaproveitamento de código:

* **`src/api/`:** Configuração da instância do Axios, URL base da API e interceptadores de autenticação.
* **`src/components/`:** Componentes visuais reutilizáveis em todo o aplicativo, incluindo o layout padrão com rolagem e rodapé (`ScreenLayout`), cabeçalho customizado (`HeaderTitle`) e menu suspenso via `Modal` nativo (`HeaderRight`).
* **`src/contexts/`:** Provedores de estado global (`AuthContext`, `PostContext` e `UserContext`) que isolam a lógica de negócios e chamadas de serviço das telas.
* **`src/pages/`:** Telas principais do sistema:
  * **Públicas / Autenticadas Gerais:** `Login`, `Dashboard` (mural com busca e pull-to-refresh) e `PostDetail`.
  * **Administrativas (Exclusivas para `PROFESSOR`):** `AdminPosts`, `CreateOrEditPost`, `AdminTeachers`, `CreateOrEditTeacher`, `AdminStudents` e `CreateOrEditStudent`.
* **`src/routes/`:** Configuração central do navegador nativo (`AppRoutes.tsx`) com proteção de rotas baseada no estado de login e cargo do usuário.
* **`src/services/`:** Camada de integração com os endpoints REST do backend (`authService`, `postService`, `userService`).
* **`src/styles/`:** Definições do tema global (`theme.ts`) e componentes estilizados compartilhados (`shared.styles.ts`).
* **`src/types/`:** Contratos e interfaces TypeScript para entidades e payloads de requisição.

---

## 🚀 Uso e Inicialização da Aplicação

Para executar o aplicativo mobile localmente, é necessário que o **backend do Blog FDST** (o mesmo utilizado no projeto Web) esteja em execução via Docker na sua máquina, pois o app consome seus endpoints REST.

### Pré-requisitos
* **Node.js** (versão LTS recomendada) e **npm** instalados.
* **Docker** e **Docker Compose** instalados e em execução.
* **Git** instalado.
* Aplicativo **Expo Go** instalado no smartphone (Android/iOS) ou um emulador Android/iOS configurado localmente.

---

### Passo 1: Subir o Backend via Docker

1. **Clonar o repositório do backend:** Clone o repositório do backend ou acesse a pasta onde o arquivo `docker-compose.yml` do backend está localizado:
   ```bash
   git clone https://github.com/ChristianSpinelli/Blog_FDST_Backend.git
   cd Blog_FDST_Backend
   ```
2. **Baixar e iniciar os containers:** Execute o comando abaixo para obter a imagem mais recente e levantar os containers do backend e do banco de dados:
   ```bash
   docker compose pull && docker compose up -d
   ```
3. **Verificar disponibilidade:** Certifique-se de que a API está ativa e respondendo na porta configurada (ex: `http://localhost:3000`).

---

### Passo 2: Configurar e Executar o Aplicativo Mobile

1. **Clonar o projeto mobile:** Clone este repositório e acesse a pasta do projeto:
   ```bash
   git clone https://github.com/ChristianSpinelli/fdst-blog-mobile.git
   cd fdst-blog-mobile
   ```
2. **Instalar dependências:** Instale todos os pacotes necessários do projeto:
   ```bash
   npm install
   ```
3. **Configurar o IP da rede local na API (`/src/api`):** Antes de iniciar o aplicativo, acesse o arquivo de configuração da API localizado na pasta `/src/api` (ex: `src/api/api.ts`) e altere a `baseURL` substituindo `localhost` pelo endereço IPv4 da sua rede local (ex: `http://192.168.X.X:3000`). Isso é indispensável para que o aplicativo rodando no celular consiga se comunicar com o container Docker em execução no seu computador:
   ```typescript
   // Exemplo em /src/api/api.ts
   const api = axios.create({
     baseURL: 'http://192.168.X.X:3000', // Substitua pelo IPv4 da sua máquina
   });
   ```
4. **Iniciar o servidor Expo:** Execute o comando abaixo para iniciar o servidor de desenvolvimento:
   ```bash
   npx expo start
   ```
5. **Acessar no dispositivo:** Escaneie o **QR Code** exibido no terminal utilizando o aplicativo **Expo Go** no seu celular (certificando-se de que o celular e o computador estejam conectados na mesma rede Wi-Fi) ou pressione shift + `a` no terminal para abrir no emulador Android.

---

## 🧩 Principais Desafios Encontrados

* **Adaptação de Interfaces Administrativas Web para Mobile:** Diferente da versão web que alterna entre tabelas e cards responsivos, no ambiente mobile as tabelas tradicionais comprometem a legibilidade e a usabilidade por toque. Todos os painéis gerenciais (`AdminPosts`, `AdminTeachers` e `AdminStudents`) foram projetados nativamente em formato de cards empilhados com ações claras de edição e confirmação nativa de exclusão via `Alert`.
* **Comportamento de Toque em Menus Suspensos no Android/iOS:** Implementar um menu dropdown no cabeçalho (`HeaderRight`) utilizando apenas posicionamento absoluto gerava bloqueios de clique fora da área do header. A solução foi utilizar o componente nativo `Modal` transparente, garantindo captura confiável de toques tanto nas opções de navegação quanto no fechamento ao tocar fora do menu.
* **Sincronização de Requisições Autenticadas no Ciclo de Vida dos Contextos:** Como o `PostProvider` é montado na raiz da aplicação antes do usuário realizar login, disparar a busca de postagens na montagem inicial resultava em falha por ausência do token JWT, exigindo atualização manual após o login. O problema foi resolvido condicionando o `useEffect` do `PostContext` ao estado `isAuthenticated` proveniente do `AuthContext`, garantindo carregamento automático e único assim que a sessão é iniciada.
* **Comunicação entre Dispositivo Físico e Backend Containerizado:** Em ambiente mobile com Expo Go, requisições apontadas para `localhost` referenciam o próprio smartphone e não a máquina host onde o Docker está rodando. Foi necessário configurar a base URL da API na pasta `/src/api` utilizando o endereço IP local da rede e validar a exposição de portas do container.
* **Configuração de Ambiente Nativo Android:** Para testes locais em emulador, foi necessária a configuração explícita das variáveis de ambiente do Android SDK (`ANDROID_HOME` e `platform-tools`) no sistema operacional para permitir a comunicação via ADB com o Expo CLI.

---

## 👨‍💻 Equipe

* **Christian Spinelli** - RM371199
