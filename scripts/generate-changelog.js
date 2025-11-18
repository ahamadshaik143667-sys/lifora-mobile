#!/usr/bin/env node

/**
 * Generate changelog from git commits
 * Usage: npm run changelog
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');

function getGitTags() {
  try {
    return execSync('git tag --sort=-version:refname', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getCommitsSince(tag) {
  try {
    const range = tag ? `${tag}..HEAD` : 'HEAD';
    return execSync(`git log ${range} --pretty=format:"%h|%s|%an|%ad" --date=short`, {
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [hash, subject, author, date] = line.split('|');
        return { hash, subject, author, date };
      });
  } catch {
    return [];
  }
}

function categorizeCommits(commits) {
  const categories = {
    feat: [],
    fix: [],
    chore: [],
    docs: [],
    refactor: [],
    perf: [],
    test: [],
    other: [],
  };

  commits.forEach(commit => {
    const match = commit.subject.match(/^(feat|fix|chore|docs|refactor|perf|test)(\(.+\))?:/i);
    if (match) {
      const type = match[1].toLowerCase();
      if (categories[type]) {
        categories[type].push(commit);
      } else {
        categories.other.push(commit);
      }
    } else {
      categories.other.push(commit);
    }
  });

  return categories;
}

function generateChangelog() {
  const tags = getGitTags();
  const latestTag = tags[0] || null;
  const commits = getCommitsSince(latestTag);
  const categorized = categorizeCommits(commits);

  if (commits.length === 0) {
    console.log('No new commits since last tag');
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const version = require('../package.json').version;

  let changelog = `# Changelog\n\n`;
  changelog += `All notable changes to this project will be documented in this file.\n\n`;
  changelog += `## [${version}] - ${date}\n\n`;

  if (categorized.feat.length > 0) {
    changelog += `### ✨ Features\n`;
    categorized.feat.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.fix.length > 0) {
    changelog += `### 🐛 Bug Fixes\n`;
    categorized.fix.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.perf.length > 0) {
    changelog += `### ⚡ Performance\n`;
    categorized.perf.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.refactor.length > 0) {
    changelog += `### ♻️ Refactoring\n`;
    categorized.refactor.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.docs.length > 0) {
    changelog += `### 📚 Documentation\n`;
    categorized.docs.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.chore.length > 0) {
    changelog += `### 🔧 Chores\n`;
    categorized.chore.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.test.length > 0) {
    changelog += `### 🧪 Tests\n`;
    categorized.test.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  if (categorized.other.length > 0) {
    changelog += `### 📝 Other\n`;
    categorized.other.forEach(commit => {
      changelog += `- ${commit.subject} (${commit.hash})\n`;
    });
    changelog += `\n`;
  }

  // Append to existing changelog if it exists
  let existingChangelog = '';
  if (fs.existsSync(changelogPath)) {
    existingChangelog = fs.readFileSync(changelogPath, 'utf8');
    // Remove the header if it exists
    existingChangelog = existingChangelog.replace(/^# Changelog\n\n.*?\n\n/, '');
  }

  fs.writeFileSync(
    changelogPath,
    `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n${changelog}${existingChangelog}`
  );

  console.log(`✅ Changelog generated: ${changelogPath}`);
  console.log(`📝 ${commits.length} commits included`);
}

generateChangelog();
