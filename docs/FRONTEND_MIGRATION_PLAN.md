# Frontend Migration Plan

## Goal

将当前静态首页原型平稳迁移为正式前端项目，同时保留已经验证有效的内容结构，并重构已经过时的首屏系统。

## Phase 1

建立正式前端工程：

- Next.js
- TypeScript

目标：

- 建立可持续开发结构
- 引入页面与组件目录
- 建立基础样式策略
- 保持当前静态原型可对照，不直接删除

## Phase 2

建立 Design Tokens。

包括：

- 色彩 tokens
- 字体层级
- 间距尺度
- 阴影
- 圆角
- z-index 层级
- 断点
- 动效节奏

目标是让“品牌首屏”和“校园内容区”共享一套系统，而不是靠局部写死样式。

## Phase 3

开发新 Hero 原型，拆分为独立模块：

- `PenAnimation`
- `LogoPath`
- `GradientScene`
- `RibbonLayer`
- `HeroTypography`

这一阶段只做 Hero 原型验证，不急于接入所有真实内容。

需要重点评估：

- SVG Path 书写
- Motion Path / offset-path
- Web Animations API
- React 动画组织方式
- 性能与移动端降级

## Phase 4

组件化首页中下部现有内容：

- Activities
- Courses
- Student Works
- Voices
- Partner Schools
- Archive
- Spirit
- Team

要求：

- 保留“校园物件式入口”的概念
- 去除原型中的一次性硬编码表达
- 为未来真实数据接入预留结构

## Phase 5

完善双语系统。

目标：

- 默认中文
- 可切换英文
- 所有关键内容双语
- 英文布局不破坏视觉

建议从原型阶段的 `data-zh` / `data-en` 迁移到正式 i18n 架构。

## Phase 6

完善移动端与高级动画。

重点：

- 重设计移动端 Hero 路径
- 调整滚动过渡逻辑
- 控制动画性能
- 加入可访问性与 reduced motion 策略

## Phase 7

接入真实数据。

后续计划可包括：

- CMS
- PostgreSQL
- Cloudflare R2
- 活动、作品、反馈、课件与档案内容上传

当前阶段不要提前进入 Phase 7。

## Non-Goals For Phase 0

当前不做：

- 重写首页
- 删除静态原型
- 完整实现新 Hero
- 接入 CMS
- 安装大量依赖

## Recommended Immediate Next Step

下一阶段最推荐先做一件事：

在不删除现有原型的前提下，建立一个最小 Next.js + TypeScript 工程骨架，并把首页拆成静态组件壳，先迁移结构，再单独迭代新 Hero。
