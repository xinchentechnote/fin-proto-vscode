# FinProto VSCode

[![CI](https://github.com/xinchentechnote/fin-proto-vscode/actions/workflows/ci.yml/badge.svg)](https://github.com/xinchentechnote/fin-proto-vscode/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

为金融二进制协议 DSL（PacketDSL，`.pdsl` / `.dsl`）提供 IDE 支持的 VSCode 插件，配套编译器 [fin-protoc](https://github.com/xinchentechnote/fin-protoc)（生成 Go / Java / Rust / Lua / Python / C++ 代码）与协议仓库 [fin-proto](https://github.com/xinchentechnote/fin-proto)。

> 📐 架构与设计决策见 [docs/DESIGN.md](docs/DESIGN.md)

## 功能一览

| 功能 | 触发方式 | 说明 |
| --- | --- | --- |
| 语法高亮 | 自动 | 关键字 / 类型 / 属性 / 字符串 / 注释 |
| 实时诊断 | 自动（300ms 防抖） | 语法错误 + 语义校验，详见下文 |
| 代码格式化 | `Shift+Alt+F` 或命令 `fin-proto:format` | 基于 AST 全文重排；支持选中区域格式化（`Ctrl+K Ctrl+F`），只重排选中的顶层块 |
| 代码补全 | 输入自动触发 | 按语法位置过滤候选；`@lengthOf(...)` / `@calculatedFrom(...)` 参数补全字段名；`options {}` 补全 option 名与合法取值 |
| 跳转定义 | `F12` | 字段 / MetaData / packet / 属性参数目标；当前文件无定义时回退到工作区其它文件 |
| 查找引用 | `Shift+F12` | 声明 + 所有引用点；光标停留自动同文件高亮 |
| 工作区符号 | `Ctrl+T` | 跨所有 `.pdsl` / `.dsl` 文件搜索 |
| 大纲 / 折叠 | Outline 面板 / 折叠箭头 | packet、MetaData、options、match 及嵌套字段 |
| 悬停提示 | 悬停 | 类型、属性、描述摘要 |
| 重命名重构 | `F2` | 声明与引用联动更新，命名冲突自动拦截 |
| 快速修复 | `Ctrl+.` | 未定义引用生成骨架代码、缺失尾逗号自动补 |
| 编译 | 命令 `fin-proto:compile` | 调用 fin-protoc CLI，多目标语言；编译错误进问题面板 |

### 诊断规则（语义层）

- 重复的 MetaData / option / packet / 字段定义
- 未知字段类型、未知 match 目标 packet、重复 match key、match key 必须是本 packet 已声明字段
- `@lengthOf` 仅限 root packet、至多一个、目标字段必须存在
- 未知 option / option 非法取值、循环 MetaData 引用

校验语义与 fin-protoc 编译器对齐（插件可以更严，但不会放过编译器接受的东西）。设计原则见 [docs/DESIGN.md](docs/DESIGN.md#6-校验语义对齐)。

## 快速上手

### 1. 一个最小的协议定义

```packetdsl
options {
    LittleEndian = true;
}

MetaData PriceType {
    int64 value  `价格`,
    zchar[8] symbol `代码`,
}

root packet QuotePacket {
    @lengthOf(body)
    uint16 bodyLen  `payload 长度`,
    PriceType quote,
    match msgType as Body {
        1 : Logon,
        2 : Heartbeat,
    },
    @calculatedFrom("CRC32")
    uint32 checksum  `校验和`,
}
```

### 2. 安装编译器

编译命令需要 fin-protoc 可执行文件（从源码构建：`cd fin-protoc && go build -o fin-protoc`），保证在 PATH 中，或通过设置指定路径：

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| `finProto.protocPath` | fin-protoc 可执行文件路径 | `fin-protoc`（从 PATH 查找） |
| `finProto.outputDir` | 编译产物输出目录 | DSL 文件同级的 `gen/` 目录 |

### 3. 安装插件

- **从源码**：`git clone --recurse-submodules` 本仓库后，`yarn install && yarn package`，在 VSCode 中通过 "Install from VSIX" 安装 `*.vsix`；
- **从 CI 产物**：每次 push 后 GitHub Actions 会上传 `fin-proto-vscode-vsix` artifact，直接下载安装。

## 开发

```bash
git clone --recurse-submodules https://github.com/xinchentechnote/fin-proto-vscode.git
cd fin-proto-vscode
yarn install

# 语法变更后从 fin-protoc 子模块重新生成 ANTLR parser
yarn gen

# 构建 / 测试
yarn compile           # tsc + eslint + esbuild
yarn test              # jest 单元测试
yarn test-integration  # 集成测试（@vscode/test-cli，首次会下载 VSCode；Linux 需 xvfb）
yarn watch             # 开发模式（esbuild watch + tsc watch 并行）
yarn package           # 打包 .vsix（publisher: xinchentechnote）
```

ANTLR grammar 的单一来源是 `submodules/fin-protoc/grammar/PacketDsl.g4`，**不要手改** `src/parser/antlr4/` 下的生成代码。模块职责与数据流见 [docs/DESIGN.md](docs/DESIGN.md)。

## License

[MIT](LICENSE)
