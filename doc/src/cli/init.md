# `init`

The init command generates a new book:

    markbook init [dir]

## Directory

By default, markbook will use in the current directory. To have markbook use a different directory, simply give it as a commandline argument.

    markbook build path/to/book

## Options

| option | description | required? |
| ------ | ----------- | --------- |
| `--author` | Author's name | Yes |
| `--description` | Book description | No |
| `--title` | Book title | Yes |

If any of these three options are not given on the command-line, Markbook will prompt for them.

Non-required options can be empty.

