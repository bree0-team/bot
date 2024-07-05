import {InteractionReplyOptions, StringSelectMenuBuilder} from 'discord.js'
import {GuildEmbed} from '../../helpers/embed.js'
import {InteractionReplyComponent, StringSelectRowBuilder} from '../../services/interaction.js'
import {SelectService} from '../../builders/select.js'
import {MAIN_SELECT, MainSelectValuesSorted} from './enums/CustomIds.enum.js'
import {BaseSettings} from './structures/BaseSettings.js'

export class Settings extends BaseSettings {
    async run() {
        const embed = GuildEmbed(this.guildId)
            .setTitle(this.t('settings:settings'))
            .setDescription(this.t('settings:select_module'))
        const select = new StringSelectMenuBuilder({customId: MAIN_SELECT})
            .setOptions(...SelectService.getOptions(this.i, MAIN_SELECT, undefined, MainSelectValuesSorted))
        const components: InteractionReplyComponent[] = [StringSelectRowBuilder(select)]
        const replyData: InteractionReplyOptions = {embeds: [embed], components, files: []}
        return this.reply({replyData})
    }
}