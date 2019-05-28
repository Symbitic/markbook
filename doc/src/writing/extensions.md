---
bibliography: bibliography.json
---

# Markbook-Specific Extensions

Markbook implements a number of extensions to CommonMark, in order to make writing easier and to add support for extra features.

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
| `bibliography` | Bibliography (see below) |
| `style` | Citation style for bibliographies |

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

Besides `bibliography`, two other fields are supported: `style` and `locale`.

`style` can be set to any of the following:
* `apa` - APA citations.
* `chicago` - Chicago author-date citations.
* `mla` - MLA citations.
* `vancouver` - Vancouver citations.

Currently, `en-us` is the only supported locale.

By default, if `style` and `locale` are not given, `chicago` and `en-us` will be used.

### Formats

Currently the following bibliographic formats are supported:
* [BibJSON](http://okfnlabs.org/bibjson/)

BibTeX support is planned next.

## External Files

You can include other files by using `@include filename.md`. Once loaded, they are parsed with Remark.

Recursive includes will result in an error, but one external file can include another one. That is, if `1.md` includes `2.md`, then `2.md` can still include `3.md`.

## PlantUML Diagrams

PlantUML diagrams can be rendered.

    ```plantuml
    Bob -> Alice : hello
    ```

results in:

```plantuml
Bob -> Alice : hello
```
