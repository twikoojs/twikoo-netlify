# Twikoo 云函数

## 部署

请查看 [Netlify 部署](https://twikoo.js.org/backend.html#netlify-部署)

本模板使用现代 Netlify Functions 入口，使 `twikoo-netlify` 能通过
`context.waitUntil()` 在响应返回后继续派发垃圾检测与邮件/即时消息通知。

旧模板的 `require("twikoo-netlify").handler` 入口仍受支持；升级到本模板时，
请确保使用包含现代默认入口的 `twikoo-netlify` 版本。

## 升级兼容性

> [!WARNING]
> 不要在新版 `twikoo-netlify` 发布前使用本模板。旧包没有 `default` 导出，搭配本模板会造成构建或部署失败。

| `twikoo-netlify` 包 | 模板入口 | 结果 |
| --- | --- | --- |
| 旧版 | 旧 `require(...).handler` | 正常运行，但通知会同步等待 |
| 新版 | 旧 `require(...).handler` | 功能兼容，但仍同步等待最多约 5 秒 |
| 旧版 | 新 ESM 默认入口 | **不兼容**：构建或部署失败 |
| 新版 | 新 ESM 默认入口 | 正常运行，通知由 `context.waitUntil()` 异步派发 |

正确升级顺序：

1. 等待包含现代默认入口的 `twikoo-netlify` 发布。
2. 将 `package.json` 依赖更新到该版本，不要指向旧版本。
3. 再部署本模板，并验证评论响应和后台通知。

只升级 npm 包但保留旧模板，不会启用异步派发，也不会改善评论提交耗时。

## 更新

直接修改 `package.json` 中的版本号
