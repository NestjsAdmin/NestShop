import { Module } from '@nestjs/common'
import { GiftService } from './gift.service'
import { GiftController } from './gift.controller'

@Module({
  controllers: [GiftController],
  providers: [GiftService],
})
export class GiftModule {}
