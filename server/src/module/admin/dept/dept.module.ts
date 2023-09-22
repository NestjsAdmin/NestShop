import { Module } from '@nestjs/common'
import { DeptService } from './dept.service'
import { DeptController } from './dept.controller'

@Module({
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
