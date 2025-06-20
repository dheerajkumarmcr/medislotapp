# MediSlot Application Deployment Guide

This guide will help you deploy the MediSlot application using free resources and set up a CI/CD pipeline.

## 🚀 Free Deployment Resources

### Frontend (React + Vite)
- **Platform**: Vercel
- **Free Tier**: Unlimited deployments, custom domains
- **URL**: https://vercel.com

### Backend Microservices (Spring Boot)
- **Platform**: Railway
- **Free Tier**: $5 credit monthly, 500 hours runtime
- **URL**: https://railway.app

### Database
- **Platform**: Supabase (PostgreSQL)
- **Free Tier**: 500MB database, 50MB file storage
- **URL**: https://supabase.com

### CI/CD Pipeline
- **Platform**: GitHub Actions
- **Free Tier**: 2000 minutes/month for public repos

## 📋 Prerequisites

1. **GitHub Account**: For source control and CI/CD
2. **Vercel Account**: For frontend deployment
3. **Railway Account**: For backend deployment
4. **Supabase Account**: For database

## 🔧 Step-by-Step Deployment

### Step 1: Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings > Database to get your connection string
4. Note down the following details:
   - Database URL
   - Database Password
   - API Key

### Step 2: Backend Deployment (Railway)

1. **Sign up for Railway**:
   - Go to [Railway](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy Service Registry**:
   ```bash
   # Clone your repository
   git clone <your-repo-url>
   cd medislotapp
   
   # Deploy service registry
   railway login
   railway init --service service-registry
   cd MediSlot_App/microservices/service-registry
   railway up
   ```

3. **Deploy API Gateway**:
   ```bash
   cd ../api-gateway
   railway init --service api-gateway
   railway up
   ```

4. **Deploy Microservices**:
   ```bash
   # Repeat for each service
   cd ../appointment
   railway init --service appointment-service
   railway up
   
   cd ../doctor
   railway init --service doctor-service
   railway up
   
   cd ../patient
   railway init --service patient-service
   railway up
   
   cd ../feedback/feedback
   railway init --service feedback-service
   railway up
   
   cd ../../report
   railway init --service report-service
   railway up
   
   cd ../SpringPrescription/demo
   railway init --service prescription-service
   railway up
   ```

5. **Set Environment Variables**:
   For each service in Railway dashboard, add these environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   EUREKA_URL=https://your-service-registry-url.railway.app/eureka/
   DATABASE_URL=your-supabase-connection-string
   ```

### Step 3: Frontend Deployment (Vercel)

1. **Sign up for Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Sign up with your GitHub account

2. **Deploy Frontend**:
   ```bash
   cd MediSlot_App/UI/project
   npm install -g vercel
   vercel
   ```

3. **Configure Environment Variables**:
   In Vercel dashboard, add:
   ```
   VITE_API_BASE_URL=https://your-api-gateway-url.railway.app
   ```

### Step 4: CI/CD Pipeline Setup (GitHub Actions)

1. **Add GitHub Secrets**:
   Go to your GitHub repository > Settings > Secrets and variables > Actions
   Add the following secrets:
   ```
   VERCEL_TOKEN=your-vercel-token
   VERCEL_ORG_ID=your-vercel-org-id
   VERCEL_PROJECT_ID=your-vercel-project-id
   RAILWAY_TOKEN=your-railway-token
   ```

2. **Get Vercel Tokens**:
   ```bash
   vercel login
   vercel whoami
   # Get tokens from Vercel dashboard
   ```

3. **Get Railway Token**:
   - Go to Railway dashboard > Account > Tokens
   - Create a new token

4. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

## 🔄 CI/CD Pipeline Features

The GitHub Actions workflow will:

1. **Build and Test**: Compile all microservices and run tests
2. **Deploy Frontend**: Automatically deploy to Vercel
3. **Deploy Backend**: Deploy all microservices to Railway
4. **Health Checks**: Verify all services are running

## 🌐 Final URLs

After deployment, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **API Gateway**: `https://your-api-gateway.railway.app`
- **Service Registry**: `https://your-service-registry.railway.app`
- **Individual Services**: `https://your-service-name.railway.app`

## 🔧 Environment Variables

### Frontend (Vercel)
```
VITE_API_BASE_URL=https://your-api-gateway-url.railway.app
```

### Backend Services (Railway)
```
SPRING_PROFILES_ACTIVE=prod
EUREKA_URL=https://your-service-registry-url.railway.app/eureka/
DATABASE_URL=postgresql://username:password@host:port/database
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 📊 Monitoring

1. **Vercel Analytics**: Built-in performance monitoring
2. **Railway Logs**: Real-time service logs
3. **Supabase Dashboard**: Database monitoring

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **CORS Configuration**: Properly configured for production
3. **Database Security**: Use connection pooling and SSL
4. **API Security**: Implement rate limiting and authentication

## 🚨 Troubleshooting

### Common Issues:

1. **Service Discovery Issues**:
   - Check Eureka server is running
   - Verify environment variables
   - Check network connectivity

2. **Database Connection Issues**:
   - Verify Supabase connection string
   - Check database credentials
   - Ensure SSL is enabled

3. **Frontend API Calls Failing**:
   - Check CORS configuration
   - Verify API gateway URL
   - Check network requests in browser

### Support Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📈 Scaling Considerations

When you need to scale beyond free tiers:

1. **Railway**: Upgrade to paid plan for more resources
2. **Vercel**: Pro plan for more bandwidth and features
3. **Supabase**: Pro plan for larger database and more features
4. **Consider**: AWS, Google Cloud, or Azure for enterprise scaling

## 🎉 Success!

Once deployed, you'll have a fully functional, production-ready MediSlot application with:
- ✅ Automated CI/CD pipeline
- ✅ Scalable microservices architecture
- ✅ Modern React frontend
- ✅ PostgreSQL database
- ✅ Service discovery and load balancing
- ✅ Health monitoring and logging

Share your live URL with customers: `https://your-app.vercel.app` 