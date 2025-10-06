#!/bin/bash

# Local deployment test script
set -e

echo "🚀 Starting local deployment test..."

# Change to task-manager directory
cd task-manager

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔍 Running linting..."
pnpm run lint

echo "🏗️ Building project..."
pnpm run build

echo "✅ Local deployment test completed successfully!"