# Twikoo 云函数

## 部署

请查看 [Netlify 部署](https://twikoo.js.org/backend.html#netlify-部署)

本模板使用现代 Netlify Functions 入口，使 `twikoo-netlify` 能通过
`context.waitUntil()` 在响应返回后继续派发垃圾检测与邮件/即时消息通知。

旧模板的 `require("twikoo-netlify").handler` 入口仍受支持；升级到本模板时，
请确保使用包含现代默认入口的 `twikoo-netlify` 版本。

## 更新

直接修改 `package.json` 中的版本号
