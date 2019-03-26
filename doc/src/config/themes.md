# Markbook Themes

Markbook includes support for HTML/JS/CSS themes, using [Handlebars](https://handlebarsjs.com/) as a template.

*At this time, Markbook does not support user-chosen themes. We are working on it.*

## Files

Every theme is expected to contain a file named `index.hbs` in the root directory.

Besides that, any assets (CSS, JS, favicons) in the theme directory will be copied to the destination.

## Configuration

The following variables are defined for every theme:

|     |     |
| --- | --- |
| `title` | Title of the book |
| `description` | Book description |
| `root` | Root directory. Used to calculate e.g. the path to `/markbook.css` if the filename is `/cli/init.html` |
| `book_title` | Chapter title |
| `toc.prefix` | Prefix links (each contains `url` and `title`) |
| `toc.chapters` | Chapters (each contains `url` and `title`) |
| `toc.suffix` | Suffix links (each contains `url` and `title`) |
| `content` | HTML content |

Some names may change before the next release.
