# Vendor Management System

A hierarchical team management application built with React and TypeScript that allows organizations to manage their vendor hierarchy and team structure.

## Features

- 👥 Display hierarchical team structure
- 🔍 Search users by name, email, or phone number
- 🏷️ Filter users by status tags (All/Active/Inactive)
- 🔄 Move users between different supervisors/managers
- 🎨 Visual role indicators with color coding
- 📱 Responsive design
- 🌓 Light/Dark theme support

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Lucide React Icons
- React Hook Form
- Other utility libraries

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd vendor-management

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/     # UI components
│   ├── ui/        # Reusable UI components
│   └── ...        # Feature components
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
├── contexts/      # React context providers
├── lib/          # Utility functions
└── services/     # API/Service layer
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request