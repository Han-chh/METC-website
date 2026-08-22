# 图片优化指南（jpg → WebP）

本文记录 METC 网站相册图片的 WebP 优化方案、R2 上传与部署流程。

## 背景：为什么不直接套用参考文档

用户希望参照一份资源优化参考文档（Floatem 项目）对网站图片做 jpg→webp 优化。
但该文档来自另一个 **Vite** 项目，其 `resources/raw` → `resources/optimized` 分离、
`OptimizedImage` 组件、Vite 内容哈希、route 级 code splitting 在本项目（METC，Next.js 16
静态导出）**均不适用**：

- 本项目 `next.config.ts` 设 `images: { unoptimized: true }`，图片由 `withResourceBaseUrl()`
  从 **Cloudflare R2 直出原图**，没有 `OptimizedImage`、没有 Vite 构建哈希。
- 本项目图片由 `tools/resource_pipeline/generate_metadata.py` 扫描资源目录生成
  `src/data/resources/generated/albums.json`，网页据此渲染。

因此本方案**改造 METC 自己的管线**做等价的 WebP 优化，而不是照搬参考脚本。

## 方案

改动 `tools/resource_pipeline/generate_metadata.py`：

- 新增 `to_webp(original, album_root)`：对 jpg/png 原图在相册 `demonstration/` 目录生成
  一份 `<hash>.webp`（Pillow `quality=80`），**原图不动**。
- 新增 `WEBP_PILOT_ALBUMS` 作用域：
  - 非空集合 = 只这些相册导出 WebP（其余相册保持 jpg，线上永不被破坏）；
  - 空集 `set()` = 全部相册导出 WebP。
- `build_albums()` 中 `pilot=True` 的相册，raster 照片 `src` 指向 webp；其余相册保持 jpg。
- HEIC 原图始终走 macOS `sips` 转 jpg，**不转 webp**（本优化目标是「jpg 转 webp」）。

> 注：参考文档里 `webp quality 80` 的设定被直接沿用到了 `to_webp()`。

## 重跑管线（本地）

重跑需要 **Pillow**（已装在 venv：`/Users/1012582291qq.com/.workbuddy/binaries/python/envs/default/bin/python`）。
脚本读取 `resources/METC`，但 sparse clone 不含资源目录——完整资源在 `~/Desktop/resources`，
需临时软链，跑完即删（资源按 R2 架构不进 git）：

```bash
cd METC-website-clean
ln -sfn ~/Desktop/resources ./resources
/workbuddy/binaries/python/envs/default/bin/python tools/resource_pipeline/generate_metadata.py
rm -f resources   # 跑完删除软链，绝不提交
```

## R2 上传（必须做）

网站运行时从 R2 拉图。一旦把 `src` 指向 webp，就必须先把对应 webp 传上 R2，否则相册裂图。

- 本地文件：`~/Desktop/resources/METC/活动成果展览/<学校>/demonstration/<hash>.webp`
- R2 对象键（路径照抄，含中文目录）：`resources/METC/活动成果展览/<学校>/demonstration/<hash>.webp`
- **Content-Type 必须设为 `image/webp`**（控制台上传时手动选，否则浏览器当附件下载）
- 上传方式：Cloudflare 控制台 → R2 → 对应 bucket → 进上面文件夹 → 上传（可批量选中并设 Content-Type）

## 部署顺序（关键）

1. 改脚本 / 重跑 → 生成 webp 并更新 `albums.json`
2. **先把 webp 传 R2**（先传，避免窗口期裂图）
3. 分支提交 → merge `main` → `git push origin main` → Vercel 自动重建
4. 验证：R2 直链可见图；活动页相册显示 webp

## Pilot 结果（上步小学）

- 7 张 raster jpg → webp（写入 `demonstration/`，`src` 指向 webp）
- 10 张 HEIC 原图保持 jpg（经 sips 转）
- 其余 5 个相册保持 jpg，线上不受影响
- 已通过分支 `content/image-webp-pilot` 合并并推送

## 推广到全部相册

1. 将 `WEBP_PILOT_ALBUMS = {"上步小学"}` 改为 `WEBP_PILOT_ALBUMS: set[str] = set()`
2. 重跑管线（见上）→ 全部相册 raster 照片 `src` 指向 webp
3. 把所有新生成的 webp 传 R2（见上）
4. 提交合并推送

## 注意事项

- HEIC 原图不转 webp；如需连 HEIC 也压成 webp，改 `web_photo()` 让它直接出 webp。
- 原 jpg 保留在资源目录作后备；R2 只需 webp 即可生效。
- 临时软链 `resources` 绝不提交（资源走 R2，不在 git 仓库）。
