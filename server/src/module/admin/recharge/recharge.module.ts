import { Module } from '@nestjs/common'
import { RechargeService } from './recharge.service'
import { RechargeController } from './recharge.controller'

@Module({
  controllers: [RechargeController],
  providers: [RechargeService],
})
export class RechargeModule {}
