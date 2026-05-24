
# Chippi 电商前端原型 - 实施计划

构建一个完整的前端原型，融合 Coquette 少女感 + 韩系极简，Mobile-First。所有数据用 mock，本土化功能（支付/物流/WhatsApp）用 UI 占位。

## 设计系统（src/styles.css）

定义语义 token（oklch 格式）：
- `--primary`：烟粉 Dusty Pink (#D9A9A0 区间)
- `--background`：燕麦/珍珠白 (#FAF7F2 区间)
- `--foreground`：炭黑（标题）
- `--muted-foreground`：柔和灰（正文）
- `--accent`：浅粉点缀
- `--radius`：偏圆润 (0.75rem)
- 自定义渐变 `--gradient-soft`、阴影 `--shadow-soft`

字体（Google Fonts，模块级 loadFont 引入）：
- 标题：`Cormorant Garamond` 或 `Playfair Display`（衬线）
- 正文：`Inter`

## 页面结构

```
src/routes/
  __root.tsx          (加全局字体、Header、Footer、WhatsApp 悬浮按钮)
  index.tsx           (首页)
  shop.tsx            (商品列表)
  product.$id.tsx     (商品详情)
  cart.tsx            (购物车)
```

每个路由独立 `head()`：title / description / og:title / og:description。

### 1. 首页 index.tsx
- **Hero**：全屏图（AI 生成韩系街拍画报感图，不是视频，避免占位视频丑），左下叠加衬线标题 "For every lovely moment."
- **Bento Grid**：3 个大小不一方格 — New Arrivals / Best Sellers / Bow Series
- **Featured Products**：4 件商品卡片，hover 切换第二张图
- **Instagram Feed 占位**：6 格方形图网格，标注 "@chippi.my"
- **品牌故事简介**

### 2. 商品列表 shop.tsx
- 顶部分类标签（Tops / Dresses / Skirts / Bow Series）
- 响应式商品网格（手机 2 列 / 桌面 4 列）
- 商品卡 hover 动效

### 3. 商品详情 product.$id.tsx
- 图片画廊（左右滑）
- 标题、价格、颜色/尺码选择
- **Size Guide 模块**：模特身材参考 + 员工试穿报告（卡片样式）
- **Complete the Look**：3 件搭配推荐
- 商品描述、面料、洗护
- **手机端悬浮 Add to Cart 按钮**（sticky bottom）

### 4. 购物车 cart.tsx
- 商品清单（数量调整、删除）
- 小计、运费占位
- 支付方式选择 UI：TNG / GrabPay / FPX / Card（仅 UI 占位，按钮不联动）
- "Estimated delivery by J&T / NinjaVan" 文案占位

## 共享组件

```
src/components/
  Header.tsx           (Logo、导航、购物车图标，手机汉堡菜单)
  Footer.tsx           (社交链接、政策链接)
  WhatsAppButton.tsx   (右下悬浮，wa.me 链接占位)
  ProductCard.tsx      (hover 切图)
  BentoCell.tsx
  SectionTitle.tsx     (衬线大标题样式)
```

## Mock 数据

`src/lib/products.ts` — 导出 12 件商品（id、name、price RM、images[2]、category、sizes、colors、description、modelInfo）。AI 生成所有商品图与 hero。

## 图片生成（imagegen）

- 1 张 hero（韩系街拍 16:9）
- 12 张主商品图 + 12 张第二视角图（正方形）
- 6 张 Instagram feed 占位
- 1 张品牌包装图

保存到 `src/assets/`，作为 ES6 import 引用。

## 微交互（Tailwind + CSS）

- 商品卡 hover：第二张图淡入 + 轻微 scale
- 按钮 hover：bg-primary/90
- 页面切换：fade-in
- 桌面端可选：自定义 cursor（蝴蝶结 SVG），如时间允许

## 范围之外（用户已确认）

- 真实支付集成（TNG/GrabPay/FPX）
- 真实物流追踪
- WhatsApp 真实跳转（先放占位 `https://wa.me/60xxx`）
- 后端、用户登录、订单存储

## 技术说明

- 严格使用语义 token，不写 `text-pink-300` 等硬编码颜色
- 所有路由独立 head 元数据
- 购物车状态用 Zustand 或简单的 React Context（前端临时存储）
- Mobile-first：默认样式针对手机，`md:` 断点扩展桌面

实施完后可在 preview 看到完整可点击的 4 页面原型，便于后续接 Codex 后端。
