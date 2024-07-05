import {bold, inlineCode, InteractionReplyOptions} from 'discord.js'
import _ from 'lodash'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {defaultTextGive} from '../constants/defaults.js'
import {XpSelectValues} from '../enums/CustomIds.enum.js'
import SettingsXpManager from '../managers/settings-xp.manager.js'
import {BaseSettingsXp} from '../structures/BaseSettingsXp.js'
import {TEXT_GIVE, TEXT_GIVE_RESET} from './enums/CustomIds.enum.js'

export class GiveText extends BaseSettingsXp {
    async run() {
        const {textGive} = await SettingsXpManager.getOne(this.guildId)
        const [from, to] = textGive
        const embed = this.embed()
            .setDescription([
                this.t('settings:xp:text_give'),
                '',
                bold(this.t('xp') + ': ') + this.t('from').toLowerCase() + ' '
                + inlineCode(from.toString()) + ' ' + this.t('to').toLowerCase() + ' ' + inlineCode(to.toString())
            ].join('\n'))
        const components: InteractionReplyComponent[] = [
            this.select(XpSelectValues.GiveText),
            this.back(MAIN_SELECT,
                this.editReset(TEXT_GIVE, TEXT_GIVE_RESET, _.isEqual(textGive, defaultTextGive))
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}