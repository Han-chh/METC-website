# METC Website

METC（Maths and Engineering Teaching Club）公开网站。它展示社团的教学资源、课堂活动和学生反馈；项目是静态导出的 Next.js 前端，不包含账号系统、CMS、数据库或独立后端服务。

## 当前阶段

网站已完成可交接的前端与资源展示基础：首页、课程设计、活动成果展览、学生反馈页均已实现，课程文档和课件可通过本地资源处理流程生成网页预览。项目当前处于**内容补全、文案优化、二维码配置与实际部署前**的阶段。

尚待完成的事项：

- 以已获授权的真实学生反馈照片替换演示 SVG；完成双语文案审核与润色。
- 上传并启用 METC 微信群二维码。
- 确定静态站点托管平台、配置发布路径 `/METC-website`，并完成线上验收。
- 持续补充真实活动照片、课程材料与元数据。

## 技术栈

- Next.js 16（App Router，`output: "export"` 静态导出）
- React 19、TypeScript 5、pnpm
- 原生 CSS；不使用 Tailwind、CSS-in-JS 或组件库
- Python 3 资源处理脚本；DOCX/PPTX 转换依赖 LibreOffice，幻灯片导出依赖 Poppler，HEIC 预览转换使用 macOS `sips`

## 路由

| 页面 | 开发地址 | 说明 |
| --- | --- | --- |
| 首页 | `/` | 品牌介绍、活动入口与社团内容 |
| 课程设计 | `/teaching` | 课程大纲与图片化课件预览 |
| 活动成果展览 | `/activities` | 学校相册、瀑布流与灯箱 |
| 听 ta 们说 | `/voices` | 学生反馈展示；当前使用演示素材 |

生产环境以 `next.config.ts` 的 `basePath: "/METC-website"` 为准，例如 `/METC-website/teaching`。如部署到域名根目录，必须同步调整该配置和资源 URL 生成逻辑，详见部署文档。

## 本地运行

```bash
pnpm install
pnpm dev
```

常用检查：

```bash
pnpm typecheck
pnpm build
```

资源更新后，先执行：

```bash
python3 tools/resource_pipeline/convert_docx.py
python3 tools/resource_pipeline/convert_pptx.py
python3 tools/resource_pipeline/generate_metadata.py
```

## 项目结构

```text
app/                    页面路由与页面级样式
components/             页面与交互组件
content/                人工维护的双语文案和学生反馈数据
resources/METC/         原始教学资料、活动照片及可再生展示产物
src/data/resources/     由资源脚本生成的前端索引
tools/resource_pipeline/ 资源转换与元数据生成脚本
public/                 公开静态资产；public/resources 链接至 ../resources
docs/                   全部项目、交接和运维文档
```

## 文档导航

所有非本文件的文档均位于 `docs/`：

| 文档 | 用途 |
| --- | --- |
| [交接总览](docs/HANDOVER.md) | 当前交付状态、目录职责、交接检查清单 |
| [项目背景](docs/PROJECT_CONTEXT.md) | METC 定位、网站目标与范围 |
| [资源系统架构](docs/RESOURCE_SYSTEM_ARCHITECTURE.md) | 课程与相册如何进入前端 |
| [资源上传与封面](docs/RESOURCE_OPERATIONS.md) | Word、PPT、PDF、照片上传和封面选择规范 |
| [资源处理流程](docs/RESOURCE_PIPELINE.md) | 脚本、依赖、生成产物和故障排查 |
| [学生反馈照片](docs/STUDENT_FEEDBACK_OPERATIONS.md) | 真实反馈照片的隐私审核、上传与前端适配 |
| [二维码运维](docs/CONTACT_QR_CODE_OPERATIONS.md) | 微信群二维码替换和启用步骤 |
| [部署指南](docs/DEPLOYMENT.md) | 静态导出、发布前检查与待定事项 |
| [资源系统实施记录](docs/RESOURCE_SYSTEM_IMPLEMENTATION.md) | 已完成资源系统的实现边界与验证记录 |
| [设计语言](docs/DESIGN_LANGUAGE.md) | 品牌视觉原则 |
| [首页愿景](docs/HOMEPAGE_VISION.md) | 首页叙事与首屏约束 |
| [前端迁移计划](docs/FRONTEND_MIGRATION_PLAN.md) | 历史规划及已完成/待完成范围 |
