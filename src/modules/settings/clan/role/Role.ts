import {InteractionReplyOptions} from 'discord.js'
import {SwitchEmoji} from '../../../../helpers/buttons.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsClanManager from '../managers/settings-clan.manager.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {ROLE_SWITCH} from './enums/CustomIds.enum.js'

export class Role extends BaseSettingsClan {
    async run() {
        const {role} = await SettingsClanManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:role:description'),
                '',
                SwitchEmoji(role) + ' ' + this.t('settings:clan:role:allow'),
            ].join('\n'))
            .setFooter({text: this.t('settings:clan:role:footer')})
        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.Role),
            this.back(MAIN_SELECT, [
                this.turnOnOff(ROLE_SWITCH, role)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}