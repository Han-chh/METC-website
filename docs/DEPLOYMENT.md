# 静态部署指南

本项目使用 Next.js 静态导出。`pnpm build` 生成 `out/`，该目录是部署产物，已被 Git 忽略，不能手动维护或提交。

## 当前部署状态

尚未确定正式托管平台、域名、发布分支与 CI/CD 凭据，因此本仓库当前**没有实际生产部署**。后续负责人应先获得这些决策与授权，再配置平台。

当前 `next.config.ts` 设置 `basePath: "/METC-website"`。目标站点应服务在子路径 `/METC-website/`，例如：

```text
https://<domain>/METC-website/
https://<domain>/METC-website/teaching/
https://<domain>/METC-website/activities/
https://<domain>/METC-website/voices/
```

若实际需要部署到域名根路径，必须先改动 `next.config.ts`、资源 URL 生成规则和反馈图片路径，并完成全站回归，不能只修改托管平台配置。

## 发布前流程

1. 确认真实内容已通过授权、双语文案审核、微信群二维码配置及资源生成检查。
2. 安装锁定依赖：`pnpm install --frozen-lockfile`。
3. 执行 `pnpm typecheck` 与 `pnpm build`。
4. 通过本地静态服务器预览 `out/`，确认上述四个路由、图片、课件 PNG、相册、反馈图和二维码路径都包含 `/METC-website` 前缀。
5. 将 `out/` 内容发布到目标平台对应的 `/METC-website/` 路径；为静态 HTML 设置合适的 404/目录索引策略。
6. 在线检查桌面和手机、中文和英文、键盘操作、相册灯箱、课件全屏、资源链接及 HTTPS。
7. 记录部署平台、项目地址、发布命令、域名/DNS 所有者、回滚步骤和负责人到本文件，避免将密钥写入 Git。

## 需要由项目方确认的部署决策

- 托管平台（GitHub Pages、Cloudflare Pages、Netlify、Vercel 或学校服务器）及其账号所有者。
- 域名、DNS、HTTPS 证书和实际子路径。
- 发布分支、审核者、回滚窗口与备份方式。
- 公开学生照片与课程资料的保存期限、下线与撤回流程。

部署凭据、API 密钥、二维码原始来源和未公开学生素材不得提交到仓库。
