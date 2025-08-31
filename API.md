# 🔌 API Documentation

## Overview

HydroChain provides a comprehensive RESTful API for managing government subsidy disbursement through blockchain technology.

**Base URL**: `https://api.hydrochain.dev/v1`  
**Authentication**: JWT Bearer Token  
**Rate Limit**: 100 requests per minute  

## 🔐 Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "government",
      "fullName": "John Doe"
    }
  }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "role": "producer"
}
```

### OTP Verification
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "phone": "+1234567890",
  "otp": "123456"
}
```

## 👤 User Management

### Get User Profile
```http
GET /api/profile
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "government",
    "createdAt": "2025-01-01T00:00:00Z",
    "walletAddress": "0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9"
  }
}
```

### Update Profile
```http
PUT /api/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890",
  "organization": "Green Energy Corp"
}
```

## ⛓️ Blockchain API

### Get Wallet Status
```http
GET /api/blockchain/wallet
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9",
    "balance": "12.5847",
    "network": "ethereum",
    "isConnected": true
  }
}
```

### Deploy Smart Contract
```http
POST /api/blockchain/deploy
Authorization: Bearer {token}
Content-Type: application/json

{
  "contractType": "SubsidyContract",
  "name": "Solar Panel Subsidy Q1 2025",
  "totalAmount": "1000000",
  "beneficiaries": ["0x..."]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "contractAddress": "0x8c3f42Aa1e7F9B5C92D11e6F89B5E7C6D4F3A2B1",
    "transactionHash": "0xa1b2c3d4e5f6789012345678901234567890abcdef...",
    "gasUsed": "2100000",
    "status": "pending"
  }
}
```

### Get Transactions
```http
GET /api/blockchain/transactions?page=1&limit=10
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "1",
        "hash": "0xa1b2c3d4e5f6789012345678901234567890abcdef...",
        "from": "0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9",
        "to": "0x8c3f42Aa1e7F9B5C92D11e6F89B5E7C6D4F3A2B1",
        "value": "250000",
        "status": "confirmed",
        "type": "subsidy_release",
        "timestamp": "2025-01-01T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

## 💰 Subsidy Management

### Get Available Subsidies
```http
GET /api/subsidies?status=active&category=renewable_energy
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "subsidy_001",
      "name": "Solar Panel Installation Subsidy",
      "description": "Government subsidy for residential solar installations",
      "amount": "50000",
      "category": "renewable_energy",
      "eligibility": {
        "minInvestment": "100000",
        "location": "eligible_states",
        "timeline": "12_months"
      },
      "status": "active",
      "applicationDeadline": "2025-12-31T23:59:59Z"
    }
  ]
}
```

### Apply for Subsidy
```http
POST /api/subsidies/apply
Authorization: Bearer {token}
Content-Type: application/json

{
  "subsidyId": "subsidy_001",
  "projectDetails": {
    "title": "Residential Solar Installation",
    "description": "Installing 5kW solar panel system",
    "estimatedCost": "150000",
    "location": "Mumbai, Maharashtra"
  },
  "documents": [
    {
      "type": "property_ownership",
      "hash": "QmX1b2c3d4e5f6789012345..."
    }
  ]
}
```

### Get Application Status
```http
GET /api/subsidies/applications/{applicationId}
Authorization: Bearer {token}
```

## 📊 Analytics & Reporting

### Dashboard Statistics
```http
GET /api/analytics/dashboard
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSubsidies": 25,
    "totalDisbursed": "5000000",
    "activeContracts": 12,
    "pendingApplications": 8,
    "analytics": {
      "monthlyGrowth": 15.5,
      "averageProcessingTime": "5.2 days",
      "successRate": 89.3
    }
  }
}
```

### Generate Report
```http
POST /api/reports/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "reportType": "subsidy_disbursement",
  "dateRange": {
    "startDate": "2025-01-01",
    "endDate": "2025-01-31"
  },
  "format": "pdf"
}
```

## 🔧 System Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T12:00:00Z",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "blockchain": "connected",
    "email": "operational"
  }
}
```

### API Status
```http
GET /api/status
```

**Response:**
```json
{
  "api": "operational",
  "rateLimit": {
    "limit": 100,
    "remaining": 95,
    "resetTime": "2025-01-01T12:15:00Z"
  }
}
```

## ⚠️ Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

### Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_FAILED` - Invalid credentials
- `AUTHORIZATION_DENIED` - Insufficient permissions
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `BLOCKCHAIN_ERROR` - Blockchain operation failed

## 📝 SDK & Examples

### JavaScript SDK
```javascript
import { HydroChainAPI } from '@hydrochain/sdk';

const api = new HydroChainAPI({
  baseURL: 'https://api.hydrochain.dev/v1',
  apiKey: 'your-api-key'
});

// Login
const auth = await api.auth.login({
  email: 'user@example.com',
  password: 'password'
});

// Deploy contract
const contract = await api.blockchain.deployContract({
  type: 'SubsidyContract',
  name: 'Solar Subsidy',
  amount: '1000000'
});
```

### Python SDK
```python
from hydrochain import HydroChainAPI

api = HydroChainAPI(
    base_url='https://api.hydrochain.dev/v1',
    api_key='your-api-key'
)

# Get dashboard data
dashboard = api.analytics.get_dashboard()
print(f"Total subsidies: {dashboard['totalSubsidies']}")
```

## 🔄 Webhooks

### Setting Up Webhooks
```http
POST /api/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["subsidy.approved", "transaction.confirmed"],
  "secret": "webhook-secret"
}
```

### Webhook Events
- `subsidy.applied` - New subsidy application
- `subsidy.approved` - Subsidy application approved
- `subsidy.rejected` - Subsidy application rejected
- `transaction.pending` - Transaction initiated
- `transaction.confirmed` - Transaction confirmed
- `contract.deployed` - Smart contract deployed

## 📋 Rate Limiting

- **Free Tier**: 100 requests/minute
- **Basic Tier**: 1,000 requests/minute
- **Premium Tier**: 10,000 requests/minute
- **Enterprise**: Custom limits

## 🆔 Versioning

API versioning is handled through the URL path:
- Current version: `v1`
- Previous versions supported for 12 months
- Breaking changes will increment major version

---

**For additional support, contact: api-support@hydrochain.dev**
