# 资源处理流程

资源处理脚本位于 `tools/resource_pipeline/`，从仓库根目录运行。新增或替换课程资料、活动照片、封面配置后再执行。

```bash
python3 tools/resource_pipeline/convert_docx.py
python3 tools/resource_pipeline/convert_pptx.py
python3 tools/resource_pipeline/generate_metadata.py
```

## 每个脚本做什么

| 命令 | 输入 | 输出 | 写入边界 |
| --- | --- | --- | --- |
| `convert_docx.py` | `source/*.docx` | `demonstration/syllabus.zh|en.html`、JSON、图片资产 | 不写入 `source/` |
| `convert_pptx.py` | `source/*.pptx`、`*.ppt`、`*.pdf` | `demonstration/lessonN/preview.pdf`、slide PNG、`preview.json` | 会重建对应 `lessonN/` |
| `generate_metadata.py` | 配置、展示文件、活动照片 | 每课程 `course.json`、每学校 `album.json`、前端课程/相册索引 | HEIC 可生成 JPEG 预览 |

DOCX 使用 LibreOffice 转换，并以白名单清理 HTML，只保留安全的标题、段落、列表、表格、图片和链接。PPT/PDF 使用 LibreOffice（PPT 时）和 Poppler 转成浏览器可预览的 PNG。网页只消费这些生成物，而不嵌入办公文档。

## 环境依赖

- Python 3
- LibreOffice 或 `soffice`：DOCX/PPT 转换
- Poppler 的 `pdftoppm`：PDF 转 PNG
- macOS `sips`：将 HEIC 生成 JPEG 展示副本
- Pillow（可选）：为相册照片读取尺寸；缺失时相册仍可生成

先用下列命令确认关键依赖：

```bash
command -v soffice || command -v libreoffice
command -v pdftoppm
command -v sips
```

可只处理一个课程，以减少等待时间：

```bash
python3 tools/resource_pipeline/convert_docx.py --course "经济-微观经济"
python3 tools/resource_pipeline/convert_pptx.py --course "经济-微观经济"
python3 tools/resource_pipeline/generate_metadata.py
```

## 可再生文件与版本控制

`demonstration/`、`course.json`、`album.json` 与 `src/data/resources/generated/*.json` 都是生成文件，但须提交到 Git。它们既是静态导出所需的网页资源，也使未安装转换工具的部署环境能直接构建。

`source/` 中的 DOCX、PPTX、PDF 与活动照片是不可由脚本恢复的原始内容，必须谨慎保留、随版本提交，并按授权处理。

## 常见问题

- **没有找到转换工具**：安装 LibreOffice/Poppler，或在具备依赖的 macOS 机器执行转换后提交生成文件。
- **PPT 顺序不符合预期**：转换脚本按 `source/` 文件名排序编号。使用稳定的文件名前缀，或通过 `course.config.json` 的 `lessonTitles` 调整展示标题。
- **封面没有变化**：确认 `album.config.json` 的路径相对学校目录、指向原始照片，随后运行 `generate_metadata.py`。
- **HEIC 没有显示**：确认 `sips` 可用；不要删除相册目录下的 `demonstration/*.jpg`。
- **Word 大纲格式异常**：先在 Word 中检查原文件，重新运行 DOCX 转换；不要直接手改生成 HTML，手改会在下次转换丢失。
