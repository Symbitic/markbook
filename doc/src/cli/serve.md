# `serve`

The serve command renders your book and then opens a HTTP server to preview it.

    markbook serve [dir]

We will shortly be adding live-reload capabilities, that autoreloads the page when a change to one of the source files is detected.

## Directory

By default, markbook will use the current directory. To use a different one, simply specify it on the command-line.

    markbook serve path/to/book

## Options

| option | description | default |
| ------ | ----------- | ------- |
| `--open` | Open in the default web browser | `false` |
| `--port` | HTTP Port | `8080` |
| `--hostname` | HTTP Hostname | `localhost` |
