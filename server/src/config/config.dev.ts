// 开发环境配置文件
export default {
  server: {
    prefix: 'api',
    address: '0.0.0.0',
    port: 44444,
    cors: true,
  },
  static: {
    path: '/public',
    exclude: ['/api*'],
  },
  upload: {
    domain: 'http://127.0.0.1',
    path: '/upload',
    maxCount: 10,
  },
  swagger: {
    path: '/swagger',
    title: '社区生鲜商城',
    desc: 'api文档',
    version: '1.0',
  },
  jwt: {
    secret: 'freshshop',
    expires: '128h',
    header: 'Authorization',
  },
  db: {
    type: 'mysql',
    host: 'http://127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'freshshop',
    delFlag: {},
  },
  redis: {
    host: 'redis.ppjun.cn',
    port: 6379,
    password: 'freshshop',
  },
  wx: {
    appid: '',
    secret: '',
    mchid: '',
    serial: '',
    apiv3: '',
    domain: 'http://127.0.0.1',
  },
}
