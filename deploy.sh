#!/bin/bash

# Exit on any error
set -e

# Check if commit message is passed
if [ -z "$1" ]; then
  echo "❌ Please provide a commit message."
  echo "Usage: ./deploy.sh \"Your commit message\""
  exit 1
fi

# Define variables
PROJECT_ROOT=$(pwd)
DEPLOY_DIR=~/myspace/himpri

echo "🚀 Starting deployment..."

# Step 1: Build Vue project
echo "🔧 Building Vue project..."
npm run build

# Step 2: Copy build output to himpri repo
echo "📦 Copying build to $DEPLOY_DIR ..."
rsync -av --delete --exclude='.git' "$PROJECT_ROOT/dist/" "$DEPLOY_DIR/"

# Step 3: Commit and push
cd "$DEPLOY_DIR"
echo "📤 Committing and pushing to GitHub..."
git add .
git commit -m "$1"
git push origin main  # change branch if needed

echo "✅ Deployment complete!"
