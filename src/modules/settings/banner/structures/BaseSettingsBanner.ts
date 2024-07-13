import {
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    codeBlock,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {AlignEmoji} from '../../../../enums/AlignEmoji.enum.js'
import {EmbedField} from '../../../../helpers/embed.js'
import {
    ActionButtonRow,
    ActionStringSelectRow,
    ButtonRowBuilder,
    StringEmptyOption,
    StringSelectRowBuilder
} from '../../../../services/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import {BannerImage} from '../../../banner/BannerImage.js'
import {BaseSettings} from '../../structures/BaseSettings.js'
import {ITEM_BOTTOM, ITEM_CENTER, ITEM_LEFT, ITEM_MIDDLE, ITEM_RIGHT, ITEM_TOP} from '../enums/CustomIds.enum.js'
import {description} from '../helpers/description.js'
import {SettingsBannerDataModel} from '../models/settings-banner-data.model.js'
import {BannerType, AlignType, ValignType} from '../types/banner.type.js'

export abstract class BaseSettingsBanner extends BaseSettings {
    protected get embed(): EmbedBuilder {
        return this.guildEmbed(this.t('settings:settings') + ': ' + this.t('settings:options:banner'))
    }
    protected embedWithFields = (x: number, y: number, scale: number, color: number): EmbedBuilder => this.embed
        .setFields(
            EmbedField(this.t('settings:banner:graph:x') + ':', codeBlock(x.toString()), true),
            EmbedField(this.t('settings:banner:graph:y') + ':', codeBlock(y.toString()), true),
            EmbedField(
                this.t('settings:banner:graph:scale') + ':',
                codeBlock(scale.toString()),
                true
            ),
            EmbedField(
                this.t('settings:banner:graph:color') + ':',
                codeBlock('md','#' + SplitUtils.decimalToHex(color))
            )
        )
    async addEmbedAttachment(embed: EmbedBuilder): Promise<AttachmentBuilder> {
        const image = await new BannerImage(this.guild).run()
        const attachment = new AttachmentBuilder(image, { name: `banner.png` })
        embed.setImage('attachment://banner.png')
        return attachment
    }
    protected itemsRow(customId: string, items: (BannerType | SettingsBannerDataModel)[]): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({customId})
        if (items.length) select.setOptions(items.map(i => {
            const option = new StringSelectMenuOptionBuilder({
                label: this.t('settings:banner:types:' + (i instanceof SettingsBannerDataModel ? i.data.type : i)),
                value: (i instanceof SettingsBannerDataModel) ? i.id.toString() : i
            })
            if (i instanceof SettingsBannerDataModel) {
                const text = description(this.i, i.data)
                if (text) option.setDescription(text)
            }
            return option
        }))
        else select.setDisabled(true).setOptions(StringEmptyOption)
        return StringSelectRowBuilder(select)
    }
    protected alignRow(position: AlignType): ActionButtonRow {
        const items: Record<AlignType, [string, AlignEmoji]> = {
            [AlignType.Left]: [ITEM_LEFT, AlignEmoji.Left],
            [AlignType.Center]: [ITEM_CENTER, AlignEmoji.Center],
            [AlignType.Right]: [ITEM_RIGHT, AlignEmoji.Right]
        }
        const buttons = Object.values(AlignType).map(i => new ButtonBuilder({
            customId: items[i][0],
            style: ButtonStyle[position === i ? 'Primary' : 'Secondary'],
            emoji: items[i][1]
        }))
        return ButtonRowBuilder(...buttons)
    }
    protected valignRow(position: ValignType): ActionButtonRow {
        const items: Record<ValignType, [string, AlignEmoji]> = {
            [ValignType.Top]: [ITEM_TOP, AlignEmoji.Top],
            [ValignType.Middle]: [ITEM_MIDDLE, AlignEmoji.Middle],
            [ValignType.Bottom]: [ITEM_BOTTOM, AlignEmoji.Bottom]
        }
        const buttons = Object.values(ValignType).map(i => new ButtonBuilder({
            customId: items[i][0],
            style: ButtonStyle[position === i ? 'Primary' : 'Secondary'],
            emoji: items[i][1]
        }))
        return ButtonRowBuilder(...buttons)
    }
}