# SUMMARY.md

The summary file is used by markbook to know what chapters to include, in what order they should appear, what their hierarchy is and where the source files are. Without this file, there is no book.

Even though `SUMMARY.md` is a markdown file, the formatting is very strict to allow for easy parsing. Let's see how you should format your `SUMMARY.md` file.

## Format

1. **_Title_** It's common practice to begin with a title, generally `# Summary`. It is not mandatory; the parser just ignores it.

2. **_Prefix Chapter_** Before the main numbered chapters you can add a couple of elements that will not be numbered. This is useful for forewords, introductions, etc. There are however some constraints. You can not nest prefix chapters, they should all be on the root level. And you can not add prefix chapters once you have added numbered chapters.

    ```markdown
    [Title of prefix element](relative/path/to/markdown.md)
    ```

3. **_Numbered Chapter_** Numbered chapters are the main content of the book, they will be numbered and can be nested, resulting in a nice hierarchy (chapters, sub-chapters, etc.)

    ```markdown
    * [Title of the Chapter](relative/path/to/markdown.md)
    ```

    You can either use `-` or `*` to indicate a numbered chapter.

4. **_Suffix Chapter_** After the numbered chapters you can add a couple of non-numbered chapters. They are the same as prefix chapters but come after the numbered chapters instead of before.

All other elements are unsupported and will be ignored (at best) or result in an error.

## Example

Here is an example of the SUMMARY.md used for Markbook:

```markdown
[Markbook](README.md)

* [Command-Line Interface](cli/README.md)
    + [build](cli/build.md)
```
