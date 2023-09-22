import { ApiResultVo } from '@/common/vo/apiResult.vo'
import { ApiProperty } from '@nestjs/swagger'

export class TotalVo {
  @ApiProperty({ description: '待付款' })
  watingPay: number

  @ApiProperty({ description: '待发货' })
  waitingDeliver: number

  @ApiProperty({ description: '待发货' })
  waitingReceipt: number

  @ApiProperty({ description: '已完成' })
  completed: number

  @ApiProperty({ description: '退款/售后' })
  refund: number
}

export class OrderTotalVo extends ApiResultVo {
  @ApiProperty({ description: '订单统计数据' })
  data: TotalVo
}
