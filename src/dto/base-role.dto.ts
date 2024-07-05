import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {RoleId} from '../types/base.type.js'

export class BaseRoleDto {
    @ApiProperty({
        description: 'Role ID',
        type: String,
        example: '805371598777090049'
    })
    @IsNotEmpty()
    @IsString()
    readonly roleId: RoleId
}
