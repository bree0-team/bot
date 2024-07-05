import {SettingsBannerData} from '../banner/types/data.type.js'
import {SettingsClanData} from '../clan/types/data.type.js'
import {SettingsCommandsData} from '../commands/types/data.type.js'
import {SettingsQaData} from '../qa/types/data.type.js'
import {SettingsRolesData} from '../roles/types/data.type.js'
import {SettingsXpData} from '../xp/types/data.type.js'

export type SettingsData = SettingsClanData | SettingsCommandsData | SettingsXpData | SettingsRolesData | SettingsQaData | SettingsBannerData