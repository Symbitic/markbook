# `build`

The build command is used to render your book:

    markbook build [dir]

Markbook begins by parsing `SUMMARY.md` to understand the book's layout. It then reads and renders any files listed there.

The rendered output will maintain the same directory structure as the source for convenience. Large books will therefore remain structured when rendered.

## Directory

By default, markbook will use the current directory. To use a different one, simply specify it on the command-line.

    markbook build path/to/book

**Note:** _Make sure to run the build command in the root directory and not in the source directory_

## Options

| option | description |
| ------ | ----------- |
| `--open` | Open in the default web browser |
