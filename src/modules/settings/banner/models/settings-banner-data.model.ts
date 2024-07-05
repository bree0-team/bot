import {AllowNull, Column, DataType, Model, Table} from 'sequelize-typescript'
import {GuildId} from '../../../../types/base.type.js'
import {BannerData} from '../types/banner.type.js'

interface SettingsBannerAttrs<Data extends BannerData = BannerData> {
    id: number
    guildId: GuildId
    data: Data | {}
}

interface SettingsBannerCreationAttrs extends SettingsBannerAttrs {}

@Table({tableName: 'settings_banner_data'})
export class SettingsBannerDataModel<Data extends BannerData = BannerData>
    extends Model<SettingsBannerAttrs<Data>, SettingsBannerCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @AllowNull(false)
    @Column(DataType.TEXT)
    get data(): Data {
        return JSON.parse(<string>this.getDataValue('data'))
    }
    set data(value: Data) {
        this.setDataValue('data', JSON.stringify(value))
    }
}