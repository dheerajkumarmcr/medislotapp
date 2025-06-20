# 🔐 Step-by-Step Deployment Guide with Credentials

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] GitHub account
- [ ] Vercel account
- [ ] Railway account  
- [ ] Git installed locally
- [ ] Node.js installed locally
- [ ] Java 11+ installed locally
- [ ] Maven installed locally

---

## 🗂️ Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with deployment configuration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medislotapp.git
git push -u origin main
```

### 1.2 Verify Repository Structure
Ensure your repository has this structure:
```
medislotapp/
├── MediSlot_App/
│   ├── .github/workflows/deploy.yml
│   ├── microservices/
│   │   ├── service-registry/
│   │   ├── api-gateway/
│   │   ├── appointment/
│   │   ├── doctor/
│   │   ├── patient/
│   │   ├── feedback/feedback/
│   │   ├── report/
│   │   └── SpringPrescription/demo/
│   └── UI/project/
├── deploy.sh
├── DEPLOYMENT_GUIDE.md
├── QUICK_START.md
└── STEP_BY_STEP_DEPLOYMENT.md
```

---

## 🗄️ Step 2: Database Setup (Railway PostgreSQL)

### 2.1 Create Railway Account
1. Go to [https://railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with GitHub
4. Authorize Railway to access your repositories

### 2.2 Create New Project
1. In Railway dashboard, click "New Project"
2. Select "Start from scratch"
3. Name your project: `MediSlot Backend`

### 2.3 Add PostgreSQL Database
1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Click "Add PostgreSQL"
4. Wait for database to be created (1-2 minutes)

### 2.4 Get Database Credentials
1. Click on your PostgreSQL service
2. Go to **Variables** tab
3. You'll see these environment variables automatically created:
   ```
   PGHOST=containers-us-west-xxx.railway.app
   PGPORT=xxxxx
   PGUSER=postgres
   PGPASSWORD=xxxxxxxxxxxxxxxx
   PGDATABASE=railway
   ```
4. **Copy these values** - you'll need them for all backend services!

### 2.5 Create Connection String
Format your connection string using the Railway variables:
```
postgresql://postgres:[PGPASSWORD]@[PGHOST]:[PGPORT]/[PGDATABASE]
```

**Example:**
```
postgresql://postgres:abc123def456@containers-us-west-123.railway.app:5432/railway
```

**⚠️ Save this connection string - you'll need it for all backend services!**

### 2.6 Test Database Connection
1. Go to **Connect** tab in your PostgreSQL service
2. Click "Connect" to open Railway's database interface
3. Run a test query:
   ```sql
   SELECT version();
   ```
4. You should see PostgreSQL version information

---

## 🚂 Step 3: Backend Deployment (Railway)

### 3.1 Deploy Service Registry (First Service)

#### 3.1.1 Create Service Registry Service
1. In your Railway project, click "New Service"
2. Select "GitHub Repo"
3. Choose your `medislotapp` repository
4. Set **Root Directory** to: `MediSlot_App/microservices/service-registry`
5. Click "Deploy"

#### 3.1.2 Configure Environment Variables
1. Go to your service registry service
2. Click **Variables** tab
3. Add these environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   PORT=8761
   ```
4. Click "Add" for each variable

#### 3.1.3 Get Service Registry URL
1. Wait for deployment to complete (2-3 minutes)
2. Click on your service
3. Copy the **Domain** URL (e.g., `https://service-registry-production-xxxx.up.railway.app`)
4. **Save this URL** - you'll need it for all other services!

### 3.2 Deploy API Gateway

#### 3.2.1 Create API Gateway Service
1. In your Railway project, click "New Service"
2. Select "GitHub Repo"
3. Choose your `medislotapp` repository
4. Set **Root Directory** to: `MediSlot_App/microservices/api-gateway`
5. Click "Deploy"

#### 3.2.2 Configure Environment Variables
Add these variables:
```
SPRING_PROFILES_ACTIVE=prod
EUREKA_URL=https://[YOUR_SERVICE_REGISTRY_URL]/eureka/
FRONTEND_URL=https://[YOUR_FRONTEND_URL].vercel.app
```

**Replace placeholders with actual URLs from previous steps**

#### 3.2.3 Get API Gateway URL
1. Wait for deployment
2. Copy the **Domain** URL
3. **Save this URL** - you'll need it for frontend configuration!

### 3.3 Deploy Microservices

#### 3.3.1 Deploy Appointment Service
1. Create new service in Railway project
2. Set **Root Directory** to: `MediSlot_App/microservices/appointment`
3. Add environment variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   EUREKA_URL=https://[YOUR_SERVICE_REGISTRY_URL]/eureka/
   DATABASE_URL=[YOUR_RAILWAY_POSTGRES_CONNECTION_STRING]
   ```

#### 3.3.2 Deploy Doctor Service
1. Create new service
2. Set **Root Directory** to: `MediSlot_App/microservices/doctor`
3. Add same environment variables as above

#### 3.3.3 Deploy Patient Service
1. Create new service
2. Set **Root Directory** to: `MediSlot_App/microservices/patient`
3. Add same environment variables

#### 3.3.4 Deploy Feedback Service
1. Create new service
2. Set **Root Directory** to: `MediSlot_App/microservices/feedback/feedback`
3. Add same environment variables

#### 3.3.5 Deploy Report Service
1. Create new service
2. Set **Root Directory** to: `MediSlot_App/microservices/report`
3. Add same environment variables

#### 3.3.6 Deploy Prescription Service
1. Create new service
2. Set **Root Directory** to: `MediSlot_App/microservices/SpringPrescription/demo`
3. Add same environment variables

### 3.4 Verify All Services Are Running
1. Go to Railway dashboard
2. Check that all services show "Deployed" status
3. Click on each service to verify it's accessible
4. Test health endpoints:
   - Service Registry: `https://[URL]/actuator/health`
   - API Gateway: `https://[URL]/actuator/health`

---

## 🌐 Step 4: Frontend Deployment (Vercel)

### 4.1 Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel to access your repositories

### 4.2 Import Project
1. In Vercel dashboard, click "New Project"
2. Select "Import Git Repository"
3. Choose your `medislotapp` repository
4. Click "Import"

### 4.3 Configure Build Settings
1. Set **Framework Preset** to: `Vite`
2. Set **Root Directory** to: `MediSlot_App/UI/project`
3. Set **Build Command** to: `npm run build`
4. Set **Output Directory** to: `dist`
5. Set **Install Command** to: `npm ci`

### 4.4 Add Environment Variables
1. Click "Environment Variables"
2. Add variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://[YOUR_API_GATEWAY_URL]`
   - **Environment**: Production, Preview, Development
3. Click "Add"

### 4.5 Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Copy your **Production URL** (e.g., `https://medislotapp.vercel.app`)

### 4.6 Update Backend CORS
1. Go back to Railway dashboard
2. Find your API Gateway service
3. Update the `FRONTEND_URL` environment variable with your Vercel URL
4. Redeploy the API Gateway service

---

## 🔄 Step 5: CI/CD Pipeline Setup (GitHub Actions)

### 5.1 Get Vercel Tokens
1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it: `MediSlot Deployment`
4. Copy the token (you won't see it again!)

### 5.2 Get Vercel Project Info
1. In Vercel dashboard, go to your project
2. Go to **Settings** → **General**
3. Copy:
   - **Project ID**
   - **Team ID** (if you're in a team)

### 5.3 Get Railway Token
1. Go to Railway dashboard
2. Click your profile picture → **Account**
3. Go to **Tokens** tab
4. Click "New Token"
5. Name it: `GitHub Actions`
6. Copy the token

### 5.4 Add GitHub Secrets
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret"
4. Add these secrets:

```
VERCEL_TOKEN=[your-vercel-token]
VERCEL_ORG_ID=[your-team-id-or-user-id]
VERCEL_PROJECT_ID=[your-project-id]
RAILWAY_TOKEN=[your-railway-token]
```

### 5.5 Test CI/CD Pipeline
1. Make a small change to your code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```
3. Go to **Actions** tab in GitHub
4. Watch the workflow run

---

## 🧪 Step 6: Testing & Verification

### 6.1 Test Frontend
1. Visit your Vercel URL
2. Check if the application loads
3. Test navigation between pages
4. Check browser console for errors

### 6.2 Test Backend Services
1. Test Service Registry: `https://[URL]/eureka/`
2. Test API Gateway: `https://[URL]/actuator/health`
3. Test individual services: `https://[URL]/actuator/health`

### 6.3 Test API Endpoints
1. Test appointment endpoints: `https://[API_GATEWAY_URL]/api/appointments/`
2. Test doctor endpoints: `https://[API_GATEWAY_URL]/api/doctors/`
3. Test patient endpoints: `https://[API_GATEWAY_URL]/api/patients/`

### 6.4 Test Database Connection
1. Go to Railway dashboard
2. Click on your PostgreSQL service
3. Go to **Connect** tab
4. Run a test query in the database interface

---

## 🔧 Step 7: Troubleshooting Common Issues

### 7.1 Service Discovery Issues
**Problem**: Services not registering with Eureka
**Solution**:
1. Check `EUREKA_URL` environment variable
2. Ensure Service Registry is running first
3. Verify network connectivity

### 7.2 Database Connection Issues
**Problem**: Can't connect to Railway PostgreSQL
**Solution**:
1. Verify connection string format
2. Check if PostgreSQL service is running
3. Ensure environment variables are set correctly

### 7.3 Frontend API Calls Failing
**Problem**: CORS errors or API calls failing
**Solution**:
1. Check `VITE_API_BASE_URL` environment variable
2. Verify API Gateway CORS configuration
3. Check browser network tab for errors

### 7.4 Build Failures
**Problem**: GitHub Actions build failing
**Solution**:
1. Check build logs in Actions tab
2. Verify all dependencies are in pom.xml/package.json
3. Check Java/Node.js versions

---

## 📊 Step 8: Monitoring & Maintenance

### 8.1 Set Up Monitoring
1. **Vercel Analytics**: Built-in performance monitoring
2. **Railway Logs**: Real-time service logs (all in one place!)
3. **Railway Database**: Built-in database monitoring
4. **GitHub Actions**: Build and deployment status

### 8.2 Regular Maintenance
1. **Weekly**: Check service health endpoints
2. **Monthly**: Review usage and costs
3. **Quarterly**: Update dependencies
4. **As needed**: Monitor logs for errors

---

## 🎯 Step 9: Final Checklist

Before sharing with customers, verify:

- [ ] Frontend loads without errors
- [ ] All backend services are running
- [ ] Database connections are working
- [ ] API endpoints are responding
- [ ] CI/CD pipeline is working
- [ ] Environment variables are set correctly
- [ ] SSL certificates are valid
- [ ] CORS is configured properly
- [ ] Health checks are passing
- [ ] Error handling is working

---

## 🌟 Step 10: Share Your Application

### 10.1 Your Live URLs
- **Frontend**: `https://your-app.vercel.app`
- **API Gateway**: `https://your-api-gateway.railway.app`
- **Service Registry**: `https://your-service-registry.railway.app`
- **Database**: Managed in Railway dashboard

### 10.2 Share with Customers
1. Send the frontend URL to customers
2. Provide API documentation if needed
3. Set up monitoring alerts
4. Create support documentation

---

## 🆘 Need Help?

### Support Resources
- **Vercel**: [https://vercel.com/support](https://vercel.com/support)
- **Railway**: [https://docs.railway.app](https://docs.railway.app)
- **GitHub Actions**: [https://docs.github.com/en/actions](https://docs.github.com/en/actions)

### Common Issues Database
- Check the troubleshooting section above
- Review platform-specific documentation
- Join community Discord servers for help

---

## 🎉 Congratulations!

Your MediSlot application is now live and ready for customers!

**Share this URL**: `https://your-app.vercel.app`

**Total Cost**: $0/month 🆓
**Deployment Time**: ~30 minutes
**Maintenance**: Minimal (automated CI/CD)
**Management**: Everything in Railway dashboard! 🎯 