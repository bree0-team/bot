import {
    ButtonBuilder,
    ButtonStyle,
    inlineCode,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {
    ActionStringSelectRow,
    ButtonRowBuilder,
    InteractionReplyComponent,
    StringEmptyOption,
    StringSelectRowBuilder
} from '../../../services/interaction.js'
import {BaseClan} from '../structures/BaseClan.js'
import {CLAN_AD_CREATE, CLAN_AD_SELECT} from './enums/CustomIds.enum.js'
import {enabledAd} from './helpers/enabledAd.js'
import {getOwner} from './helpers/getOwner.js'
import ClanAdManager from './managers/clan-ad-manager.js'
import {ClanAdModel} from './models/clan-ad.model.js'

export class Ad extends BaseClan {
    private adRow(options: ClanAdModel[]): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CLAN_AD_SELECT
        }).setOptions(options.map(i => new StringSelectMenuOptionBuilder({
            label: i.title,
            value: i.id.toString(),
        })))
        if (!select.options.length) select.setDisabled(true).setOptions(StringEmptyOption)
        return StringSelectRowBuilder(select)
    }
    async run() {
        const {clan} = getOwner(this.i)
        await enabledAd(this.i)
        const clanAd = ClanAdManager.findAllByClanId(clan.id).map(i => i)
        const embed = (await this.clanTitleEmbed(clan))
            .setDescription([
                this.t('clan:ad:description'),
                '',
                clanAd.map(i => inlineCode('#' + i.id + ':') + ' ' + i.title).join('\n')
            ].join('\n'))
        const button = new ButtonBuilder({
            customId: CLAN_AD_CREATE,
            label: this.t('create'),
            style: ButtonStyle.Success,
        })
        const components: InteractionReplyComponent[] = [
            this.adRow(clanAd),
            ButtonRowBuilder(button),
        ]
        const replyData: InteractionReplyOptions = {embeds: [embed], components}
        return this.reply({replyData})
    }
}