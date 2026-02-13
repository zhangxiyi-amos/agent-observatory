#!/bin/bash
# Project initialization and dev environment startup script
# This script should be idempotent - safe to run multiple times

set -e

echo "🚀 Starting development environment..."

# Install dependencies
if [ -f "package.json" ]; then
    echo "📦 Installing npm dependencies..."
    npm install 2>/dev/null || pnpm install 2>/dev/null || yarn install 2>/dev/null
fi

if [ -f "requirements.txt" ]; then
    echo "🐍 Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Start dev server (customize for your project)
# Example for Next.js/Node:
# echo "🌐 Starting dev server..."
# npm run dev &
# sleep 3

# Smoke test
echo "🧪 Running smoke test..."
# Example:
# curl -f http://localhost:3000/health || { echo "❌ Smoke test failed"; exit 1; }
echo "✅ Environment ready"

# Tips for coding agent:
echo ""
echo "📋 Next steps:"
echo "1. Read .dev/feature_list.json to find next feature"
echo "2. Implement ONE feature"
echo "3. Test end-to-end"
echo "4. Update feature_list.json, commit, update progress.txt"
