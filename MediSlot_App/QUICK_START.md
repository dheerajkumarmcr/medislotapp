# 🚀 Quick Start Deployment Guide

Get your MediSlot application live in 15 minutes!

## ⚡ Quick Deployment Steps

### 1. Frontend Deployment (Vercel) - 5 minutes

1. **Go to [Vercel](https://vercel.com) and sign up**
2. **Import your GitHub repository**
3. **Configure build settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
4. **Add Environment Variable**:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://your-api-gateway-url.railway.app` (you'll get this after backend deployment)
5. **Deploy!**

### 2. Backend Deployment (Railway) - 10 minutes

1. **Go to [Railway](https://railway.app) and sign up**
2. **Create a new project**
3. **Deploy services in this order**:

#### Step 2.1: Database Setup
```bash
# In Railway dashboard, create new project
# Click "New Service" → "Database" → "PostgreSQL"
# Wait for database to be created
# Go to Variables tab and copy the connection details:
PGHOST=containers-us-west-xxx.railway.app
PGPORT=xxxxx
PGUSER=postgres
PGPASSWORD=xxxxxxxxxxxxxxxx
PGDATABASE=railway

# Create connection string:
postgresql://postgres:[PGPASSWORD]@[PGHOST]:[PGPORT]/[PGDATABASE]
```

#### Step 2.2: Service Registry
```bash
# Create new service
# Set service directory to: MediSlot_App/microservices/service-registry
# Add environment variables:
SPRING_PROFILES_ACTIVE=prod
PORT=8761
```

#### Step 2.3: API Gateway
```bash
# Create new service
# Set directory to: MediSlot_App/microservices/api-gateway
# Add environment variables:
SPRING_PROFILES_ACTIVE=prod
EUREKA_URL=https://your-service-registry-url.railway.app/eureka/
FRONTEND_URL=https://your-frontend-url.vercel.app
```

#### Step 2.4: Microservices
```bash
# Deploy each service with directory:
# - appointment: MediSlot_App/microservices/appointment
# - doctor: MediSlot_App/microservices/doctor
# - patient: MediSlot_App/microservices/patient
# - feedback: MediSlot_App/microservices/feedback/feedback
# - report: MediSlot_App/microservices/report
# - prescription: MediSlot_App/microservices/SpringPrescription/demo

# Add environment variables to each:
SPRING_PROFILES_ACTIVE=prod
EUREKA_URL=https://your-service-registry-url.railway.app/eureka/
DATABASE_URL=your-railway-postgres-connection-string
```

## 🔗 Update Frontend API URL

After backend deployment, update your Vercel environment variable:
```
VITE_API_BASE_URL=https://your-api-gateway-url.railway.app
```

## ✅ Test Your Application

1. **Frontend**: Visit your Vercel URL
2. **API Gateway**: Visit your Railway API Gateway URL
3. **Service Registry**: Visit your Railway Service Registry URL
4. **Database**: Check Railway PostgreSQL service

## 🎯 Your Live URLs

- **Frontend**: `https://your-app.vercel.app`
- **API Gateway**: `https://your-api-gateway.railway.app`
- **Service Registry**: `https://your-service-registry.railway.app`
- **Database**: Managed in Railway dashboard

## 🚨 Common Issues & Solutions

### Frontend can't connect to backend
- Check CORS settings in API Gateway
- Verify `VITE_API_BASE_URL` environment variable
- Ensure API Gateway is running

### Services not registering with Eureka
- Check `EUREKA_URL` environment variable
- Ensure Service Registry is running first
- Verify network connectivity

### Database connection issues
- Check `DATABASE_URL` format
- Ensure PostgreSQL service is running in Railway
- Verify environment variables are set correctly

## 📞 Need Help?

- **Vercel Support**: https://vercel.com/support
- **Railway Support**: https://docs.railway.app

## 🎉 Success!

Your MediSlot application is now live and ready to share with customers!

**Share this URL**: `https://your-app.vercel.app`

## 🎯 Benefits of Railway Database

✅ **Single Dashboard**: Everything in one place  
✅ **Easy Management**: No external database platform  
✅ **Automatic Scaling**: Railway handles everything  
✅ **Built-in Monitoring**: All logs in Railway dashboard  
✅ **Cost Effective**: Included in free tier 