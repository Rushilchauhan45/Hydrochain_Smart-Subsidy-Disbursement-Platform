# 🚀 Deployment Guide

Complete guide for deploying HydroChain to production environments.

## 📋 Prerequisites

### System Requirements
- **Node.js**: v16.0 or higher
- **npm**: v8.0 or higher
- **MySQL**: v8.0 or higher
- **Git**: Latest version
- **Domain**: SSL certificate required

### Cloud Provider Support
- ✅ **AWS** (Recommended)
- ✅ **Google Cloud Platform**
- ✅ **Microsoft Azure**
- ✅ **DigitalOcean**
- ✅ **Vercel** (Frontend only)
- ✅ **Netlify** (Frontend only)

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   Web Server    │    │   Database      │
│   (Nginx/ALB)   │◄──►│   (Node.js)     │◄──►│   (MySQL)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN           │    │   File Storage  │    │   Monitoring    │
│   (CloudFlare)  │    │   (S3/GCS)      │    │   (DataDog)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Environment Setup

### 1. Frontend Deployment

#### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd Front-end-DAIICT
vercel --prod
```

#### Build for Static Hosting
```bash
cd Front-end-DAIICT
npm install
npm run build

# Files will be in dist/ directory
```

#### Environment Variables (Frontend)
```env
VITE_API_BASE_URL=https://api.hydrochain.dev
VITE_BLOCKCHAIN_NETWORK=mainnet
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=https://your-sentry-dsn
```

### 2. Backend Deployment

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t hydrochain-api .
docker run -p 3000:3000 --env-file .env hydrochain-api
```

#### Manual Deployment
```bash
cd Front-end-DAIICT/server
npm install --production
npm start
```

#### Environment Variables (Backend)
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hydrochain
DB_USER=your_username
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRES_IN=7d

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# API
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://hydrochain.dev

# Security
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### 3. Database Setup

#### MySQL Production Setup
```sql
-- Create database
CREATE DATABASE hydrochain CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'hydrochain'@'%' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON hydrochain.* TO 'hydrochain'@'%';
FLUSH PRIVILEGES;

-- Run migrations
USE hydrochain;
SOURCE ./config/init.sql;
```

#### Database Optimization
```sql
-- Performance tuning
SET GLOBAL innodb_buffer_pool_size = 1073741824; -- 1GB
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 67108864; -- 64MB
```

## ☁️ Cloud Deployment

### AWS Deployment

#### 1. EC2 Setup
```bash
# Launch EC2 instance (t3.medium recommended)
# Install dependencies
sudo yum update -y
sudo yum install -y nodejs npm git

# Clone repository
git clone https://github.com/Rushilchauhan45/Hydrochain_Smart-Subsidy-Disbursement-Platform.git
cd Hydrochain_Smart-Subsidy-Disbursement-Platform/Front-end-DAIICT
npm install
```

#### 2. RDS Setup
```bash
# Create MySQL RDS instance
aws rds create-db-instance \
  --db-instance-identifier hydrochain-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password SecurePassword123 \
  --allocated-storage 20
```

#### 3. S3 for Static Assets
```bash
# Create S3 bucket
aws s3 mb s3://hydrochain-assets

# Configure bucket policy
aws s3api put-bucket-policy \
  --bucket hydrochain-assets \
  --policy file://bucket-policy.json
```

#### 4. CloudFront CDN
```json
{
  "DistributionConfig": {
    "CallerReference": "hydrochain-cdn",
    "Origins": {
      "Quantity": 1,
      "Items": [
        {
          "Id": "S3-hydrochain-assets",
          "DomainName": "hydrochain-assets.s3.amazonaws.com",
          "S3OriginConfig": {
            "OriginAccessIdentity": ""
          }
        }
      ]
    }
  }
}
```

### Google Cloud Platform

#### 1. App Engine Deployment
```yaml
# app.yaml
runtime: nodejs16
service: hydrochain-api

env_variables:
  DB_HOST: "10.x.x.x"
  DB_PORT: "3306"
  DB_NAME: "hydrochain"
  JWT_SECRET: "your-secret"

automatic_scaling:
  min_instances: 1
  max_instances: 10
```

```bash
gcloud app deploy
```

#### 2. Cloud SQL Setup
```bash
# Create Cloud SQL instance
gcloud sql instances create hydrochain-db \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region=us-central1
```

### DigitalOcean Deployment

#### 1. Droplet Setup
```bash
# Create droplet
doctl compute droplet create hydrochain-app \
  --size s-1vcpu-1gb \
  --image ubuntu-20-04-x64 \
  --region nyc1 \
  --ssh-keys your-ssh-key-id
```

#### 2. Managed Database
```bash
# Create managed MySQL database
doctl databases create hydrochain-db \
  --engine mysql \
  --size db-s-1vcpu-1gb \
  --region nyc1
```

## 🔒 Security Configuration

### SSL/TLS Setup
```nginx
# Nginx configuration
server {
    listen 443 ssl http2;
    server_name hydrochain.dev;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Firewall Configuration
```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# AWS Security Groups
aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0
```

## 📊 Monitoring & Logging

### Application Monitoring
```javascript
// monitoring.js
const winston = require('winston');
const { createLogger, format, transports } = winston;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
```

### Health Checks
```javascript
// health.js
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: checkDatabaseConnection(),
      email: checkEmailService(),
      storage: checkStorageService()
    }
  };
  
  res.json(healthCheck);
});
```

### Performance Monitoring
```bash
# PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start ecosystem.config.js --env production

# Monitor
pm2 monit
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'hydrochain-api',
    script: './server/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to production
      run: |
        echo "Deploying to production server"
        # Add deployment commands here
```

### Automated Testing
```bash
# Run full test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Security audit
npm audit
npm run security:check
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] Backup strategy implemented
- [ ] Monitoring tools configured

### Production Deployment
- [ ] Application deployed to production server
- [ ] Database connected and seeded
- [ ] Static assets uploaded to CDN
- [ ] Load balancer configured
- [ ] Health checks passing
- [ ] Performance monitoring active

### Post-Deployment
- [ ] Smoke tests completed
- [ ] User acceptance testing passed
- [ ] Documentation updated
- [ ] Team notified of deployment
- [ ] Rollback plan confirmed
- [ ] Performance metrics baseline established

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check database connectivity
mysql -h your-host -u your-user -p

# Verify environment variables
printenv | grep DB_
```

#### SSL Certificate Issues
```bash
# Test SSL configuration
openssl s_client -connect hydrochain.dev:443

# Check certificate expiration
echo | openssl s_client -servername hydrochain.dev -connect hydrochain.dev:443 2>/dev/null | openssl x509 -noout -dates
```

#### Performance Issues
```bash
# Monitor application performance
pm2 monit

# Check server resources
htop
df -h
free -m
```

## 📞 Support

For deployment support:
- **Email**: devops@hydrochain.dev
- **Slack**: #deployment-support
- **Documentation**: https://docs.hydrochain.dev
- **Emergency**: +1-XXX-XXX-XXXX (24/7)

---

**Successful deployment requires careful planning and testing. Always deploy to staging first! 🚀**
