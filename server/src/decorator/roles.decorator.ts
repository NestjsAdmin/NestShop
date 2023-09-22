import { SetMetadata, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

export const Roles = (...roles: string[]) =>
  applyDecorators(SetMetadata('roles', roles), ApiBearerAuth())
