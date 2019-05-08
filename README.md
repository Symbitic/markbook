# [Markbook](https://symbitic.github.io/markbook/)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/Symbitic/markbook.svg?style=flat-square)](https://travis-ci.org/Symbitic/markbook)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![stars](https://img.shields.io/github/stars/symbitic/markbook.svg?style=flat-square)](https://github.com/Symbitic/markbook)
> Write books in CommonMark.

Markbook allows full books to be written in CommonMark.

Read the user guide on <https://symbitic.github.io/markbook/>.

If you like this project, please consider doing one of the following:
* Starring me on GitHub
* [Contributing](#contributing)
* [Buying me a soda](https://buymeacoff.ee/qh0rXkiCd) (can't have coffee -- my kidney's would explode)

[![BuyMeACoffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/qh0rXkiCd)

## Getting Started

Markbook provides binary files for Windows, macOS, and Linux.
Download the latest release at <https://github.com/Symbitic/markbook/releases/latest>.

Alternately, Markbook can be built manually:

    git clone https://github.com/Symbitic/markbook.git
    cd markbook
    npm install
    npm run build
    npm run watch

## Features

* Build/Serve/Init/Clean commands.
* Auto-reload on file changes.
* Package markbook as a binary file for easier system-wide install.
* Generate HTML from CommonMark files and a Handlebars theme.
* Table of Contents.
* Mobile-friendly interface.
* Generate PDF (requires Chrome or Chromium installed)
* Generate EPUB (very basic for the moment).

### Planned

* [ ] User-supplied themes.
* [ ] Better rendering efficiency.
* [ ] Consider using TypeScript (@babel/preset-typescript).
* [ ] Better/More tests.
* [ ] Release on NPM.
* [ ] Expose an API for developer use.
* [ ] Support other templating engines (pug, nunjucks).
* [ ] Find typeface for ebooks (Amazon Kindle and Google Play Books each has custom typeface specific for reading ebooks).
* [ ] Mermaid, graphviz, or PlantUML diagrams.
* [ ] Add Pandoc/rmarkdown extensions.
* [ ] Add remark-lint command to allow linting/spell-checking.
* [ ] Support deploying to gh-pages.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Licensed under the [MIT](https://spdx.org/licenses/MIT) license. See [LICENSE.md](LICENSE.md) for more details.

Copyright &copy; 2018-2019 [Markbook Contributors](https://github.com/Symbitic/markbook/graphs/contributors)
