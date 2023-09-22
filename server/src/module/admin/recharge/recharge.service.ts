import { FsRecharge } from '@/model/FsRecharge'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class RechargeService {
  constructor(
    @InjectRepository(FsRecharge) private rechargeModel: Repository<FsRecharge>
  ) {}

  find() {
    return this.rechargeModel.find({
      where: {
        delFlag: false,
      },
      order: {
        createAt: 'DESC',
      },
    })
  }

  save(recharge: FsRecharge) {
    return this.rechargeModel.save(recharge)
  }

  async deleteById(id: number) {
    // const result = await this.rechargeModel.delete(id)
    const result = await OrmUtils.softDeletion(this.rechargeModel, { id })
    return result.affected > 0
  }
}
