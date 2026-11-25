# fin-proto-vscode

FinProto VSCode Extension — 为金融二进制协议 DSL（PacketDSL）提供 IDE 支持的 VSCode 插件。

## 功能

- **语法高亮**：关键字、类型、属性（`@lengthOf` / `@calculatedFrom` / `@tag` / `@leftPad` / `@rightPad`）、字符串与注释。
- **代码格式化**：命令 `fin-proto:format`，或标准的 Format Document（`Shift+Alt+F`）。格式化基于 AST 重排，保留行注释；语法错误时保持原文不动。
- **实时诊断**：语法错误（ANTLR error listener）+ 语义校验：
  - 重复的 MetaData / option / packet / 字段定义
  - 未知字段类型、未知 match 目标 packet、重复 match key
  - `@lengthOf` 只能出现在 root packet 且最多一个
  - 未知 option / option 非法取值、循环 MetaData 引用
- **代码补全**：关键字、内建类型、字段属性、已定义的 MetaData 块/字段/packet 名称；`@lengthOf(...)`、`@calculatedFrom("...")` 参数位置补全当前 packet 的字段名；`options {}` 块内补全 option 名与合法取值；`match` 块内补全 packet 名。
- **代码片段**：`packet` / `rpacket` / `metadata` / `match` / `options` / `lengthof` / `checksum` / `zchar` 等模板。
- **编译**：命令 `fin-proto:compile` 调用 [fin-protoc](https://github.com/xinchentechnote/fin-protoc) CLI，将当前 DSL 编译为 Go / Java / Rust / Lua / Python / C++。

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
yarn compile     # tsc + eslint + esbuild
yarn test        # jest 单元测试
yarn watch       # 开发模式
yarn package     # 打包 .vsix（需配置 publisher）
```

ANTLR grammar 的单一来源是 `submodules/fin-protoc/grammar/PacketDsl.g4`，不要手改 `src/parser/antlr4/` 下的生成代码。

## License

MIT
