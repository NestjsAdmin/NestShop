import { AdFile } from '@/model/AdFile'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Like, Repository } from 'typeorm'
import { DiskStorageFile } from '@blazity/nest-file-fastify'
import config from '@/config'
import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'
import { SqlTools } from '@/utils/sqlTools'
import { FileQueryDto } from './dto/file-query.dto'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(AdFile)
    private readonly fileModel: Repository<AdFile>,
    private dataSource: DataSource
  ) {}

  async upload(files: DiskStorageFile[]) {
    const urls = []
    const adFiles: AdFile[] = []
    await this.dataSource.transaction(async (manager) => {
      for (const file of files) {
        const filename =
          randomUUID().replace(/\-/g, '') + path.extname(file.originalFilename)
        const localPath = path.join(
          __dirname,
          '../../../../..',
          config.static.path,
          config.upload.path,
          filename
        )
        const onlinePath = config.upload.domain + config.upload.path
        // fs.renameSync(file.path, localPath)
        const rs = fs.createReadStream(file.path)
        const ws = fs.createWriteStream(localPath)
        rs.pipe(ws)
        await new Promise((resolve: any) => rs.on('end', resolve))
        fs.unlinkSync(file.path)
        rs.close()
        ws.close()
        const adFile = new AdFile()
        adFile.suffix = path.extname(file.originalFilename)
        adFile.name = path.basename(file.originalFilename, adFile.suffix)
        adFile.realName = file.originalFilename
        adFile.size = file.size.toString()
        adFile.type = file.mimetype
        adFile.path = `${config.upload.path}/${filename}`
        adFile.domain = config.upload.domain
        adFiles.push(adFile)
        urls.push(`${onlinePath}/${filename}`)
      }
      await manager.insert(AdFile, adFiles)
    })
    return urls
  }

  async findAll(fileQueryDto: FileQueryDto) {
    const condition = {
      where: [
        {
          delFlag: false,
          name: Like(`%${fileQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          realName: Like(`%${fileQueryDto.keyword}%`),
        },
      ],
      order: {
        createAt: 'DESC',
      },
    }
    return await SqlTools.findToPage<AdFile>(
      this.fileModel,
      fileQueryDto,
      condition
    )
  }

  findById(id: number) {
    return this.fileModel.findOne({
      where: {
        delFlag: false,
        id,
      },
    })
  }

  async deleteById(id: number) {
    let result = false
    await this.dataSource.transaction(async (manager) => {
      const file = await this.findById(id)
      if (!file) return
      const filePath = path.join(
        __dirname,
        '../../../../..',
        config.static.path,
        file.path
      )
      fs.unlinkSync(filePath)
      result = (await manager.delete(AdFile, id)).affected > 0
    })
    return result
  }
}
