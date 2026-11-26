# fin-proto-vscode

FinProto VSCode Extension — 为金融二进制协议 DSL（PacketDSL）提供 IDE 支持的 VSCode 插件。

## 功能

- **语法高亮**：关键字、类型、属性（`@lengthOf` / `@calculatedFrom` / `@tag` / `@leftPad` / `@rightPad`）、字符串与注释。
- **代码格式化**：命令 `fin-proto:format`，或标准的 Format Document（`Shift+Alt+F`）。格式化基于 AST 重排，保留行注释；语法错误时保持原文不动。
- **实时诊断**：语法错误（ANTLR error listener）+ 语义校验：
  - 重复的 MetaData / option / packet / 字段定义
  - 未知字段类型、未知 match 目标 packet、重复 match key
  - `@lengthOf` 只能出现在 root packet、至多一个、且目标字段必须存在
  - `match` 的 key 必须是本 packet 已声明的字段
  - 未知 option / option 非法取值、循环 MetaData 引用
- **代码补全**：按语法位置过滤候选——类型声明位只出类型/MetaData/packet，MetaData 块内只出基础类型，文件顶层只出顶层关键字，注释内不弹；`@lengthOf(...)`、`@calculatedFrom("...")` 参数位置补全当前 packet 的字段名；`options {}` 块内补全 option 名与合法取值；`match` 块内补全 packet 名。
- **代码导航**：
  - 跳转定义（F12）：字段引用 → 字段声明（含 `@lengthOf`/`@calculatedFrom` 参数）、MetaData 块/成员引用 → 定义处、`match` 分派目标 → packet 定义；当前文件没有定义时回退到工作区其它 `.pdsl`/`.dsl` 文件；
  - 查找引用（Shift+F12）与同文件高亮：声明 + 所有引用点（match 分派值、属性参数、match key、声明类型）；
  - 工作区符号搜索（Ctrl+T）：跨所有 workspace 内 DSL 文件搜索 packet / MetaData / meta 成员；
  - 大纲（Outline / Ctrl+Shift+O）：packet、MetaData 块、options 及嵌套字段、match 分派项；
  - 代码折叠：所有 `{...}` 块（packet / MetaData / match / 内嵌对象）。
- **快速修复（Code Actions）**：未定义的类型引用 → 一键生成 `MetaData` 块骨架；match 值指向未定义 packet → 生成 packet 骨架；缺失尾逗号 → 在上一行末尾插入逗号。
- **悬停提示**：悬停在名称上显示类型、属性与描述摘要。
- **重命名重构**（F2）：字段（含 `@lengthOf`、`@calculatedFrom` 参数、match key 引用）、packet（含 match 分派值引用）、MetaData 块/成员（含声明类型引用）；重命名到已存在的名称会被拦截并提示。
- **区域格式化**：选中部分 DSL 后 Format Selection（Ctrl+K Ctrl+F），只重排选中的顶层块，不影响其它内容。
- **代码片段**：`packet` / `rpacket` / `metadata` / `match` / `options` / `lengthof` / `checksum` / `zchar` 等模板。
- **编译**：命令 `fin-proto:compile` 调用 [fin-protoc](https://github.com/xinchentechnote/fin-protoc) CLI，将当前 DSL 编译为 Go / Java / Rust / Lua / Python / C++；编译器报告的错误会解析后显示在问题面板，可点击跳转。

## 编译器配置

| 配置项 | 说明 | 默认值 |
| --- | --- | --- |
| `finProto.protocPath` | fin-protoc 可执行文件路径 | `fin-protoc`（从 PATH 查找） |
| `finProto.outputDir` | 编译产物输出目录 | DSL 文件同级的 `gen/` 目录 |

## 开发

```bash
yarn install

# 语法变更后从 fin-protoc 子模块重新生成 ANTLR parser
git submodule update --init
yarn gen

# 构建 / 测试
yarn compile           # tsc + eslint + esbuild
yarn test              # jest 单元测试
yarn test-integration  # 集成测试（@vscode/test-cli，首次会下载 VSCode；Linux 需 xvfb）
yarn watch             # 开发模式
yarn package           # 打包 .vsix（publisher 已配置为 xinchentechnote）
```

ANTLR grammar 的单一来源是 `submodules/fin-protoc/grammar/PacketDsl.g4`，不要手改 `src/parser/antlr4/` 下的生成代码。

## License

MIT
