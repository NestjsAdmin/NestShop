## 运行说明

```bash
# 安装依赖
$ npm i --force
# 运行测试环境
$ npm run dev
# 运行生产环境
$ npm run prod
# 打包生产环境
$ npm run build
# 生成模型文件（自带类型、空值校验）
$ npm run model
# 生成 restful 模块
$ nest g res module/路径
```

## 目录说明

- lib 依赖库文件夹（模型生成器等）
- logs 日志文件夹
- public 静态资源文件夹
- ├─upoload 上传资源文件夹
- src
- ├─common 公共文件夹（dto、vo 等）
- ├─config 配置文件夹（开发环境配置、生产环境配置）
- ├─decorator 装饰器文件夹
- ├─middleware 中间件文件夹（拦截器、过滤器、守卫等）
- ├─model 模型文件夹（自动生成）
- ├─module 模块文件夹（controller、service、dto、vo 等）
- ├─utils 工具模块文件夹
- ├─pem 证书文件夹

## 技术选型

1. node.js
2. nest.js
3. typescript
4. typeorm
5. fastify
6. log4js
7. mysql
8. swagger
9. eslint
10. prettier

## 开发文档

- nest.js 文档：<https://docs.nestjs.cn/9/firststeps>
- typescript 文档：<https://typescript.bootcss.com/>

# 开发工具推荐

- VSCode（编辑工具）
- Database Client（插件）
- TSLint（插件）
- Prettier （插件）
- JavaScript and TypeScript（插件）
