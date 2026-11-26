# Change Log

All notable changes to the "fin-proto-vscode" extension will be documented in this file.

## [0.1.0] - 2026-11-25

### Added

- 诊断新增：`@lengthOf` 目标字段存在性、`match` key 必须是本 packet 已声明字段。
- `fin-proto:compile` 的编译器错误输出解析进问题面板（独立 `fin-proto-compile` 诊断集合，编辑文件即清除），可点击跳转。
- 扩展元数据：publisher、图标、关键词与分类；CI 上传 vsix artifact；新增集成测试（`@vscode/test-cli`，覆盖诊断/补全/定义/重命名/格式化/工作区符号）。
- 跨文件支持：工作区符号搜索（Ctrl+T，跨所有 `.pdsl`/`.dsl` 文件搜索 packet/MetaData/meta 成员）、跳转定义的工作区回退、未打开文件的后台索引。
- 重命名重构（F2）：字段（含 `@lengthOf`/`@calculatedFrom` 参数与 match key 引用）、packet（含 match 分派值引用）、MetaData 块/成员（含声明类型引用）。
- 区域格式化（Format Selection）：按顶层块（packet/MetaData/options）局部重排，不影响选区外内容。
- 代码导航：跳转定义（字段 / MetaData 块与成员 / packet / `@lengthOf`、`@calculatedFrom` 目标）、文档大纲（Outline）、代码折叠（FoldingRange）。
- 悬停提示：名称的类型、属性与描述摘要。
- 代码补全：关键字、内建类型、字段属性、MetaData 块/字段、packet 名；`@lengthOf`/`@calculatedFrom` 参数补全字段名；`options` 块补全 option 名与取值；`match` 块补全 packet 名。
- 代码片段（snippets）：packet / root packet / MetaData / match / options / lengthOf / checksum / zchar 模板。
- `fin-proto:compile` 命令接通 fin-protoc CLI，支持多目标语言编译，新增 `finProto.protocPath`、`finProto.outputDir` 配置项。
- 注册标准 `DocumentFormattingEditProvider`，支持 Shift+Alt+F。
- 语义校验新增：`@lengthOf` 仅限 root packet 且唯一、循环 MetaData 引用检测、`@tag` / `@leftPad` / `@rightPad` 属性支持。
- 与 fin-protoc 最新 grammar 重新同步（新增 `tagAttribute`、`refMetaDataDeclaration`）。

### Fixed

- 语法错误诊断区间覆盖整个非法 token（原先只高亮 1 个字符）。
- match 字段的 "Duplicate match key" / "Unknown match value" 不再产生重复诊断。
- 前缀形式的 `@lengthOf(...)` / `@calculatedFrom(...)` 属性此前因 instanceof 误用从未进入模型，现改用子规则访问器收集。
- `DataType myDate` 这类重命名 meta 引用按声明类型（而非字段名）解析，不再误报 Unknown field type。
- MetaData 块名作为复合类型参与校验与补全。
- 诊断增加 300ms 防抖；关闭文档时清理诊断与缓存。
- 移除激活时的 "hello fin proto" 测试弹窗；移除 formatter 对 vscode API 的无用依赖。

## [Unreleased]

- Initial release
