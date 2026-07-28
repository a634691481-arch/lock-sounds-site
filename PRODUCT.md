# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

音效爱好者社群 — 中国新能源汽车车主（以蔚来/乐道用户为主）和锁车音效爱好者，通过本平台发现、试听、下载个性化的锁车提示音。用户通常在换车前或车友群中交流时访问，行为模式是浏览-试听-下载。

## Product Purpose

提供最全的锁车音效免费试听与下载平台，涵盖网络热梗、动漫游戏、影视剧场等 13 个分类共 2000+ 款音效，附带车机壁纸库。解决车主"找不到专属锁车音效"的需求，成为中文锁车音效的权威索引。

## Positioning

最全的锁车音效库 — 分类覆盖、更新频率、文件数量均为同类第一。所有资源通过 jsDelivr CDN 永久免费分发，数据完全透明可追溯。

## Operating Context

- 服务器：Vercel（SSR），域名 lock.moon.vip
- 资产仓库：GitHub `a634691481-arch/lock-sounds-assets`，通过 jsDelivr CDN 分发
- 反馈系统：PushPlus API 推送
- 数据同步：通过 GitHub API 扫描资产仓库生成 sounds.json / wallpapers.json
- 栈：Nuxt 3 + Tailwind CSS + GSAP + PWA
- 内容语言：中文
- 用户分布：中国，需考虑 GFW 内 CDN 可达性

## Capabilities and Constraints

- 音效在线试听（HTML5 Audio）与分类筛选
- 壁纸在线预览与下载
- 搜索（300ms 防抖）+ 分页
- PWA 离线支持
- 反馈提交（PushPlus）
- 最近播放（localStorage，最多 20 条）
- 键盘快捷键：Space（播放/暂停）、Left/Right（快进/快退）
- 禁止：注册登录、付费、广告、UGC 上传、评论系统
- 所有音效文件存储于 GitHub 仓库，仅通过 CDN 引用

## Brand Commitments

- 名称：锁车音效分享平台 / LockSounds
- 品牌色：#e94560（红）
- 标语：让你的锁车声，与众不同
- 蔚来乐道 L60 川A·BQ0326 — 车友身份标识
- 字体：ZCOOL KuaiLe（品牌标题）+ Noto Sans SC（正文）+ Plus Jakarta Sans（英文/数字）

## Evidence on Hand

- sounds.json：2038 条音效元数据
- wallpapers.json：413 条壁纸元数据
- 资产仓库全部 WAV 文件和壁纸图片
- donate-qr.png 赞赏码（纯爱好项目标识）
- 无用户指标、无流量统计

## Product Principles

1. **免费永久** — 项目纯爱好驱动，不接广告不收费
2. **内容为王** — 分类最全、更新最快，做锁车音效领域的权威索引
3. **社区友好** — 车友品牌露出、反馈直达、透明开源
4. **性能优先** — CDN 全球分发、PWA 离线、极速加载
5. **克制设计** — 不做登录注册，不做评论区，保持工具属性

## Accessibility & Inclusion

- 中国大陆网络环境：jsDelivr CDN 和 Google Fonts 需国内可达
- 目标用户为中文母语者，界面全中文
- 移动端优先（车主多在手机上操作）
