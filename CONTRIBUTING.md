# 🤝 Contributing to HydroChain

Thank you for your interest in contributing to HydroChain! This document provides guidelines for contributing to our blockchain-powered subsidy management platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git for version control
- MetaMask browser extension (for blockchain features)
- MySQL database (for backend)

### Development Setup

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Rushilchauhan45/Hydrochain_Smart-Subsidy-Disbursement-Platform.git
   cd Hydrochain_Smart-Subsidy-Disbursement-Platform
   ```

2. **Install Dependencies**
   ```bash
   cd Front-end-DAIICT
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Standards
- **TypeScript**: Use TypeScript for all new components
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code formatting is enforced
- **Naming Conventions**: Use camelCase for variables, PascalCase for components

### Component Structure
```typescript
// Component Template
import React from 'react';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  onClick: () => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return (
    <div className="component-container">
      <Button onClick={onClick}>{title}</Button>
    </div>
  );
};
```

### Commit Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add new blockchain integration
fix: resolve wallet connection issue
docs: update API documentation
style: improve responsive design
refactor: optimize smart contract calls
test: add unit tests for auth service
chore: update dependencies
```

## 🔧 Areas for Contribution

### 🎨 Frontend Development
- React component development
- Responsive design improvements
- UI/UX enhancements
- Accessibility improvements
- Performance optimization

### ⛓️ Blockchain Development
- Smart contract optimization
- Web3 integration enhancements
- Multi-chain support
- Gas optimization
- Security improvements

### 🔙 Backend Development
- API endpoint development
- Database optimization
- Authentication improvements
- Email service integration
- Performance monitoring

### 📚 Documentation
- Code documentation
- API documentation
- User guides
- Video tutorials
- Architecture documentation

### 🧪 Testing
- Unit test coverage
- Integration tests
- E2E testing
- Blockchain testing
- Performance testing

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Details**
   - OS and version
   - Browser and version
   - Node.js version
   - MetaMask version (if applicable)

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior
   - Screenshots/videos if applicable

3. **Error Information**
   - Console errors
   - Network errors
   - Blockchain transaction hashes

## 💡 Feature Requests

For feature requests, please provide:

1. **Problem Statement**
   - What problem does this solve?
   - Who would benefit from this feature?

2. **Proposed Solution**
   - Detailed description
   - Technical considerations
   - Alternative solutions considered

3. **Additional Context**
   - Mockups or wireframes
   - Related issues
   - Implementation ideas

## 🔍 Code Review Process

1. **Pull Request Guidelines**
   - Clear title and description
   - Reference related issues
   - Include tests for new features
   - Update documentation as needed

2. **Review Criteria**
   - Code quality and standards
   - Performance impact
   - Security considerations
   - Browser compatibility
   - Mobile responsiveness

3. **Merge Requirements**
   - All tests passing
   - Code review approval
   - No merge conflicts
   - Documentation updated

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributor graphs
- Special mentions in documentation

## 📞 Getting Help

- **Discord**: [Join our community](#)
- **GitHub Issues**: Use for bug reports and feature requests
- **Email**: hydrochain.dev@example.com
- **Documentation**: Check our [wiki](DOCUMENTATION.md)

## 📄 License

By contributing to HydroChain, you agree that your contributions will be licensed under the MIT License.

---

**Happy Contributing! 🚀**

Together, we're building the future of transparent government subsidy management.
