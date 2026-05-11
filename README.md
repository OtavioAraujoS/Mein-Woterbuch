# 🇩🇪 Mein-Wörterbuch (Meu Dicionário)

**Mein-Wörterbuch** é uma aplicação de dicionário e léxico alemão moderna, projetada para estudantes e entusiastas do idioma que buscam uma experiência rápida, fluida e visualmente atraente para gerenciar seu vocabulário.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Funcionalidades

### 🔍 Busca em Tempo Real

- Sistema de busca ultra-rápido com **Debounce** para otimizar chamadas ao banco de dados.
- Feedback visual de carregamento e tempo de resposta da requisição.
- Navegação completa via teclado (setas e Enter).

### 📚 Gerenciamento de Biblioteca

- Adicione suas próprias palavras com definições e exemplos de uso.
- Validação rigorosa de formulários com **Zod** e **React Hook Form**.
- Persistência de dados em tempo real utilizando **Supabase**.
- Exclusão de palavras com atualização instantânea da interface.

### 🎨 UI/UX Premium

- Interface em **Dark Mode** com estética inspirada no Linear/Vercel.
- Animações fluidas e estados de transição utilizando **Framer Motion**.
- Notificações globais (Toasts) via **Sonner**.
- Componentes acessíveis baseados no **Radix UI** e **Shadcn UI**.

## 🛠️ Tecnologias Utilizadas

- **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animações:** [Framer Motion (motion/react)](https://motion.dev/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Ícones:** [Lucide React](https://lucide.dev/)

## 📦 Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/OtavioAraujoS/Mein-Woterbuch.git
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com suas credenciais do Supabase:

   ```env
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🏗️ Estrutura do Projeto

- `/src/components`: Componentes reutilizáveis de UI e lógica de negócio.
- `/src/hooks`: Hooks customizados (como o `useLexiconSearch`).
- `/src/pages`: Páginas da aplicação (Search e Library).
- `/src/lib`: Configurações de bibliotecas externas (Supabase cliente).
- `/src/types`: Definições de tipos TypeScript.

---

Desenvolvido com ❤️ por [Otávio Araújo](https://github.com/OtavioAraujoS)
