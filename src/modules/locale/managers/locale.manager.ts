import {Collection} from 'discord.js'
import {ModelManager} from '../../../managers/model.js'
import {UserId} from '../../../types/base.type.js'
import {AppLocale} from '../helpers/consts.js'
import {LocaleModel} from '../models/locale.model.js'

const collection = new Collection<UserId, LocaleModel>()

class LocaleManager extends ModelManager<UserId, LocaleModel> {
    createOrUpdate = (userId: UserId, locale: AppLocale): Promise<LocaleModel> =>
        super.$createOrUpdate(this.findOne(userId), {userId, locale})
    findOne = (userId: UserId): LocaleModel | undefined => super.$findOne(userId)
    getLocale = (userId: UserId): AppLocale | undefined => {
        const user = this.findOne(userId)
        return user ? user.locale : undefined
    }
}

export default new LocaleManager(collection, LocaleModel, 'userId')