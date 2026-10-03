#!/bin/bash
set -e

echo "=== Tools4Us Update ==="

git add .

if ! git diff --cached --quiet; then
    git commit -m "Update Tools4Us"
else
    echo "No new local changes to commit."
fi

echo "Pushing to shared repository..."
git push origin main

echo "Updating Cloudflare deployment repository..."
git push deploy main

echo "Done."
git status
