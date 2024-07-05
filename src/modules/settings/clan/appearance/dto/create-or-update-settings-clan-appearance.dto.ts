import {OmitType} from '@nestjs/swagger'
import {SettingsClanAppearanceDto} from './settings-clan-appearance.dto.js'

export class CreateOrUpdateSettingsClanAppearanceDto extends OmitType(SettingsClanAppearanceDto, ['guildId'] as const) {}