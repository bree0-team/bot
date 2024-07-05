import {InteractionReplyOptions} from 'discord.js'
import {SwitchEmoji} from '../../../../helpers/buttons.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsClanSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsClanManager from '../managers/settings-clan.manager.js'
import {BaseSettingsClan} from '../structures/BaseSettingsClan.js'
import {TRANSFER_SWITCH} from './enums/CustomIds.enum.js'

export class Transfer extends BaseSettingsClan {
    async run() {
        const {transfer} = await SettingsClanManager.getOne(this.guildId)
        const embed = this.embed()
            .setDescription([
                this.t('settings:clan:transfer:description'),
                '',
                SwitchEmoji(transfer) + ' ' + this.t('settings:clan:transfer:allow'),
            ].join('\n'))

        const components: InteractionReplyComponent[] = [
            this.select(SettingsClanSelectValuesCustomIds.Transfer),
            this.back(MAIN_SELECT, [
                this.turnOnOff(TRANSFER_SWITCH, transfer)
            ])
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}