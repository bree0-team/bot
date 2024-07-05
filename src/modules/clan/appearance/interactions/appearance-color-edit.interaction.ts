import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {SplitUtils} from '../../../../utils/split.js'
import ClanManager from '../../managers/clan.manager.js'
import {AppearanceData} from '../../types/data.type.js'
import {Appearance} from '../Appearance.js'
import {ClanAppearanceModalCustomIds, ClanAppearanceModalValuesCustomIds} from '../enums/CustomIds.enum.js'

class AppearanceColorEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AppearanceData>) {
        const {clanId} = data
        const color = fields.getTextInputValue(ClanAppearanceModalValuesCustomIds.Color)
        const embed_color = SplitUtils.hexToDecimal(color.replace('#', '_'))
        await ClanManager.update(clanId, {color: embed_color})
        const clan = ClanManager.findOne(clanId)
        if (clan.roleId) interaction.guild.roles.edit(clan.roleId, {color: embed_color})
        return new Appearance(interaction).run()
    }
}

export default new AppearanceColorEditInteraction(ClanAppearanceModalCustomIds.ColorEdit)