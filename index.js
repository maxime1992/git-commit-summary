require('babel-core/register');
var gitCommitSummary = require('./git-commit-summary').GitCommitSummary;

gitCommitSummary = new gitCommitSummary({
	repoCommitLink: 'https://github.com/maxime1992/git-commit-summary/commit/',
	headerLines: [
		'| Commit | Type | Description |',
		'| ------ | ---- | ----------- |'
	],
	footerLines: ['Commit generated with git-commit-summary module.']
});

gitCommitSummary._generate();
