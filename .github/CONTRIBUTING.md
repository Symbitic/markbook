# Contributing

Thank you for contributing to Markbook. 👍

By contributing, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

_Do not open an issue if you have a question_.

If you encounter a genuine bug or other issue that _needs_ to be addressed, submit a new issue on [GitHub issues](https://github.com/symbitic/markbook/issues/new).

1.  Fork the repo and create a new branch from `master`.

2.  Clone your forked repo:

    git clone git@github.com:<USERNAME>/markbook.git

3.  Setup your machine:

    npm install

4.  _Make changes_.

5.  Make sure your changes work by running the tests:

        npm run test
        npm run build
        ./bin/markbook build doc

    Now open `doc/book/index.html` in your web browser to make sure markbook is still working correctly.

6.  Ensure your changes conform to the coding conventions

    npm run lint

7.  Commit your changes using git, then push the changes back to your forked repo on GitHub:

    git add ...
    git commit -m "<TAG>: DESCRIPTION" -m "LONGER DESCRIPTION (optional)"
    git push origin master

8.  [Submit a pull request](https://github.com/symbitic/markbook/compare/).

Some things that will increase the chance that your pull request is accepted:

-   Write tests.
-   Follow the [Standard](https://standardjs.com/) style guide.
-   Follow the [Conventional Commit](https://www.conventionalcommits.org/) format.
