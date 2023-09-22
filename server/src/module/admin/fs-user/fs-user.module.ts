import { Module } from '@nestjs/common'
import { FsUserService } from './fs-user.service'
import { FsUserController } from './fs-user.controller'

@Module({
  controllers: [FsUserController],
  providers: [FsUserService],
})
export class FsUserModule {}
