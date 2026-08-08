# METC 网站交接总览

本文件是下一位技术负责人接手仓库的起点。代码、文档、原始资源和可再生资源均在当前仓库中；任何非 README 的说明文档均应继续放在 `docs/`。

## 当前交付状态

| 模块 | 状态 | 说明 |
| --- | --- | --- |
| 首页 | 已实现 | 中英切换、品牌首屏、活动/课程/反馈入口和响应式布局 |
| 课程设计 `/teaching` | 已实现 | 课程书架、大纲 HTML 预览、课件图片浏览与全屏 |
| 活动成果 `/activities` | 已实现 | 自动生成学校相册、照片墙和灯箱 |
| 学生反馈 `/voices` | 技术已实现，内容待换 | 目前为 6 张重复使用的演示 SVG，不是实际学生反馈 |
| 微信群二维码 | 预留完成，未启用 | 需添加 PNG 并调整一个开关 |
| CMS/后台/数据库 | 未实现 | 当前维护方式为版本化文件与本地脚本 |
| 正式线上部署 | 未完成 | 站点可静态导出，平台和域名配置待确认 |

## 目录职责

```text
app/                            路由、全局与页面级 CSS
components/                     页面可复用组件
content/                        人工维护的双语内容、反馈资料
resources/METC/                 原始课件/照片和展示生成物
src/data/resources/generated/   脚本生成的课程、相册前端索引
tools/resource_pipeline/        资源转换和索引生成脚本
public/                         公共图片；resources 是指向 ../resources 的符号链接
docs/                            全部维护、运维和交接文档
```

`source/` 中的原始教学文件必须保留，不允许由脚本覆盖。`demonstration/`、每个 `course.json`/`album.json` 与 `src/data/resources/generated/` 都是可再生文件，但会被版本控制，以保证静态网站在无本地转换依赖时仍能构建。

## 交接后先做什么

1. 阅读根目录 `README.md` 和本文件，再按需阅读 `docs/RESOURCE_OPERATIONS.md`、`docs/STUDENT_FEEDBACK_OPERATIONS.md`、`docs/DEPLOYMENT.md`。
2. 执行 `pnpm install && pnpm typecheck && pnpm build`，确认接手环境可构建。
3. 确认 LibreOffice、Poppler 和 macOS `sips` 是否可用；它们只在更新资源预览时必需。
4. 与内容负责人确认真实学生反馈的肖像/隐私授权、双语文案、微信群二维码与部署平台。
5. 每次新增资源后，执行资源处理流程、检查网页，再提交原始文件与生成文件。

## 清理规则

以下都是本地机器或构建工具产物，不应提交：`.DS_Store`、`.next/`、`out/`、`output/`、`.playwright-cli/`、`node_modules/`、`*.tsbuildinfo`、日志文件。忽略规则已写入 `.gitignore`。

不要删除：`resources/METC/**/source/` 中的原始 Word/PPT/PDF，或活动照片、课程配置、相册配置和前端生成索引。它们是网站可交付内容的一部分。
