// "npm start" to launch the generation
import readline from 'readline';
import {spawn} from 'child_process';

let types = [
	{name: 'chore', regex: /([a-zA-Z0-9]*) (chore|chore\([a-zA-Z]*\)): (.*)/},
	{name: 'doc', regex: /([a-zA-Z0-9]*) (doc): (.*)/},
	{name: 'feat', regex: /([a-zA-Z0-9]*) (feat|feat\([a-zA-Z]*\)): (.*)/},
	{name: 'fix', regex: /([a-zA-Z0-9]*) (fix): (.*)/},
	{name: 'perf', regex: /([a-zA-Z0-9]*) (perf): (.*)/},
	{name: 'refactor', regex: /([a-zA-Z0-9]*) (refactor): (.*)/},
	{name: 'style', regex: /([a-zA-Z0-9]*) (style): (.*)/},
	{name: 'test', regex: /([a-zA-Z0-9]*) (test): (.*)/}
];

// git command to show commit history with only the first line of each commit
var result = spawn('git', [
	'--no-pager',
	'log',
	'--pretty=oneline'
]);

// handle process error
result.on('error', function( err ){ throw err });

// set encoding and handle incoming data
result.stdout.setEncoding('utf8');
result.stdout.on('data', function(data) {
	// split data by line
	let lines = data.toString().match(/[^\r\n]+/g);

	console.log('| Commit | Type | Description |');
	console.log('| ------ | ---- | ----------- |');

	for (let line of lines) {
		for (let type of types) {
			if (type.regex.test(line) && line.match(type.regex)[2] != '') {
				console.log('| [' + line.match(type.regex)[1].substr(0,7) + ']' + '(https://github.com/maxime1992/git-commit-summary/commit/' + line.match(type.regex)[1] + ') | **' + line.match(type.regex)[2] + '** | ' + line.match(type.regex)[3] + '|');
			}
		}
	}
});
