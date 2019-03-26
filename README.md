# [Markbook](https://symbitic.github.io/markbook/)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/Symbitic/markbook.svg?style=flat-square)](https://travis-ci.org/Symbitic/markbook)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![stars](https://img.shields.io/github/stars/symbitic/markbook.svg?style=flat-square)](https://github.com/Symbitic/markbook)
> Write books in CommonMark.

Markbook allows full books to be written in CommonMark. Similar in concept to [GitBook][1] or [mdBook][2], it has a vastly different philosophy.

Read the user guide on <https://symbitic.github.io/markbook/>

**Markbook is still a work-in-progress. Expect major changes.**

If you like this project, please consider doing one of the following:
* Starring me on GitHub
* [Contributing](#contributing)
* [Buying me a soda](https://buymeacoff.ee/qh0rXkiCd) (can't have coffee -- my kidney's would explode)

[![BuyMeACoffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/qh0rXkiCd)

## Why Markbook?

You might already be thinking "*Why Markbook? I already have Gitbook/mdBook"

I actually started writing Markbook for two reasons:
1. As far as I am concerned, GitBook is a FOSS traitor who has abandoned their open-source tool and switched entirely to a web app that uses a proprietary server.
2. mdBook is written in Rust and uses a markdown processor with absolutely no support for extensions.

And neither of those is really geared toward people who want to write full fledged science, mathematics, or academic books. For simple documentation or writing novels, they work fine. But they don't add any sort of extensions that would help people who want to take advantage of the easy-to-use syntax of CommonMark to write extensively. So I decided to create my own tool that is.

At the core of Markbook is [Remark](https://remark.js.org/) - a next-generation markdown processor. I chose Remark because it has an entire ecosystem of plugins, a well defined AST, supports NLP and HTML as well as Markdown, and because it is actively maintained.

## Status

Right now Markbook is perfectly capable of building ebooks from CommonMark sources.

Working:
* Build/Serve/Init/Clean commands.
* Auto-reload on file changes.
* Package markbook as a binary file for easier system-wide install.
* Generate HTML from CommonMark files and a Handlebars theme.
* Table of Contents.
* Mobile-friendly interface.

Planned:
* Ebook search.
* Finalize HTML theme.
* User-supplied themes.
* Better rendering efficiency.
* Consider using TypeScript (@babel/preset-typescript).
* Better/More tests.
* Release on NPM.
* Expose an API for developer use.
* Support other templating engines (pug, nunjucks).
* Find typeface for ebooks (Amazon Kindle and Google Play Books each has custom typeface specific for reading ebooks).
* Mermaid, graphviz, or PlantUML diagrams.

Long-term goals:
* Add Pandoc/rmarkdown extensions.
* Generate ePub (archiver, quick-epub, epub-zipper, or epub-maker).
* Generate PDF (puppeteer, pdfmake, or pdf-lib).
* Add remark-lint command to allow linting/spell-checking.
* Support deploying to gh-pages.

## Getting Started

Markbook provides binary files (compiled using <https://github.com/zeit/pkg>) for Windows, macOS, and Linux.
Download the latest release at <https://github.com/Symbitic/markbook/releases/latest>.

Alternately, Markbook can be built manually:

    git clone https://github.com/Symbitic/markbook.git
    cd markbook
    npm install
    npm run build
    npm run watch

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Licensed under the [MIT][3] license. See [LICENSE.md](LICENSE.md) for more details.

Copyright (c) 2018-2019 [Markbook Contributors](https://github.com/Symbitic/markbook/graphs/contributors)

[1]: https://www.gitbook.com/
[2]: https://rust-lang-nursery.github.io/mdBook/
[3]: https://opensource.org/licenses/MIT
