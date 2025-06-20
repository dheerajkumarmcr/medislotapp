#!/bin/bash

# MediSlot Application Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Starting MediSlot Application Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v java &> /dev/null; then
        print_error "Java is not installed. Please install Java 11 or higher."
        exit 1
    fi
    
    if ! command -v mvn &> /dev/null; then
        print_error "Maven is not installed. Please install Maven first."
        exit 1
    fi
    
    print_status "All prerequisites are satisfied!"
}

# Build all microservices
build_microservices() {
    print_status "Building microservices..."
    
    cd microservices
    
    services=("service-registry" "api-gateway" "appointment" "doctor" "patient" "feedback/feedback" "report" "SpringPrescription/demo")
    
    for service in "${services[@]}"; do
        if [ -f "$service/pom.xml" ]; then
            print_status "Building $service..."
            cd "$service"
            mvn clean package -DskipTests
            cd ../..
        else
            print_warning "No pom.xml found in $service, skipping..."
        fi
    done
    
    cd ..
    print_status "All microservices built successfully!"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    
    cd UI/project
    
    if [ -f "package.json" ]; then
        npm ci
        npm run build
        print_status "Frontend built successfully!"
    else
        print_error "package.json not found in UI/project"
        exit 1
    fi
    
    cd ../..
}

# Deploy to Railway (if railway CLI is available)
deploy_to_railway() {
    if command -v railway &> /dev/null; then
        print_status "Deploying to Railway..."
        
        # Check if user is logged in
        if ! railway whoami &> /dev/null; then
            print_warning "Please login to Railway first: railway login"
            return
        fi
        
        cd microservices
        
        # Deploy service registry first
        if [ -d "service-registry" ]; then
            print_status "Deploying service-registry..."
            cd service-registry
            railway up --service service-registry
            cd ..
        fi
        
        # Deploy other services
        services=("api-gateway" "appointment" "doctor" "patient" "feedback/feedback" "report" "SpringPrescription/demo")
        
        for service in "${services[@]}"; do
            if [ -d "$service" ]; then
                service_name=$(basename "$service")
                print_status "Deploying $service_name..."
                cd "$service"
                railway up --service "$service_name-service"
                cd ../..
            fi
        done
        
        cd ..
        print_status "Railway deployment completed!"
    else
        print_warning "Railway CLI not found. Please install it: npm install -g @railway/cli"
    fi
}

# Deploy to Vercel (if vercel CLI is available)
deploy_to_vercel() {
    if command -v vercel &> /dev/null; then
        print_status "Deploying to Vercel..."
        
        cd UI/project
        
        if [ -f "package.json" ]; then
            vercel --prod --yes
            print_status "Vercel deployment completed!"
        else
            print_error "package.json not found in UI/project"
            exit 1
        fi
        
        cd ../..
    else
        print_warning "Vercel CLI not found. Please install it: npm install -g vercel"
    fi
}

# Main deployment function
main() {
    print_status "Starting deployment process..."
    
    # Check prerequisites
    check_prerequisites
    
    # Build everything
    build_microservices
    build_frontend
    
    # Deploy if CLIs are available
    deploy_to_railway
    deploy_to_vercel
    
    print_status "Deployment process completed!"
    print_status "Next steps:"
    echo "1. Set up environment variables in Railway dashboard"
    echo "2. Set up environment variables in Vercel dashboard"
    echo "3. Configure GitHub Actions secrets for CI/CD"
    echo "4. Test your deployed application"
}

# Run main function
main "$@" 