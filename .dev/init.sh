#!/bin/bash
# Agent Observatory - Development Environment Setup
set -e

echo "🚀 Starting Agent Observatory development environment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Start dev server in background
echo "🌐 Starting Next.js dev server..."
pnpm dev &
DEV_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 5

# Basic smoke test
echo "🧪 Running smoke test..."
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Dev server is running at http://localhost:3000"
else
    echo "⚠️  Server may still be starting, check manually"
fi

echo ""
echo "📋 Development ready!"
echo ""
echo "Next steps for coding agent:"
echo "1. Read .dev/feature_list.json"
echo "2. Find the highest priority feature with passes: false"
echo "3. Implement it"
echo "4. Test visually in browser"
echo "5. Update feature_list.json, commit, update progress.txt"
echo ""
echo "Dev server PID: $DEV_PID"
echo "To stop: kill $DEV_PID"
