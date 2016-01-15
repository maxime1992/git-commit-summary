#!/usr/bin/env node
var gitCommitSummary = require('./git-commit-summary').GitCommitSummary;

gitCommitSummary = new gitCommitSummary();

gitCommitSummary.generate();
