import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Log4jsModule } from '@nestx-log4js/core'
import { BullModule } from '@nestjs/bull'
import config from '@/config'
import * as path from 'path'

import { FileModule } from '@/module/admin/file/file.module'
import { UserModule } from '@/module/admin/user/user.module'
import { MenuModule } from '@/module/admin/menu/menu.module'
import { RoleModule } from '@/module/admin/role/role.module'
import { DeptModule } from '@/module/admin/dept/dept.module'
import { SwiperModule } from '@/module/admin/swiper/swiper.module'
import { FsUserModule } from '@/module/admin/fs-user/fs-user.module'
import { ModelModule } from '@/model.module'
import { StoreModule } from '@/module/admin/store/store.module'
import { LabelModule } from '@/module/admin/label/label.module'
import { CateModule } from '@/module/admin/cate/cate.module'
import { GoodsModule } from '@/module/admin/goods/goods.module'
import { OrderModule } from '@/module/admin/order/order.module'
import { UserModule as ClientUserModule } from '@/module/client/user/user.module'
import { SwiperModule as ClientSwiperModule } from '@/module/client/swiper/swiper.module'
import { LabelModule as ClientLabelModule } from '@/module/client/label/label.module'
import { CateModule as ClientCateModule } from '@/module/client/cate/cate.module'
import { AddressModule } from '@/module/client/address/address.module'
import { CartModule } from '@/module/client/cart/cart.module'
import { GoodsModule as ClientGoodsModule } from '@/module/client/goods/goods.module'
import { StoreModule as ClientStoreModule } from '@/module/client/store/store.module'
import { OrderModule as ClientOrderModule } from '@/module/client/order/order.module'
import { RechargeModule } from '@/module/admin/recharge/recharge.module'
import { RechargeModule as ClientRechargeModule } from '@/module/client/recharge/recharge.module'
import { StockModule } from './module/admin/stock/stock.module'
import { GiftModule } from './module/admin/gift/gift.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../', config.static.path),
      serveRoot: '/',
    }),
    TypeOrmModule.forRoot({
      ...(config.db as any),
      autoLoadEntities: true,
      logging: true,
    }),
    BullModule.forRoot({
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
      },
    }),
    Log4jsModule.forRoot(),
    ModelModule,
    UserModule,
    MenuModule,
    RoleModule,
    DeptModule,
    FileModule,
    SwiperModule,
    FsUserModule,
    StoreModule,
    LabelModule,
    CateModule,
    GoodsModule,
    OrderModule,
    ClientUserModule,
    ClientSwiperModule,
    ClientLabelModule,
    ClientCateModule,
    AddressModule,
    CartModule,
    ClientGoodsModule,
    ClientStoreModule,
    ClientOrderModule,
    RechargeModule,
    ClientRechargeModule,
    StockModule,
    GiftModule,
  ],
})
export class AppModule {}
