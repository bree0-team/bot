import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsArray, IsBoolean} from 'class-validator'
import {BaseGuildDto} from '../../../../dto/base-guild.dto.js'
import {ChannelId, RoleId} from '../../../../types/base.type.js'
import {defaultChannels, defaultRoles, defaultShowDeleted} from '../constants/defaults.js'
import {MemberType} from '../enums/MemberType.enum.js'
import {VoiceStates} from '../../enums/VoiceStates.enum.js'

export class SettingsActivityDto extends PartialType(BaseGuildDto) {
    @ApiProperty({
        description: 'Show deleted channels in embed',
        type: Boolean,
        example: defaultShowDeleted
    })
    @IsBoolean()
    readonly showDeleted: boolean

    @ApiProperty({
        description: 'Count only certain types of voice',
        type: Array,
        example: [MemberType.USERS]
    })
    @IsArray()
    readonly memberTypes: MemberType[]

    @ApiProperty({
        description: 'Count only certain types of voice state',
        type: Array,
        example: [VoiceStates.SelfDeaf, VoiceStates.ServerMute]
    })
    @IsArray()
    readonly voiceStates: VoiceStates[]

    @ApiProperty({
        description: 'Ignored channels',
        type: Array,
        example: defaultChannels
    })
    @IsArray()
    readonly channels: ChannelId[]

    @ApiProperty({
        description: 'Ignored roles',
        type: Array,
        example: defaultRoles
    })
    @IsArray()
    readonly roles: RoleId[]
}