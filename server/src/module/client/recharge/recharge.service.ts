import { FsRecharge } from '@/model/FsRecharge'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RechargeService {
  @InjectRepository(FsRecharge) private rechargeModel: Repository<FsRecharge>

  findAll() {
    return this.rechargeModel.find()
  }
}
