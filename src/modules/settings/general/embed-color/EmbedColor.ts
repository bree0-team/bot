import {bold, codeBlock, InteractionReplyOptions} from 'discord.js'
import {EmbedColors} from '../../../../enums/EmbedColors.enum.js'
import {InteractionReplyComponent} from '../../../../services/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import {MAIN_SELECT} from '../../enums/CustomIds.enum.js'
import {SettingsGeneralSelectValuesCustomIds} from '../enums/CustomIds.enum.js'
import SettingsGeneralManager from '../managers/settings-general.manager.js'
import {BaseSettingsGeneral} from '../structures/BaseSettingsGeneral.js'
import {EMBED_COLOR, EMBED_COLOR_RESET} from './enums/CustomIds.enum.js'

export class EmbedColor extends BaseSettingsGeneral {
    async run() {
        const {embed_color} = await SettingsGeneralManager.getOne(this.guildId)
        const embed = this.embed
            .setDescription(
                [
                    this.t('settings:general:system_color:description'),
                    '',
                    bold(this.t('settings:general:system_color:set_color') + ':'),
                    codeBlock('md', '#' + SplitUtils.decimalToHex(embed_color))
                ].join('\n')
            )
        const components: InteractionReplyComponent[] = [
            this.select(SettingsGeneralSelectValuesCustomIds.EmbedColor),
            this.back(MAIN_SELECT,
                this.editReset(EMBED_COLOR, EMBED_COLOR_RESET, embed_color === EmbedColors.EMPTY)
            )
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}