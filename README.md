# METC Website Frontend

这是 METC 网站的正式前端项目根目录。

当前项目聚焦公开网站首页与后续公开页面前端，不包含 CMS、后台、数据库或登录系统。

## 当前状态

首页已经进入正式前端重构阶段。

当前方向是：

**动态品牌开场 + 教育成果展览空间**

当前实现已经包含：

- 新的品牌主导 Hero
- 可见笔书写 `METC` 的动画模型
- 组件化的中下部内容结构
- 双语内容数据层
- tokenized 样式系统

## 当前项目包含

- `app/`
  Next.js App Router 页面与全局样式入口
- `components/`
  首页分区组件与交互实现
- `data/`
  双语内容数据与共享类型
- `docs/`
  项目背景、设计语言、首页愿景与迁移规划

## 当前首页能力

- 中英文切换
- 可见笔书写 `METC` 的 Hero 动画
- 动态渐变与飘带式首屏环境
- 首页滚动叙事
- 校园物件式内容入口
- 学生作品展示
- 活动档案区域
- 学生反馈便利贴
- 社团灵魂黑板
- 黄昏式情绪收尾
- 桌面 / 平板 / 手机响应式布局

## 运行方式

### 启动本地开发环境

先安装依赖：

```bash
pnpm install
```

启动开发环境：

```bash
pnpm dev
```

运行生产构建：

```bash
pnpm build
```

## Phase 0 文档

- [PROJECT_CONTEXT.md](/Users/hankchen/Desktop/METC%20Website/docs/PROJECT_CONTEXT.md)
- [DESIGN_LANGUAGE.md](/Users/hankchen/Desktop/METC%20Website/docs/DESIGN_LANGUAGE.md)
- [HOMEPAGE_VISION.md](/Users/hankchen/Desktop/METC%20Website/docs/HOMEPAGE_VISION.md)
- [FRONTEND_MIGRATION_PLAN.md](/Users/hankchen/Desktop/METC%20Website/docs/FRONTEND_MIGRATION_PLAN.md)

## 当前结论

- 保留中下部校园物件、作品展、档案、便利贴、黑板、黄昏收尾等内容资产
- 废弃“幻想学校建筑作为首屏 Hero 主体”的方向
- 当前仓库已经完全转入 Next.js + TypeScript 正式前端结构
- 后续将继续扩展真实页面路由与内容模块
