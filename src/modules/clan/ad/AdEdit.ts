import {
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    InteractionReplyOptions,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js'
import {DiscordLimits} from '../../../enums/DiscordLimits.enum.js'
import {TickEmoji} from '../../../enums/TickEmoji.enum.js'
import {
    ActionStringSelectRow,
    ButtonRowBuilder,
    InteractionReplyComponent,
    StringEmptyOption,
    StringSelectRowBuilder
} from '../../../services/interaction.js'
import {BaseClan} from '../structures/BaseClan.js'
import {
    CLAN_AD,
    CLAN_AD_DELETE,
    CLAN_AD_EDIT,
    CLAN_AD_EDIT_FIELD_ADD,
    CLAN_AD_EDIT_FIELD_DELETE,
    CLAN_AD_EDIT_FIELD_MOVE_DOWN,
    CLAN_AD_EDIT_FIELD_MOVE_UP,
    CLAN_AD_EDIT_FIELDS_SELECT,
    CLAN_AD_NAME,
    CLAN_AD_SEND,
    ClanAdEditButtons,
    ClanAdEditOptions
} from './enums/CustomIds.enum.js'
import {enabledAd} from './helpers/enabledAd.js'
import {getOwner} from './helpers/getOwner.js'
import {makeEmbed} from './helpers/makeEmbed.js'
import ClanAdManager from './managers/clan-ad-manager.js'
import {AdEditData} from './types/data.type.js'

export class AdEdit extends BaseClan {
    embedRow(value?: ClanAdEditOptions): ActionStringSelectRow {
        const select = new StringSelectMenuBuilder({
            customId: CLAN_AD_EDIT,
            minValues: DiscordLimits.SELECT_MIN_ITEM_CHOSEN
        }).setOptions(
            new StringSelectMenuOptionBuilder({
                label: this.t('embed:author:label'),
                value: ClanAdEditOptions.Author,
                description: this.t('embed:author:description'),
                default: value === ClanAdEditOptions.Author,
            }),
            new StringSelectMenuOptionBuilder({
                label: this.t('embed:body:label'),
                value: ClanAdEditOptions.Body,
                description: this.t('embed:body:description'),
                default: value === ClanAdEditOptions.Body,
            }),
            new StringSelectMenuOptionBuilder({
                label: this.t('embed:fields:label'),
                value: ClanAdEditOptions.Fields,
                description: this.t('embed:fields:description'),
                default: value === ClanAdEditOptions.Fields,
            }),
            new StringSelectMenuOptionBuilder({
                label: this.t('embed:images:label'),
                value: ClanAdEditOptions.Images,
                description: this.t('embed:images:description'),
                default: value === ClanAdEditOptions.Images,
            }),
            new StringSelectMenuOptionBuilder({
                label: this.t('embed:footer:label'),
                value: ClanAdEditOptions.Footer,
                description: this.t('embed:footer:description'),
                default: value === ClanAdEditOptions.Footer,
            }),
        )
        return StringSelectRowBuilder(select)
    }
    fieldRow(clanAdId: number, fieldId: number): ActionStringSelectRow {
        const {fields} = ClanAdManager.findOne(clanAdId)
        const select = new StringSelectMenuBuilder({
            customId: CLAN_AD_EDIT_FIELDS_SELECT
        }).setOptions(fields.map((i, index) => new StringSelectMenuOptionBuilder({
            label: i.name,
            value: index.toString(),
            default: index === fieldId
        })))
        if (!select.options.length) select.setDisabled(true).setOptions(StringEmptyOption)
        return StringSelectRowBuilder(select)
    }
    embed(clanAdId: number): EmbedBuilder {
        const {
            author, authorUrl, authorIcon,
            color, bodyTitle: title, bodyDescription: description, bodyUrl: url,
            fields,
            imageUrl, thumbnailUrl,
            footerText, footerIcon
        } = ClanAdManager.findOne(clanAdId)
        return makeEmbed({
            author: {name: author, url: authorUrl, iconURL: authorIcon},
            title, description, url, color,
            fields, image: {url: imageUrl}, thumbnail: {url: thumbnailUrl},
            footer: {text: footerText, iconURL: footerIcon}
        })
    }
    async run(clanAdId: number, value?: ClanAdEditOptions, fieldId?: number) {
        getOwner(this.i)
        await enabledAd(this.i)
        const {title, fields} = ClanAdManager.findOne(clanAdId)
        const embed = this.embed(clanAdId)
        const components: InteractionReplyComponent[] = [
            this.embedRow(value)
        ]
        let buttons: ButtonBuilder[] = []
        let buttonsRow2: ButtonBuilder[] = []
        if (value) {
            if (value === ClanAdEditOptions.Fields) {
                components.push(this.fieldRow(clanAdId, fieldId))
                buttonsRow2.push(
                    new ButtonBuilder({
                        customId: CLAN_AD_EDIT_FIELD_ADD,
                        style: ButtonStyle.Success,
                        label: this.t('add'),
                    })
                )
            }
            if (value !== ClanAdEditOptions.Fields) buttons.push(
                new ButtonBuilder({
                    customId: ClanAdEditButtons[value],
                    style: ButtonStyle.Primary,
                    label: this.t('edit'),
                })
            )
            if (fieldId !== undefined) {
                buttonsRow2.push(
                    new ButtonBuilder({
                        customId: ClanAdEditButtons[value],
                        style: ButtonStyle.Primary,
                        label: this.t('edit'),
                    }),
                    new ButtonBuilder({
                        customId: CLAN_AD_EDIT_FIELD_DELETE,
                        style: ButtonStyle.Danger,
                        label: this.t('delete'),
                    }),
                )
                buttons.push(
                    new ButtonBuilder({
                        customId: CLAN_AD_EDIT_FIELD_MOVE_UP,
                        style: ButtonStyle.Secondary,
                        emoji: TickEmoji.UP,
                        disabled: fieldId === 0,
                    }),
                    new ButtonBuilder({
                        customId: CLAN_AD_EDIT_FIELD_MOVE_DOWN,
                        style: ButtonStyle.Secondary,
                        emoji: TickEmoji.DOWN,
                        disabled: fieldId === fields.length - 1,
                    }),
                )
            }
        } else {
            buttons.push(
                new ButtonBuilder({
                    customId: CLAN_AD_SEND,
                    style: ButtonStyle.Success,
                    label: this.t('send'),
                }),
                new ButtonBuilder({
                    customId: CLAN_AD_NAME,
                    style: ButtonStyle.Primary,
                    label: this.t('clan:ad:edit'),
                }),
                new ButtonBuilder({
                    customId: CLAN_AD_DELETE,
                    style: ButtonStyle.Danger,
                    label: this.t('clan:ad:delete'),
                }),
            )
        }
        if (buttonsRow2.length) components.push(ButtonRowBuilder(...buttonsRow2))
        components.push(this.back(CLAN_AD, buttons))
        const replyData: InteractionReplyOptions = {content: title, embeds: [embed], components}
        const data: AdEditData = {clanAdId, option: value, fieldId}
        return this.reply({replyData, data})
    }
}