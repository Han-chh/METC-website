# 资源系统架构

## 网站和数据边界

METC 是由高中生运营的公益教育与支教社团。网站公开展示课程、课堂活动、学生作品和反馈；当前是静态前端，不提供登录、CMS、数据库或后端 API。

资源路径如下：

```text
原始课程资料/活动照片
        ↓
resources/METC/ + 配置 JSON
        ↓
tools/resource_pipeline/
        ↓
demonstration/、course.json、album.json、前端索引 JSON
        ↓
/teaching 和 /activities 页面
```

`public/resources` 是通往仓库 `resources/` 的符号链接，因此静态导出会把展示资源一并发布。生成脚本使用 `/METC-website/resources/...` URL，须与 `next.config.ts` 的 `basePath` 保持一致。

## 页面实现

- 首页：`app/page.tsx` 与 `components/metc-home-page.tsx`，使用首页分区组件和 `content/` 双语内容。
- 课程：`app/teaching/page.tsx`、`components/teaching/*`，读取 `src/data/resources/generated/courses.json`。课程大纲是经清理的 HTML，课件是图片序列。
- 活动：`app/activities/page.tsx`、`components/activities/activities-page.tsx`，读取 `albums.json`，提供懒加载照片墙与灯箱。
- 学生反馈：`app/voices/page.tsx`、`components/voices/*`，直接读取人工维护的 `content/voices/feedbacks.ts`。

## 不可混淆的三类文件

| 类别 | 位置 | 处理原则 |
| --- | --- | --- |
| 原始内容 | `source/`、活动相册中的原始照片 | 保留、审核、版本化；不由脚本改写 |
| 配置 | `course.config.json`、`album.config.json`、`content/voices/feedbacks.ts` | 人工维护，决定标题、封面和展示语义 |
| 生成展示物 | `demonstration/`、`course.json`、`album.json`、`src/data/resources/generated/` | 可重新生成，但需要提交以支持静态构建 |

详情见 [资源上传与封面](RESOURCE_OPERATIONS.md) 与 [资源处理流程](RESOURCE_PIPELINE.md)。
