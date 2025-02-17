# Review Management System

A modern web application for managing customer reviews built with React, TypeScript, and Vite. Features include adding, viewing, and managing reviews with real-time updates.

## Tech Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit (RTK Query)
- Tailwind CSS

## Quality & Security

The project implements continuous code quality and security scanning through:

### SonarCloud

- Automated code quality analysis
- Security vulnerability detection
- Code coverage tracking
- Pull request decoration with analysis results
- Continuous monitoring of code smells and technical debt

### OSV Scanner

- Vulnerability scanning for dependencies

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add:

```bash
VITE_API_URL=your-api-url-here
```

4. Start the development server:

```bash
npm run dev
```

## CI Pipeline

The project uses GitHub Actions for continuous integration with the following checks:

1. **Build and Test**

   - Type checking with TypeScript
   - Linting
   - Building the application
   - Running tests

2. **Code Quality**

   - SonarCloud analysis for:
     - Code quality metrics
     - Test coverage
     - Code duplication
     - Security hotspots

3. **Security Scanning**
   - OSV Scanner for:
     - Dependency vulnerability scanning
     - Security advisory checks
     - GitHub Security Dashboard integration

### Pipeline Configuration

The CI pipeline runs on:

- Push to main branch
- Pull requests to main branch

Required secrets for CI:

- `GITHUB_TOKEN`: For GitHub Actions authentication
- `SONAR_TOKEN`: For SonarCloud integration

For more information about setting up SonarCloud or OSV Scanner, please refer to:

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [OSV Scanner Documentation](https://google.github.io/osv-scanner/)
