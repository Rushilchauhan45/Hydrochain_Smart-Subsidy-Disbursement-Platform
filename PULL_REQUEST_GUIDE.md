# 🔄 Pull Request Guide

## Creating Pull Requests for HydroChain

This guide explains how to create pull requests between main and master branches.

### Branch Strategy

- **main**: Primary development branch with latest features
- **master**: Stable production-ready branch
- **feature/***: Feature development branches
- **hotfix/***: Critical bug fix branches

### Pull Request Workflow

#### 1. From Feature Branch to Main
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to origin
git push origin feature/your-feature-name

# Create PR: feature/your-feature-name → main
```

#### 2. From Main to Master (Release)
```bash
# Ensure main is up to date
git checkout main
git pull origin main

# Create release PR: main → master
# This promotes tested features to production
```

### PR Templates

#### Feature PR Template
```markdown
## 🚀 Feature Description
Brief description of the feature

## 📋 Changes Made
- [ ] Added new component
- [ ] Updated documentation
- [ ] Added tests

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📸 Screenshots
If applicable, add screenshots

## 🔗 Related Issues
Closes #123
```

#### Release PR Template
```markdown
## 🎉 Release: v1.0.1

### ✨ New Features
- Feature 1
- Feature 2

### 🐛 Bug Fixes
- Fix 1
- Fix 2

### 📚 Documentation
- Updated API docs
- Added deployment guide

### 🔒 Security
- Security improvement 1
- Security improvement 2
```

### Branch Protection Rules

#### Main Branch
- Require pull request reviews
- Dismiss stale reviews
- Require status checks
- Restrict pushes to matching branches

#### Master Branch
- Require pull request reviews (2+ reviewers)
- Require up-to-date branches
- Include administrators
- Restrict force pushes

### Creating PR via GitHub CLI

```bash
# Install GitHub CLI
gh auth login

# Create PR to main
gh pr create --base main --title "feat: your feature" --body "Description"

# Create PR to master (release)
gh pr create --base master --title "release: v1.0.1" --body "Release notes"
```

### Creating PR via GitHub Web

1. Navigate to repository on GitHub
2. Click "New pull request"
3. Select base and compare branches
4. Fill in title and description
5. Add reviewers and labels
6. Create pull request

### PR Review Checklist

#### Code Review
- [ ] Code follows style guidelines
- [ ] No console.log statements in production code
- [ ] Error handling implemented
- [ ] Performance considerations addressed

#### Documentation Review
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Comments added for complex logic
- [ ] Changelog updated

#### Testing Review
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Edge cases covered
- [ ] Performance tested

#### Security Review
- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] Dependencies updated

### Merge Strategies

#### Feature to Main
- **Squash and merge**: Clean history
- **Merge commit**: Preserve feature branch history
- **Rebase and merge**: Linear history

#### Main to Master
- **Merge commit**: Preserve release history
- **Fast-forward only**: Clean production history

---

**Happy Contributing! 🚀**
