require('babel-core/register');
var gitCommitSummary = require('./git-commit-summary').GitCommitSummary;

gitCommitSummary = new gitCommitSummary();

gitCommitSummary.generate();
