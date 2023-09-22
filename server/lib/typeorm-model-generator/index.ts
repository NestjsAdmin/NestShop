/*
  自动生成模型文件
*/

import * as fs from 'fs'
import config from '../../src/config'
import { execSync } from 'child_process'

/**
 * 删除指定目录下所有子文件
 * @param {*} path
 */
const emptyDir = (path) => {
  const files = fs.readdirSync(path)
  files.forEach((file) => {
    const filePath = `${path}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      emptyDir(filePath)
    } else {
      fs.unlinkSync(filePath)
    }
  })
}

emptyDir('./src/model')

// 生成模型
const command = `node lib/typeorm-model-generator/bin/tmg -h ${config.db.host} -d ${config.db.database} -p ${config.db.port} -u ${config.db.username} -x ${config.db.password} -e ${config.db.type} -o src/model --noConfig true --ce camel --cp camel`
execSync(command)

// 格式化所有文件
const format = 'npm run format'
execSync(format)
