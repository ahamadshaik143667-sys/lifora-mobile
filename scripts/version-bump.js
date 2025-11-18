#!/usr/bin/env node

/**
 * Version bumping script
 * Usage: npm run version:bump [major|minor|patch]
 */

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const appJsonPath = path.join(__dirname, '..', 'app.json');

const bumpType = process.argv[2] || 'patch';

function bumpVersion(version, type) {
  const parts = version.split('.').map(Number);

  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
      parts[2]++;
      break;
    default:
      throw new Error(`Invalid bump type: ${type}`);
  }

  return parts.join('.');
}

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const oldVersion = packageJson.version;
  const newVersion = bumpVersion(oldVersion, bumpType);

  // Update package.json
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  // Read app.json
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const oldAppVersion = appJson.expo.version;
  const newAppVersion = bumpVersion(oldAppVersion, bumpType);

  // Update app.json
  appJson.expo.version = newAppVersion;

  // Bump Android version code
  if (appJson.expo.android) {
    appJson.expo.android.versionCode = (appJson.expo.android.versionCode || 1) + 1;
  }

  // Bump iOS build number
  if (appJson.expo.ios) {
    appJson.expo.ios.buildNumber = String(parseInt(appJson.expo.ios.buildNumber || '1') + 1);
  }

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');

  console.log(`✅ Version bumped: ${oldVersion} → ${newVersion}`);
  console.log(`✅ App version: ${oldAppVersion} → ${newAppVersion}`);
  console.log(`\nNext steps:`);
  console.log(`1. Review changes in package.json and app.json`);
  console.log(
    `2. Commit: git add package.json app.json && git commit -m "chore: bump version to ${newVersion}"`
  );
  console.log(`3. Tag: git tag -a v${newVersion} -m "Release v${newVersion}"`);
  console.log(`4. Push: git push && git push --tags`);
} catch (error) {
  console.error('❌ Error bumping version:', error.message);
  process.exit(1);
}
