// "npm start" to launch the generation
import readline from 'readline';

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

let rl = readline.createInterface({
  input: require('fs').createReadStream('./git-log.txt')
});

console.log('| Commit | Type | Description |');
console.log('| ------ | ---- | ----------- |');

rl.on('line', function (line) {
	for (let type of types) {
		if (type.regex.test(line) && line.match(type.regex)[2] != '') {
			console.log('| [' + line.match(type.regex)[1].substr(0,7) + ']' + '(https://github.com/maxime1992/git-commit-summary/commit/' + line.match(type.regex)[1] + ') | **' + line.match(type.regex)[2] + '** | ' + line.match(type.regex)[3] + '|');
		}
	}
});
