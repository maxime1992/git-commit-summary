// "npm start" to launch the generation
import readline from 'readline';
import {spawn} from 'child_process';
import jsonfile from 'jsonfile';

class GitCommit {
	constructor({repoCommitLink = '', sha = '', type = '', description = ''}) {
		this._repoCommitLink = repoCommitLink;
		this._sha            = sha;
		this._type           = type;
		this._description    = description;
	}

	getSha() {
		return this._sha;
	}

	getType() {
		return this._type;
	}

	getDescription() {
		return this._description;
	}

	// if template is given, it will replace default output
	// use ${sha}, ${type} and ${description} in the template
	toString(template) {
		// replace default output
		if (template && template!='') {
			template = template.replace(/\${sha}/, this._sha);
			template = template.replace(/\${type}/, this._type);
			template = template.replace(/\${description}/, this._description);
			return template;
		}

		// default output: markdown table
		return `| [${this._sha.substr(0,7)}](${this._repoCommitLink}${this._sha}) | **${this._type}** | ${this._description} |`;
	}
}

export class GitCommitSummary {
	// repoCommitLink : string        - https://github.com/maxime1992/git-commit-summary/commit/ for example
	// headerLines    : Array<string> - You can define multiple lines to add before the commit summary
	// footerLines    : Array<string> - You can define multiple lines to add after the commit summary
	constructor({repoCommitLink, headerLines, footerLines} = {repoCommitLink : '', headerLines : [], footerLines : []}) {
		this._repoCommitLink = repoCommitLink;
		this._headerLines    = headerLines;
		this._footerLines    = footerLines;

		this._commits = [];

		// types to check
		this.types = [
			{name: 'chore', regex: /([a-zA-Z0-9]*) (chore|chore\([a-zA-Z]*\)): (.*)/},
			{name: 'doc', regex: /([a-zA-Z0-9]*) (doc): (.*)/},
			{name: 'feat', regex: /([a-zA-Z0-9]*) (feat|feat\([a-zA-Z]*\)): (.*)/},
			{name: 'fix', regex: /([a-zA-Z0-9]*) (fix): (.*)/},
			{name: 'perf', regex: /([a-zA-Z0-9]*) (perf): (.*)/},
			{name: 'refactor', regex: /([a-zA-Z0-9]*) (refactor): (.*)/},
			{name: 'style', regex: /([a-zA-Z0-9]*) (style): (.*)/},
			{name: 'test', regex: /([a-zA-Z0-9]*) (test): (.*)/}
		];
	}

	generate() {
		jsonfile.readFile('./.gitcommitsummary', (err, config) => {
			if (err) {
				console.log('Create a file called ".gitcommitsummary" at the root of your project to use git-commit-summary or pass arguments with nodejs.');
				return;
			}

			// load configuration from json file if not already defined
			if (this._repoCommitLink.length === 0) {
				this._repoCommitLink = config.repoCommitLink;
			}

			if (this._headerLines.length === 0 ) {
				this._headerLines = config.headerLines;
			}

			if (this._footerLines.length === 0) {
				this._footerLines = config.footerLines;
			}

			if (typeof this._repoCommitLink === 'undefined' || typeof this._headerLines === 'undefined' || typeof this._footerLines === 'undefined') {
				console.log('Please, define repoCommitLink, headerLines and footerLines.');
				return;
			}

			this._generate();
		});
	}

	_generate() {
		this._commits = [];

		// git command to show commit history with only the first line of each commit
		let gitResult = spawn('git', [
			'--no-pager',
			'log',
			'--pretty=oneline'
		]);

		// handle process error
		gitResult.on('error', (err) => { throw err; });

		// set encoding and handle incoming data
		gitResult.stdout.setEncoding('utf8');
		gitResult.stdout.on('data', (data) => {
			// split data by line
			let lines = data.toString().match(/[^\r\n]+/g);

			// display header's lines
			for (let headerLine of this._headerLines) {
				console.log(headerLine);
			}

			for (let line of lines) {
				for (let type of this.types) {
					if (type.regex.test(line) && line.match(type.regex)[2] != '') {
						let commitSha         = line.match(type.regex)[1];
						let commitType        = line.match(type.regex)[2];
						let commitDescription = line.match(type.regex)[3];

						this._commits.push(
							new GitCommit({
								repoCommitLink: this._repoCommitLink,
								sha: commitSha,
								type: commitType,
								description: commitDescription
							})
						);
					}
				}
			}

			this._commitsToString();

			// display footer's lines
			for (let footerLine of this._footerLines) {
				console.log(footerLine);
			}
		});
	}

	_commitsToString() {
		for (let commit of this._commits) {
			console.log(commit.toString());
		}
	}
}
