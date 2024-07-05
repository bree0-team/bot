import {TextInputBuilder, TextInputStyle} from 'discord.js'
import {EmbedColors} from '../../../../enums/EmbedColors.enum.js'
import {ButtonHandlerOptions, ModalHandler} from '../../../../handlers/interaction.js'
import {Modal} from '../../../../services/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import {
    defaultMaxScale,
    defaultMaxX,
    defaultMaxY,
    defaultMinScale,
    defaultMinX,
    defaultMinY
} from '../constants/defaults.js'
import {
    ITEM_EDIT_GRAPH,
    ITEM_EDIT_MODAL,
    ITEM_EDIT_MODAL_COLOR,
    ITEM_EDIT_MODAL_SCALE,
    ITEM_EDIT_MODAL_X,
    ITEM_EDIT_MODAL_Y
} from '../enums/CustomIds.enum.js'
import SettingsBannerDataManager from '../managers/settings-banner-data.manager.js'
import {BannerData} from '../types/banner.type.js'
import {BannerItemData} from '../types/data.type.js'

class GraphModalInteraction extends ModalHandler {
    protected run({interaction, data}: ButtonHandlerOptions<BannerItemData>) {
        const {itemId} = data
        const bannerManager = SettingsBannerDataManager
            .findOne<BannerData>(itemId)
        const {data: graphData} = bannerManager
        return Modal(interaction, ITEM_EDIT_MODAL, interaction.t('modal:title'), [
            new TextInputBuilder({
                customId: ITEM_EDIT_MODAL_X,
                style: TextInputStyle.Short,
                label: interaction.t('settings:banner:graph:x'),
                minLength: 1, maxLength: 4,
                value: graphData.x.toString(),
                placeholder: interaction.t('settings:banner:graph:placeholder', {
                    min: defaultMinX, max: defaultMaxX
                })
            }),
            new TextInputBuilder({
                customId: ITEM_EDIT_MODAL_Y,
                style: TextInputStyle.Short,
                label: interaction.t('settings:banner:graph:y'),
                minLength: 1, maxLength: 4,
                value: graphData.y.toString(),
                placeholder: interaction.t('settings:banner:graph:placeholder', {
                    min: defaultMinY, max: defaultMaxY
                })
            }),
            new TextInputBuilder({
                customId: ITEM_EDIT_MODAL_SCALE,
                style: TextInputStyle.Short,
                label: interaction.t('settings:banner:graph:scale'),
                minLength: 1, maxLength: 3,
                value: graphData.scale.toString(),
                placeholder: interaction.t('settings:banner:graph:placeholder', {
                    min: defaultMinScale, max: defaultMaxScale
                })
            }),
            new TextInputBuilder({
                customId: ITEM_EDIT_MODAL_COLOR,
                style: TextInputStyle.Short,
                label: interaction.t('hex'),
                minLength: 1, maxLength: 7,
                value: SplitUtils.decimalToHex(graphData.color),
                placeholder: SplitUtils.decimalToHex(EmbedColors.EMPTY)
            })
        ])
    }
}

export default new GraphModalInteraction(ITEM_EDIT_GRAPH)