import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import ClanManager from '../../managers/clan.manager.js'
import {AppearanceData} from '../../types/data.type.js'
import {Appearance} from '../Appearance.js'
import {ClanAppearanceModalCustomIds, ClanAppearanceModalValuesCustomIds} from '../enums/CustomIds.enum.js'

class AppearanceDescriptionEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AppearanceData>) {
        const {clanId} = data
        const description = fields.getTextInputValue(ClanAppearanceModalValuesCustomIds.Description)
        await ClanManager.update(clanId, {description})
        return new Appearance(interaction).run()
    }
}

export default new AppearanceDescriptionEditInteraction(ClanAppearanceModalCustomIds.DescriptionEdit)