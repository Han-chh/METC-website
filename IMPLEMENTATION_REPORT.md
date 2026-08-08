# METC 教学资源展示系统实施报告

## 完成内容

- 已将原有 `resources/METC/syllabus`、`ppt`、`活动照片` 重组为 `课程设计`、`活动成果展览`、`听ta们说` 三个网站板块。所有原 DOCX、PPTX、PDF、照片、HEIC 与视频仅被移动，内容没有被改写。
- 已建立三门课程：**经济-微观经济**、**物理-光**、**自由主题**。前两门含 DOCX 大纲；自由主题只展示课件与课程介绍。
- `/teaching` 保留原有书架和 CSS 3D 开书体验，改为显示三本资源书并读取生成数据。打开后左页显示课程信息和安全清理后的 DOCX HTML，右页显示真实课件列表。
- PPT/PDF 已转换为 16 份课件、229 张 slide PNG。课件窗口支持上一页/下一页、缩略图、键盘左右键、关闭和浏览器全屏；从不 iframe 或嵌入原始 PPTX。
- `/activities` 改为读取学校相册索引，显示上步小学、普林云海、梅丽小学、绿洲、靖轩小学五个活动成果册。展开后使用懒加载的 CSS masonry 照片墙和既有灯箱。10 张 HEIC 保留原文件，并产生 JPEG 展示副本。

## 修改与新增文件

### 修改

- `components/teaching/teaching-page.tsx`
- `components/teaching/bookshelf.tsx`
- `components/teaching/course-book.tsx`
- `components/teaching/open-book.tsx`
- `components/teaching/course-syllabus.tsx`
- `components/teaching/ppt-archive.tsx`
- `components/teaching/ppt-preview.tsx`
- `content/activities/albums.ts`
- `app/teaching.css`
- `app/activities.css`

### 新增

- `PROJECT_ANALYSIS.md`
- `resources/README.md`
- `tools/resource_pipeline/{convert_docx.py,convert_pptx.py,generate_metadata.py,README.md}`
- `src/data/resources/index.ts` 与 `src/data/resources/generated/{courses,albums}.json`
- `resources/METC/课程设计/*/{source,demonstration,course.config.json,course.json}`
- `resources/METC/活动成果展览/*/album.json` 及 HEIC 的 `demonstration/*.jpg`
- `public/resources`：指向根资源目录的静态发布映射，确保静态导出站点能提供预览文件。

首页、logo、导航结构、voices 页面及其组件均未修改。

## 资源 pipeline

在项目根目录运行：

```bash
python3 tools/resource_pipeline/convert_docx.py
python3 tools/resource_pipeline/convert_pptx.py
python3 tools/resource_pipeline/generate_metadata.py
pnpm build
```

DOCX 通过 LibreOffice 转为 HTML，再由白名单清理；标题、文本、列表、表格与图片资产会保留。PPTX 先转 PDF，再由 Poppler 生成图片。每个课程根目录可选的 `course.config.json` 用于补充学校、介绍、主题色和人类可读的课次名称；即使没有该文件，pipeline 也能生成基础元数据。

## 新增课程的方式

1. 创建 `resources/METC/课程设计/<课程名>/source/` 与空的 `demonstration/`。
2. 放入原始 DOCX/PPTX/PDF；原文件保持只读存档。按需添加 `course.config.json`。
3. 运行上述 pipeline 和构建命令。`course.json`、课程索引和可展示文件会自动刷新。

新增照片只需放入 `resources/METC/活动成果展览/<学校名>/`（允许课次子目录），运行 `generate_metadata.py`。学校名称就是相册名称。

## 验证结果

- `python3 tools/resource_pipeline/convert_docx.py`：2 个 DOCX 大纲转换成功。
- `python3 tools/resource_pipeline/convert_pptx.py`：16 份课件转换成功，生成 229 张 slide PNG。
- `python3 tools/resource_pipeline/generate_metadata.py`：生成 3 个 `course.json`、5 个 `album.json`、课程/相册前端索引；共 85 张浏览器可用照片。
- `pnpm typecheck`：通过。
- `pnpm build`：通过，`/`、`/teaching`、`/activities`、`/voices` 均静态生成成功。
- 浏览器回归：验证三本课程书、开书后的 DOCX 大纲与表格、图片化 PPT 预览与键盘翻页、五所学校相册展开和照片墙。
