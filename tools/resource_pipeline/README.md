# METC resource pipeline

Run these commands from the repository root after adding or changing **copies** of original teaching files:

```bash
python3 tools/resource_pipeline/convert_docx.py
python3 tools/resource_pipeline/convert_pptx.py
python3 tools/resource_pipeline/generate_metadata.py
```

- `convert_docx.py` uses LibreOffice to convert every `source/*.docx`, sanitises the result, and writes a language-specific preview. Use `syllabus.docx` for Chinese and `syllabus.en.docx` for English; the outputs are `demonstration/syllabus.zh.html` / `syllabus.en.html` and matching JSON manifests.
- `convert_pptx.py` converts each `source/*.pptx` (and the existing PDF course materials) to `demonstration/lessonN/preview.pdf`, then generates the page PNGs in `demonstration/lessonN/slides/`. The resulting `preview.json` drives the image viewer.
- `generate_metadata.py` reads those demonstration manifests, writes per-course `course.json` and per-school `album.json`, and refreshes `src/data/resources/generated/` for the static Next.js build.

Prerequisites: LibreOffice (`soffice`) and Poppler (`pdftoppm`). The supplied macOS environment already provides both.

The scripts deliberately never write into a `source/` directory. Generated files can be safely regenerated; original teaching files cannot.
