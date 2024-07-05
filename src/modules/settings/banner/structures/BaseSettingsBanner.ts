import {
    AttachmentBuilder,
    ButtonBuilder,
    ButtonStyle,
    codeBlock,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
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
import {ITEM_CENTER, ITEM_LEFT, ITEM_RIGHT} from '../enums/CustomIds.enum.js'
import {description} from '../helpers/description.js'
import {SettingsBannerDataModel} from '../models/settings-banner-data.model.js'
import {BannerType, PositionType} from '../types/banner.type.js'

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
    protected positionRow(position: PositionType): ActionButtonRow {
        const customIds: Record<PositionType, string> = {
            [PositionType.Left]: ITEM_LEFT,
            [PositionType.Center]: ITEM_CENTER,
            [PositionType.Right]: ITEM_RIGHT
        }
        const buttons = Object.values(PositionType).map(i => new ButtonBuilder({
            customId: customIds[i],
            style: ButtonStyle[position === i ? 'Primary' : 'Secondary'],
            label: this.t('settings:banner:position:' + i)
        }))
        return ButtonRowBuilder(...buttons)
    }
}