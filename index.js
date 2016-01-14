require('babel-core/register');
var gitCommitSummary = require('./git-commit-summary').GitCommitSummary;
// GitCommitSummary.generate();
gitCommitSummary = new gitCommitSummary();

gitCommitSummary.generate();
