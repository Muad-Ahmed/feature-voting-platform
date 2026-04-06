# SSR-Enabled Feature Voting Platform

A high-performance, SEO-optimized full-stack voting platform designed for community-driven feature prioritization. Built on a modern architecture that combines Laravel 11's robust backend with React's dynamic frontend, it leverages **Server-Side Rendering (SSR)** for lightning-fast initial loads and superior search engine discoverability.

## 🛠️ Modern Tech Stack

- **Framework**: [Laravel 11](https://laravel.com/)
- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Inertia.js v2](https://inertiajs.com/) (Server-Side Rendering)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Roles & Permissions**: [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)
- **Automation**: CI/CD Pipeline
- **Hosting**: Dedicated VPS

## 🚀 Key Features

- **Advanced Voting Mechanics**: Full-stack implementation of interactive **Upvote and Downvote** systems for real-time community engagement.
- **Dynamic Comments System**: Integrated discussion platform for detailed feature feedback and community conversation.
- **Three-Tier Role Architecture**: Granular access control (Admin, Commenter, User) powered by Spatie for secure and scalable management.
- **AI-Powered Support**: Native integration of an AI assistant to provide instant support and help users navigate the platform.
- **Optimized for Performance (SSR)**: Full SSR support ensures rapid content delivery and an exceptional user experience on any device.
- **Robust CI/CD & VPS Ready**: Engineered for professional deployment with automated workflows and high-reliability hosting environments.

## ⚙️ Getting Started

### Prerequisites

- PHP >= 8.2
- Node.js & NPM
- Composer

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muad-Ahmed/feature-voting-platform.git
   ```

2. **Install dependencies:**
   ```bash
   composer install
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database Configuration:**
   Configure your `.env` and run migrations:
   ```bash
   php artisan migrate --seed
   ```

5. **Run Development Mode (with SSR):**
   ```bash
   npm run build # For SSR bundle
   php artisan serve
   # In another terminal
   npm run dev
   ```

## 📄 License

This project is open-sourced under the [MIT license](LICENSE).
