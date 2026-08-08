# 教学资料、照片与封面上传规范

本指南覆盖 Word、PPT、PDF 与活动照片。当前网站没有上传后台；“上传”指将已审核文件放入以下版本控制目录，再运行资源处理脚本。

## 先判断资料类型

| 资料 | 放置位置 | 网页展示方式 | 原始文件是否公开嵌入 |
| --- | --- | --- | --- |
| Word 课程大纲 | `resources/METC/课程设计/<课程名>/source/` | 转为经清理的 HTML | 否 |
| PPT/PPTX | 同上 | 转 PDF，再转为逐页 PNG | 否 |
| 既有 PDF 课件 | 同上 | 转为逐页 PNG | 否 |
| 活动照片 | `resources/METC/活动成果展览/<学校名>/`，可按课次分子目录 | 相册、照片墙、灯箱 | 是，浏览器可用格式 |
| HEIC 活动照片 | 同上 | 保留 HEIC 原图，同时生成 JPEG 展示副本 | 原 HEIC 否；JPEG 是 |

原始教学资料只放在 `source/`；不要把修改版、截图、缓存或转换结果放入其中。`demonstration/` 由脚本管理，不能手动当作原始素材库。

## 新增或更新课程资料

1. 在 `resources/METC/课程设计/` 新建或选择课程目录，并保证其有 `source/` 子目录。
2. 将原始 Word、PPT/PPTX、PDF 复制到 `source/`。中文大纲命名为 `syllabus.docx`，英文大纲命名为 `syllabus.en.docx`；每种语言只允许一个大纲。
3. 新课程创建 `course.config.json`。至少明确 `id`、`order`、中英文 `title`、`school`、中英文 `category`、`summary`、`contains`。`lessonTitles` 可为网页课件配置人类可读标题。
4. 运行 `docs/RESOURCE_PIPELINE.md` 的三个脚本，再查看 `course.json` 与 `/teaching`。
5. 提交原始文件、配置、生成的 `demonstration/`、`course.json` 和 `src/data/resources/generated/courses.json`。

课件网页不会嵌入 Word、PPTX 或 PDF 原件，而是显示已生成的 HTML 或 PNG。这既避免浏览器兼容性问题，也确保用户不会在站内直接执行或编辑原始办公文件。

## 新增或更新活动照片

1. 在 `resources/METC/活动成果展览/` 选择或新建学校目录。目录名会直接作为相册名称。
2. 放入经过授权和筛选的 JPG/JPEG/PNG/WebP/AVIF/GIF；可按 `L1`、`L2` 等课次建立子目录。HEIC 可保留原件，脚本会在 `demonstration/` 中生成网页 JPEG。
3. 照片应去除无关截图、聊天界面、重复/模糊图，以及未经允许可识别的学生肖像。优先保留横竖构图兼具、能表现课堂互动或作品的图片。
4. 可选：在学校目录添加或修改 `album.config.json`，按下文选择封面与首页精选图。
5. 运行 `python3 tools/resource_pipeline/generate_metadata.py`，检查生成的 `album.json` 和 `/activities`。
6. 提交原图、配置、HEIC 生成的 JPEG、`album.json` 与 `src/data/resources/generated/albums.json`。

## 相册封面与首页照片的选择

相册配置使用相对于学校目录的路径；路径必须精确匹配原始照片，而不是 `demonstration/` 中的 JPEG。示例：

```json
{
  "coverPhoto": "L3 activity/photo-001.heic",
  "homepageFeaturePhoto": "L3 activity/photo-002.jpg"
}
```

- `coverPhoto`：该学校在活动成果展览页的相册封面。未指定时，脚本按路径排序选择第一张可用照片。
- `homepageFeaturePhoto`：该学校进入首页活动轮播的精选图。未指定时，该学校仍会出现在活动成果相册，但不会提供首页精选图。
- 选择标准：主体明确、构图干净、信息量足够、画面可代表该校活动；避免人脸特写、敏感信息、竖图裁切后失去主题，或文字截图。
- 修改配置后必须重新运行元数据脚本；脚本会把 HEIC 路径映射到生成的 JPEG，并更新图片 ID。

课程本身没有单独的封面图片字段：`/teaching` 的书封由课程配置中的标题、分类、主题色 `color` 与图标 `icon` 渲染。不要为课程封面把任意照片塞进 `source/` 或 `demonstration/`；如未来需要图片课程封面，应先扩展数据模型、组件和本文件。

## 提交前检查

- 原始资料、配置和对应生成文件是否一同更新。
- `/teaching` 中大纲语言、课件标题、封面书籍信息是否正确。
- `/activities` 中封面、首页精选图、照片顺序与灯箱是否正确。
- 不存在 `.DS_Store`、Office 临时文件（例如 `~$*.pptx`）、重复导出图或未授权照片。
