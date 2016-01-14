require('babel-core/register');
var gitCommitSummary = require('./git-commit-summary').GitCommitSummary;

gitCommitSummary = new gitCommitSummary({repoCommitLink: 'https://github.com/maxime1992/git-commit-summary/commit/'});

gitCommitSummary._generate();
