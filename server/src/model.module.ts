import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bull'

import { OrderQueue } from './queue/orderQueue'

import { AdDept } from './model/AdDept'
import { FsAddress } from './model/FsAddress'
import { AdUser } from './model/AdUser'
import { AdRole } from './model/AdRole'
import { AdMenu } from './model/AdMenu'
import { AdFile } from './model/AdFile'
import { AdRoleMenu } from './model/AdRoleMenu'
import { FsSwiper } from './model/FsSwiper'
import { FsUser } from './model/FsUser'
import { FsStore } from './model/FsStore'
import { FsCart } from './model/FsCart'
import { FsGoods } from './model/FsGoods'
import { FsGoodsCate } from './model/FsGoodsCate'
import { FsGoodsLabel } from './model/FsGoodsLabel'
import { FsLabelGoods } from './model/FsLabelGoods'
import { FsOrder } from './model/FsOrder'
import { FsOrderItem } from './model/FsOrderItem'
import { FsTimepoint } from './model/FsTimepoint'
import { FsRecharge } from './model/FsRecharge'
import { FsStock } from './model/FsStock'
import { FsGift } from './model/FsGift'

const models = [
  AdUser,
  AdDept,
  AdRole,
  AdMenu,
  AdFile,
  AdRoleMenu,
  FsSwiper,
  FsUser,
  FsStore,
  FsAddress,
  FsCart,
  FsGoods,
  FsGoodsCate,
  FsGoodsLabel,
  FsLabelGoods,
  FsOrder,
  FsOrderItem,
  FsSwiper,
  FsTimepoint,
  FsRecharge,
  FsStock,
  FsGift,
  OrderQueue,
]

const bulls = [
  BullModule.registerQueue({
    name: 'order',
    defaultJobOptions: {
      removeOnComplete: true,
    },
  }),
]

const queue = [OrderQueue]

const orm = TypeOrmModule.forFeature(models)

const modules = [orm, ...bulls, ...queue]

@Global()
@Module({
  imports: modules,
  exports: modules,
})
export class ModelModule {}
