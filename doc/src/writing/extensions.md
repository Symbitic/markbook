---
bibliography: bibliography.json
---

# Markbook-Specific Extensions

Markbook implements a number of extensions to CommonMark. These are intended to make the writing process more pleasant.

## YAML/TOML

Custom metadata can be specified by placing YAML/TOML metadata at the top of a document.

YAML:
```markdown
---
title: Book
---

# Chapter
```

In this example, the title of the book will now be set to `Book` instead of `Chapter`.

Supported metadata fields include:

| Title | Description |
| ----- | ----------- |
| `title` | Chapter title |
| `bibliography` | Bibliography (see [below](#bibliography)) |

## Superscript/Subscript

Markbook supports superscript and subscript syntax.

```markdown
H~2~O
```

renders as: H~2~O

```markdown
21^st^ Century
```

renders as: 21^st^ Century

## Definition Lists

Markbook supports definition lists, similar to the ones used by [pandoc](https://pandoc.org/MANUAL.html#definition-lists).

```markdown
Term 1

: Definition 1
```

renders as:

Term 1

: Definition 1

## Footnotes

[Footnotes](https://pandoc.org/MANUAL.html#footnotes) are another feature whose syntax is borrowed from pandoc.

```markdown
Here is a footnote reference.[^1]

[^1]: Here is the footnote.
```

renders as:

Here is a footnote reference.[^1]

[^1]: Here is the footnote.

## Bibliography

Support for bibliographies is still limited. *BibJSON is the only supported format, Books are the only supported type, and Chicago style is the only supported citation.*

To include a list of references at the end of a document, just set the `bibliography` metadata field:

```markdown
---
bibliography: bibliography.json
---
```

If bibliography.json is like this:
```json
{
  "singh2016": {
    "title": "Vulkan Essentials",
    "author": [
      {
        "name": "Parminder Singh"
      }
    ],
    "type": "book",
    "year": "2016",
    "publisher": "Packt Publishing",
    "link": [
      {
        "url": "https://www.packtpub.com/application-development/vulkan-essentials"
      }
    ]
  }
}
```

Then `Vulkan has better performance than OpenGL (@singh2016).` will be rendered as:

Vulkan has better performance than OpenGL (@singh2016).

An entry for "Vulkan Essentials" will then be included in the "References" section at the end.

### Formats

Currently the following bibliographic formats are supported:
* [BibJSON](http://okfnlabs.org/bibjson/)

BibTex support is planned next.

### Styles

Currently only Chicago-style citations are supported (and only books at that).

Support for more citation styles will be added later.
