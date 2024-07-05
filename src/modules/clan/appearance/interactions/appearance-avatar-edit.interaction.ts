import {ValidUrlError} from '../../../../errors/servererror.js'
import {ModalHandlerOptions, PrivateHandler} from '../../../../handlers/interaction.js'
import {UrlUtils} from '../../../../utils/url.js'
import ClanManager from '../../managers/clan.manager.js'
import {AppearanceData} from '../../types/data.type.js'
import {Appearance} from '../Appearance.js'
import {ClanAppearanceModalCustomIds, ClanAppearanceModalValuesCustomIds} from '../enums/CustomIds.enum.js'

class AppearanceAvatarEditInteraction extends PrivateHandler {
    protected async runFields({interaction, fields, data}: ModalHandlerOptions<AppearanceData>) {
        const {clanId} = data
        const avatar = fields.getTextInputValue(ClanAppearanceModalValuesCustomIds.Avatar)
        if (avatar) {
            const validUrl = UrlUtils.isValidHttpUrl(avatar)
            if (!validUrl) throw new ValidUrlError(interaction)
        }
        await ClanManager.update(clanId, {avatar: avatar || null})
        return new Appearance(interaction).run()
    }
}

export default new AppearanceAvatarEditInteraction(ClanAppearanceModalCustomIds.AvatarEdit)