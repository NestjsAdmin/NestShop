import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastyfyMultipart from '@fastify/multipart'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Log4jsLogger } from '@nestx-log4js/core'
import Interceptors from '@/middleware/interceptors'
import Filters from '@/middleware/filters'
import Guards from '@/middleware/guards'
import { AppModule } from '@/app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import config from '@/config'
import * as fs from 'fs'
import { isPortOccupied } from './utils/tools'

const ENV = process.env.SERVER_ENV
const logger = new Logger('NestApplication')
let portCount = 0

async function bootstrap() {
  // 使用fastify作为nest的http底层框架
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  await app.register(fastyfyMultipart)

  // 根据配置文件开启跨域
  config.server.cors && app.enableCors()

  // 使用log4js日志
  app.useLogger(app.get(Log4jsLogger))

  // 设置全局路由前缀
  app.setGlobalPrefix(config.server.prefix)

  // 使用自定义拦截器
  app.useGlobalInterceptors(new Interceptors())

  // 使用自定义异常过滤器
  app.useGlobalFilters(new Filters())

  // 使用自定义守卫
  app.useGlobalGuards(new Guards())

  // 使用自定义管道
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    })
  )

  // 开发环境使用swagger文档
  if (ENV === 'dev') {
    const docOptions = new DocumentBuilder()
      .setTitle(config.swagger.title)
      .setDescription(config.swagger.desc)
      .setVersion(config.swagger.version)
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, docOptions)
    fs.writeFileSync('./public/swagger.json', JSON.stringify(document))
    SwaggerModule.setup(config.swagger.path, app, document)
  }

  // 根据配置文件监听响应的端口、地址
  const port = await isPortOccupied(config.server.port, config.server.address)
  await app.listen(port, config.server.address).catch(() => {
    portCount++
    // 启动重试次数不能超过10次，避免死循环
    if (portCount < 10) bootstrap()
  })

  logger.log(`Server: http://localhost:${port}`)
  if (ENV === 'dev')
    logger.log(`Swagger: http://localhost:${port}${config.swagger.path}`)
}

bootstrap()
