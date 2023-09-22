import { FsAddress } from '@/model/FsAddress'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import OrmUtils from '@/utils/OrmUtils'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(FsAddress) private addressModel: Repository<FsAddress>
  ) {}

  public find(userId: number) {
    return this.addressModel.find({
      where: {
        userId,
        delFlag: false,
      },
    })
  }

  public findById(userId: number, id: number) {
    return this.addressModel.findOne({
      where: {
        id,
        userId,
        delFlag: false,
      },
    })
  }

  public async save(userId: number, address: FsAddress) {
    address.userId = userId
    address.delFlag = false
    address.isDefault = false
    return this.addressModel.save(address)
  }

  public async update(userId: number, address: FsAddress) {
    address.userId = userId
    if (address.isDefault) {
      await OrmUtils.createQueryBuilder(this.addressModel)
        .where('userId = :userId', {
          userId,
        })
        .update({
          isDefault: false,
        })
        .execute()
    }
    const result = await this.addressModel.update(
      {
        id: address.id,
        userId,
      },
      address
    )
    return result.affected > 0
  }

  public async deleteById(userId: number, id: number) {
    const res = await OrmUtils.softDeletion(this.addressModel, { userId, id })
    return res.affected > 0
    // const result = await this.addressModel.delete({
    //   userId,
    //   id,
    // })
  }
}
