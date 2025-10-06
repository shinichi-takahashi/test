# Deployment Guide

## GitHub Actions Deployment Fix

This document explains how to resolve the pnpm deployment error in GitHub Actions.

### Problem
```
ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
```

### Solution

The issue was caused by:
1. **Wrong working directory**: GitHub Actions was running from the root directory instead of the `task-manager` subdirectory
2. **Incorrect pnpm version**: The lockfile was created with pnpm v9, but CI was using v8
3. **Missing proper pnpm setup**: The workflow needed proper pnpm configuration

### Files Created/Updated

1. **`.github/workflows/deploy.yml`** - Main deployment workflow
2. **`.github/workflows/deploy-fallback.yml`** - Fallback workflow (manual trigger only)
3. **`deploy-local.sh`** - Local testing script

### Key Changes

#### Main Workflow (`.github/workflows/deploy.yml`)
- Uses pnpm v9 (matches lockfile version 9.0)
- Sets `working-directory: ./task-manager` for all pnpm commands
- Proper pnpm cache configuration
- Correct lockfile path in cache key: `task-manager/pnpm-lock.yaml`

#### Fallback Workflow (`.github/workflows/deploy-fallback.yml`)
- Uses `--no-frozen-lockfile` as suggested in the error message
- Only triggered manually via `workflow_dispatch`
- Automatically commits lockfile changes if needed

### Local Testing

Run the local deployment test:
```bash
./deploy-local.sh
```

This script:
1. Changes to the `task-manager` directory
2. Installs dependencies with `--frozen-lockfile`
3. Runs linting
4. Builds the project

### Troubleshooting

#### If you still get lockfile errors:

1. **Use the fallback workflow**: Manually trigger the fallback workflow from GitHub Actions tab
2. **Regenerate lockfile**: Delete `pnpm-lock.yaml` and run `pnpm install` locally, then commit
3. **Check pnpm version**: Ensure your local pnpm version matches the CI version (v9)

#### If the build fails:

1. **Check Node.js version**: The workflow uses Node.js 20
2. **Verify dependencies**: Run `pnpm install` locally to check for dependency issues
3. **Test locally**: Use `./deploy-local.sh` to test the entire process

### Project Structure

```
/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Main deployment workflow
│       └── deploy-fallback.yml # Fallback workflow
├── task-manager/               # Next.js application
│   ├── package.json
│   ├── pnpm-lock.yaml         # pnpm lockfile (v9.0)
│   └── ...
├── deploy-local.sh            # Local testing script
└── DEPLOYMENT.md              # This file
```

### Next Steps

1. Commit and push these changes to your repository
2. The GitHub Actions workflow will automatically run on push to main/master
3. Monitor the Actions tab to ensure successful deployment
4. If issues persist, use the fallback workflow or check the troubleshooting section