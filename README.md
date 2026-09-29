# Twikoo 云函数

## 部署

请查看 [Netlify 部署](https://twikoo.js.org/backend.html#netlify-部署)

本模板使用现代 Netlify Functions 入口，使 `twikoo-netlify` 能通过
`context.waitUntil()` 在响应返回后继续派发垃圾检测与邮件/即时消息通知。

旧模板的 `require("twikoo-netlify").handler` 入口仍受支持；升级到本模板时，
请确保使用包含现代默认入口的 `twikoo-netlify` 版本。

本模板固定使用 **Node 24**；新版 `twikoo-netlify` 的现代入口要求
Node.js **>= 22.12.0**。

## 不兼容升级说明

新版模板已从旧的 CommonJS Functions v1 入口切换到 Modern Netlify Functions：

```text
netlify/functions/twikoo.js
        ↓
netlify/functions/twikoo.mjs
```

这样 `twikoo-netlify` 才能使用 `context.waitUntil()` 异步执行
`POST_SUBMIT`，避免邮件等后置通知阻塞评论提交。

如果你的站点是从旧模板升级，不能只修改 npm 版本或只同步入口文件：

- 只升级 `twikoo-netlify`、保留旧 `require(...).handler`：仍可运行，但继续走同步兼容路径，评论提交最多可能继续等待约 5 秒。
- 只同步新版模板、仍安装旧版 `twikoo-netlify`：可能在构建或函数加载阶段失败。
- 项目仍固定 Node 18/20：新版 Modern 入口无法满足依赖要求，需要 Node.js **>= 22.12.0**。
- Sync fork 如果遇到 `twikoo.js` 删除 / `twikoo.mjs` 新增的冲突，可以按下面步骤手工完成升级。

### 旧部署升级步骤

1. 删除：

   ```text
   netlify/functions/twikoo.js
   ```

2. 新建：

   ```text
   netlify/functions/twikoo.mjs
   ```

   内容：

   ```js
   export { default } from "twikoo-netlify"
   ```

3. 确认 `package.json`：

   ```json
   {
     "dependencies": {
       "twikoo-netlify": "latest"
     },
     "engines": {
       "node": ">=22.12.0"
     }
   }
   ```

4. 在仓库根目录增加或更新 `.node-version`：

   ```text
   24
   ```

   如果 Netlify 项目另外配置过 `NODE_VERSION`，也请确保不低于 22.12.0，建议使用 24。

5. 提交修改后，在 Netlify 控制台执行：

   ```text
   Deploys → Trigger deploy → Clear cache and deploy site
   ```

6. 部署完成后先访问函数地址确认运行正常，再提交一条测试评论，确认评论快速返回且邮件 / 即时消息通知仍能收到。

完成这次迁移后，后续正常升级只需要同步本仓库并重新部署即可。

## 更新

直接修改 `package.json` 中的版本号
