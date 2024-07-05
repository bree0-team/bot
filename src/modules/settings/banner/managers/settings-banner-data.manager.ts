import {Collection} from 'discord.js'
import {ModelManager} from '../../../../managers/model.js'
import {GuildId} from '../../../../types/base.type.js'
import {SettingsBannerDataModel} from '../models/settings-banner-data.model.js'
import {BannerData} from '../types/banner.type.js'

const collection = new Collection<number, SettingsBannerDataModel>()

class SettingsBannerDataManager extends ModelManager<number, SettingsBannerDataModel> {
    create = <Data extends BannerData> (guildId: GuildId, data: Data): Promise<SettingsBannerDataModel<Data>> =>
        super.$create({guildId, data}) as Promise<SettingsBannerDataModel<Data>>
    update = <Data extends BannerData> (modelId: number, data: Data): Promise<SettingsBannerDataModel<Data>> =>
        super.$update(this.findOne(modelId), {data}) as Promise<SettingsBannerDataModel<Data>>
    findOne = <Data extends BannerData> (modelId: number): SettingsBannerDataModel<Data> | undefined =>
        super.$findOne(modelId) as (SettingsBannerDataModel<Data> | undefined)
    findAllByGuildId = (guildId: GuildId): Collection<number, SettingsBannerDataModel> =>
        this.collection.filter(i => i.guildId === guildId)
    remove = (modelId: number): Promise<boolean> => super.$remove(modelId, {id: modelId})
}

export default new SettingsBannerDataManager(collection, SettingsBannerDataModel)