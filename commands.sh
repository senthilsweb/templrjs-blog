1. First, install Bun if you haven't already:
curl -fsSL https://bun.sh/install | bash

2. Install all required dependencies with Bun:
bun add @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-slot class-variance-authority clsx date-fns drizzle-orm lucide-react next next-themes pg react react-day-picker react-dom sonner tailwind-merge tailwindcss-animate @tanstack/react-table

3. Install dev dependencies:
bun add -d @types/node @types/pg @types/react @types/react-dom autoprefixer dotenv drizzle-kit postcss tailwindcss typescript

4. After installation, run the development server with:
bun dev
