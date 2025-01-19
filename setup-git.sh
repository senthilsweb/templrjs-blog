#!/bin/bash

# Initialize git repository
git init

# Add the remote repository
git remote add origin https://github.com/senthilsweb/perf-metrics.git

# Create and switch to main branch
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial commit with performance metrics dashboard"

# Push to GitHub
git push -u origin main

