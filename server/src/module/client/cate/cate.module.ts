import { Module } from '@nestjs/common'
import { CateService } from './cate.service'
import { CateController } from './cate.controller'

@Module({
  controllers: [CateController],
  providers: [CateService],
})
export class CateModule {}
