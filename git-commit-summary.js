// "npm start" to launch the generation
import readline from 'readline';
import {spawn} from 'child_process';

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
	constructor({repoCommitLink}) {
		this._repoCommitLink = repoCommitLink;

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

			console.log('| Commit | Type | Description |');
			console.log('| ------ | ---- | ----------- |');

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
		});
	}

	_commitsToString() {
		for (let commit of this._commits) {
			console.log(commit.toString());
		}
	}
}
