#Git commit summary

Easily generate release notes based on commit history.

# Why do you need this module
A great repository is not only made by great code. Organization matter.
When you make release of your code, you need to tel people what changed since the last release and why the new version rocks ! Most of the time, you don't remember exactly what was made between the last release and the incomming one. It takes you some time to remember and some time to write it down ...

# Clear commits for a good cause
Of course, this tool is not magic (don't cry buddy, I did too when I discovered that but it's pointless). You need to follow some guidelines in order to generate the summary. [Angular's commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit) are my favourites so far so I invite you to check it out. But don't worry, this module will also work if don't want to have the exact commit message format or those types [feat|fix|docs|style|refactor|perf|test|chore] till you respect :
```
<type-of-your-choice>(<scope-of-your-choice>): <subject>
```

# Show me the awesome
Talking is cool, but how's the output ?

*The following output comes from [real-debrid-stream](https://github.com/maxime1992/real-debrid-stream) repository. It has been generated with an alpha version of this plugin.*

| Commit | Type | Description |
| ------ | ---- | ----------- |
| [c53ab08](https://github.com/maxime1992/real-debrid-stream/commit/c53ab0815a7464ff850f437e369220a660ec7665) | **chore(version)** | V1.0.0|
| [ac1809d](https://github.com/maxime1992/real-debrid-stream/commit/ac1809da278955af2f6be85637b69e98d686042e) | **style** | Reduce margin bottom|
| [8307e3a](https://github.com/maxime1992/real-debrid-stream/commit/8307e3a612377e6b96d865b816d403eb82f41e1b) | **fix** | Stream service cannot stream to Kodi|
| [d6b6d6e](https://github.com/maxime1992/real-debrid-stream/commit/d6b6d6e13dacf66c589ec619ec5053646a20a91d) | **fix** | Gulp watch throws an error because of empty src|
| [2dc5929](https://github.com/maxime1992/real-debrid-stream/commit/2dc59290b9ffc690062aff314c88aabec4decc6a) | **fix** | Use chrome storage instead of session storage|
| [fc91081](https://github.com/maxime1992/real-debrid-stream/commit/fc9108101cdae1e7f1348c80531014d927034444) | **feat(build)** | Implement type definition manager for TypeScript|
| [6fa3c0f](https://github.com/maxime1992/real-debrid-stream/commit/6fa3c0f7d95ffd1e746bc3f7c1343789de6ca5af) | **refactor** | Reduce tsAppConfig() and ts() functions to one abstract function|
| [42cba1e](https://github.com/maxime1992/real-debrid-stream/commit/42cba1e16e5b80bccbb51b51fabf526599257011) | **refactor** | Clean unused file|
| [e107d7b](https://github.com/maxime1992/real-debrid-stream/commit/e107d7b67a25576238f5684238f1019520ca5327) | **fix** | Move inline script from index.html to a javascript file|
| [b71a7ff](https://github.com/maxime1992/real-debrid-stream/commit/b71a7ffc2d8d1eb22db7e5f8568e25862be31979) | **feat** | Add notifications support|
| [ceadecd](https://github.com/maxime1992/real-debrid-stream/commit/ceadecd85a39f5de85d5e67e150c1f6cef689f80) | **feat** | Stream service, use settings service to provide real data for real-debrid account and Kodi IP|
| [cdb7de4](https://github.com/maxime1992/real-debrid-stream/commit/cdb7de4b418c9a3aba586b49d40388f7e2fdfce7) | **refactor** | Remove unused code from angular2-seed|
| [1ab2c70](https://github.com/maxime1992/real-debrid-stream/commit/1ab2c709bad7fd8287179aca8c54c35f20c0f533) | **feat** | Create settings.service|
| [b182d9d](https://github.com/maxime1992/real-debrid-stream/commit/b182d9d505322422e46b2d0086dbdf79d6b0a751) | **feat** | Create settings.component|
| [86708a8](https://github.com/maxime1992/real-debrid-stream/commit/86708a86770947ba82372f135bd82255b01a26f1) | **fix** | Copy app manifest and icon into build folder|
| [203a9c3](https://github.com/maxime1992/real-debrid-stream/commit/203a9c33ae8c871529e8e206d54b5eb79211914a) | **feat** | Create stream.service|
| [b17a2a3](https://github.com/maxime1992/real-debrid-stream/commit/b17a2a3110eebc5c16eb48e3b7dd1f10b72ec255) | **feat** | Create stream.component|
| [4e01faa](https://github.com/maxime1992/real-debrid-stream/commit/4e01faa8130575dc6836276f95769790bc595f04) | **feat** | Init repository|

# You don't like tables ?
This module will be build with templates. This way, you'll be able to implement your own output or used pre-made templates (like lists).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. When submitting a PR, make sure that the commit messages match the [Angular's commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).

## License
MIT
