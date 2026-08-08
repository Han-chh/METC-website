# METC 资源目录规范

## 文件目录

```
resources/METC/
├── 课程设计/<课程名>/
│   ├── source/                 # 只保存原始 DOCX/PPTX/PDF，永不由脚本写入
│   ├── demonstration/          # 可再生成的 HTML、JSON、preview.pdf 和 slide PNG
│   ├── course.config.json      # 可选：学校、简介、课程颜色与课次标题
│   └── course.json             # pipeline 自动生成
├── 活动成果展览/<学校名>/
│   └── album.json              # pipeline 自动生成
└── 听ta们说/
```

`source/` 是唯一的原始教学文件存档。请将新增的 DOCX、PPTX（或历史 PDF）复制到相应课程的 `source/`，不要将转换产物或人工编辑后的副本放入这里。

## 转换与前端读取

在项目根目录依次运行：

```bash
python3 tools/resource_pipeline/convert_docx.py
python3 tools/resource_pipeline/convert_pptx.py
python3 tools/resource_pipeline/generate_metadata.py
```

DOCX 会转换、清理为 `demonstration/syllabus.html`，保留标题、列表、表格和图片；PPTX 会先转为每课的 `demonstration/lessonN/preview.pdf`，再从这份 PDF 输出每页 PNG。网页只读取 `src/data/resources/generated/{courses,albums}.json`，并只展示 `demonstration/` 下的预览资源，绝不嵌入原始 PPTX。

本项目是静态导出站点，`public/resources` 是对根目录 `resources` 的发布映射，因此这些资源会随 Next.js 导出提供给浏览器。

## 新增课程

1. 新建 `课程设计/<课程名>/source/` 与 `demonstration/`。
2. 放入原始 DOCX/PPTX；可复制并编辑 `course.config.json` 来提供学校、简介及人类可读的课次标题（缺省时 pipeline 会生成合理默认值）。
3. 运行三个 pipeline 命令，再重新构建网站。

## 新增活动照片

在 `活动成果展览/<学校名>/` 中放入照片（可按课次建立子目录）。文件夹名就是页面显示的学校名称。运行 `generate_metadata.py` 后，学校相册会自动出现在活动成果展览页；照片使用懒加载、masonry 排列和灯箱查看。HEIC 原图会保持不变，并由脚本在该学校的 `demonstration/` 中生成浏览器可用的 JPEG 预览。
