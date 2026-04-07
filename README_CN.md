# Markdown Multilevel Numbering (mmn)

[English](./README.md) | [中文](./README_CN.md)

这是一个给 markdown 文档添加多级编号的工具，支持正文/附录两种编号模式，可通过指令灵活控制编号模式、深度。基于 [Markdown Multilevel Numbering](https://github.com/tyxiang/markdown-multilevel-numbering-core) 库开发。

## 1. 功能特性

- 正文模式标题和段落的编号：`1.`, `1.1.`, `1.1.1.` ...
- 附录模式标题和段落的编号：`A.`, `A.1.`, `A.1.1.` ...
- 附录的 H2 标题格式：`附录 A 标题`。
- 通过控制指令灵活改变编号行为。
- 一级标题永远不会参与编号。
- 只处理第一个一级标题逻辑范围内的内容，后续一级标题及其内容将被忽略。
- 基于 AST 的可靠解析，保护代码块、列表、表格、数学公式等内容不被误改。

## 2. 控制指令

在 markdown 文档中用 HTML 注释方式插入控制指令来控制编号行为。

注释格式：`<!-- mmn: command [command...] -->`

| command    | 功能描述                                               |
| ---------- | ------------------------------------------------------ |
| `mainbody` | 编号模式指令，以默认值开始正文模式编号，深度默认为 `h` |
| `appendix` | 编号模式指令，以默认值开始附录模式编号，深度默认为 `h` |
| `h`        | 编号深度指令，给所有级别标题编号                       |
| `h+p`      | 编号深度指令，给所有级别标题、段落编号                 |
| `h2`       | 编号深度指令，给 2 级标题编号                          |
| `h3`       | 编号深度指令，给 2~3 级标题编号                        |
| `h4`       | 编号深度指令，给 2~4 级标题编号                        |
| `h5`       | 编号深度指令，给 2~5 级标题编号                        |
| `h6`       | 编号深度指令，给 2~6 级标题编号                        |
| `end`      | 结束编号                                               |

程序启动后，默认以 `mainbody` 模式开始编号。

## 3. 编码逻辑示例

详见 `doc/numbering-logic-demo.md`

## 4. 安装

从 [Releases](https://github.com/your-repo/releases) 下载对应平台的二进制文件，无需安装 Node.js 运行时。

## 5. 命令格式

```bash
mmn -h | --help
mmn -v | --version
mmn help
mmn update <text>|-i <file> [-o <file>]       # 更新多级编号，无 `-o <file>` 时输出到 stdout
mmn remove <text>|-i <file> [-o <file>]       # 去除多级编号，无 `-o <file>` 时输出到 stdout
```

## 6. 命令示例

```bash
# 添加编号 - 直接传入文本，输出到默认的 stdout
mmn update "# 标题\n\n<!-- mmn: mainbody h -->\n\n## 第一节" 
# 添加编号 - 直接传入文本，输出到文件
mmn update "# 标题\n\n<!-- mmn: mainbody h -->\n\n## 第一节" -o output.md
# 添加编号 - 从文件读取，输出到默认的 stdout
mmn update -i input.md
# 添加编号 - 从文件读取，输出到文件
mmn update -i input.md -o output.md

# 去除编号 - 直接传入文本，输出到默认的 stdout
mmn remove "# 标题\n\n<!-- mmn: mainbody h -->\n\n## 1. 第一节"
# 去除编号 - 直接传入文本，输出到文件
mmn remove "# 标题\n\n<!-- mmn: mainbody h -->\n\n## 1. 第一节" -o output.md
# 去除编号 - 从文件读取，输出到默认的 stdout
mmn remove -i input.md
# 去除编号 - 从文件读取，输出到文件
mmn remove -i input.md -o output.md
```

