# Markdown Multilevel Numbering (mmn)

[English](./README.md) | [中文](./README_CN.md)

A CLI tool for adding multilevel numbering to markdown documents. Supports mainbody/appendix numbering modes with flexible control via commands. Built on top of [Markdown Multilevel Numbering](https://github.com/tyxiang/markdown-multilevel-numbering-core) library.

## 1. Features

- Mainbody mode numbering for headings and paragraphs: `1.`, `1.1.`, `1.1.1.` ...
- Appendix mode numbering for headings and paragraphs: `A.`, `A.1.`, `A.1.1.` ...
- Appendix H2 heading format: `Appendix A Heading`.
- Flexible numbering control via commands.
- Level 1 headings never participate in numbering.
- Only processes content within the first level 1 heading's scope; subsequent level 1 headings and their content are ignored.
- AST-based parsing protects code blocks, lists, tables, math formulas, etc. from being modified.

## 2. Control Commands

Insert control commands in markdown using HTML comments.

Comment format: `<!-- mmn: command [command...] -->`

| command    | Description                                               |
| ---------- | --------------------------------------------------------- |
| `mainbody` | Numbering mode: starts mainbody mode, default depth `h` |
| `appendix` | Numbering mode: starts appendix mode, default depth `h` |
| `h`        | Depth: number all heading levels                        |
| `h+p`      | Depth: number all heading levels and paragraphs        |
| `h2`       | Depth: number level 2 headings                          |
| `h3`       | Depth: number levels 2-3 headings                      |
| `h4`       | Depth: number levels 2-4 headings                      |
| `h5`       | Depth: number levels 2-5 headings                      |
| `h6`       | depth: number levels 2-6 headings                      |
| `end`      | End numbering                                           |

After program starts, defaults to `mainbody` mode.

## 3. Numbering Logic Examples

See `doc/numbering-logic-demo.md` for details.

## 4. Installation

Download the binary for your platform from [Releases](https://github.com/your-repo/releases). No Node.js runtime required.

## 5. Usage

```bash
mmn -h | --help
mmn -v | --version
mmn help
mmn update <text>|-i <file> [-o <file>]       # Add numbering, outputs to stdout if no -o
mmn remove <text>|-i <file> [-o <file>]       # Remove numbering, outputs to stdout if no -o
```

## 6. Examples

```bash
# Add numbering - pass text directly, output to stdout
mmn update "# Title\n\n<!-- mmn: mainbody h -->\n\n## Section"
# Add numbering - pass text directly, output to file
mmn update "# Title\n\n<!-- mmn: mainbody h -->\n\n## Section" -o output.md
# Add numbering - read from file, output to stdout
mmn update -i input.md
# Add numbering - read from file, output to file
mmn update -i input.md -o output.md

# Remove numbering - pass text directly, output to stdout
mmn remove "# Title\n\n<!-- mmn: mainbody h -->\n\n## 1. Section"
# Remove numbering - pass text directly, output to file
mmn remove "# Title\n\n<!-- mmn: mainbody h -->\n\n## 1. Section" -o output.md
# Remove numbering - read from file, output to stdout
mmn remove -i input.md
# Remove numbering - read from file, output to file
mmn remove -i input.md -o output.md
```