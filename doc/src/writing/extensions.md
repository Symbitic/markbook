# Markbook-Specific Extensions

Markbook implements a number of extensions to CommonMark. These are intended to make the writing process more pleasant.

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
