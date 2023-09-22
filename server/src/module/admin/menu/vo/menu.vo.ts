import { AdMenu } from '@/model/AdMenu'
import { ApiProperty } from '@nestjs/swagger'

export class MetaVo {
  @ApiProperty({ required: false })
  icon: string
  @ApiProperty({ required: false })
  isAffix: boolean
  @ApiProperty({ required: false })
  isHide: boolean
  @ApiProperty({ required: false })
  isIframe: boolean
  @ApiProperty({ required: false })
  isKeepAlive: boolean
  @ApiProperty({ required: false })
  isLink: boolean
  @ApiProperty({ required: false })
  title: string
}

export class MenuVo extends AdMenu {
  @ApiProperty({ required: false })
  meta: MetaVo

  @ApiProperty({ description: '子节点', type: [MenuVo], required: false })
  children: MenuVo[]
}
