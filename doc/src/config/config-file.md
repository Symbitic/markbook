# Markbook Config File

The root of every Markbook project.

Every book must contain a file named `markbook.yml` or `markbook.toml` in the root. 

## Fields

`title`
* Type: String
* Required: Yes
* Description: Book title.

`description`
* Type: String
* Required: No
* Description: Book description

`authors`
* Type: Array of Strings
* Required: Yes
* Description: List of book author's. Must include at least one author.

## Planned

`version`
* Type: String
* Required: No
* Description: Book revision. Used to identify different published versions.

`markbook`
* Type: Number
* Required: Yes
* Description: Config file version. Currently only `1`. Used to identify which version of the config file format to used. Used to ensure forward compatibility.

