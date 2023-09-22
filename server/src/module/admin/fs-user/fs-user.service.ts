import { FsUser } from '@/model/FsUser'
import { SqlTools } from '@/utils/sqlTools'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { FsUserQueryDto } from './dto/fs-user-query.dto'

@Injectable()
export class FsUserService {
  constructor(
    @InjectRepository(FsUser) private fsUserModel: Repository<FsUser>
  ) {}

  async findAll(fsUserQueryDto: FsUserQueryDto) {
    const condition = {
      where: [
        {
          delFlag: false,
          nickName: Like(`%${fsUserQueryDto.keyword}%`),
        },
        {
          delFlag: false,
          phoneNumber: Like(`%${fsUserQueryDto.keyword}%`),
        },
      ],
      order: {
        createAt: 'DESC',
      },
    }
    return await SqlTools.findToPage<FsUser>(
      this.fsUserModel,
      fsUserQueryDto,
      condition
    )
  }

  async update(user: FsUser) {
    const result = await this.fsUserModel.update(user.id, user)
    return result.affected > 0
  }
}
