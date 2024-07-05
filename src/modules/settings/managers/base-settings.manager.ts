import {Model} from 'sequelize-typescript'
import {CreationAttributes} from 'sequelize/types/model.js'
import {ModelManager} from '../../../managers/model.js'

export abstract class BaseSettingsManager<K, M extends Model> extends ModelManager<K, M> {
    abstract createOrUpdate(guildId: K, dto?: CreationAttributes<M>): Promise<M>;
    findOne = (guildId: K): M | undefined => super.$findOne(guildId)
    async getOne(guildId: K): Promise<M> {
        let guild = this.findOne(guildId)
        if (!guild) guild = await this.createOrUpdate(guildId)
        return guild
    }
}

export abstract class BaseSettingsManagerWithCreate<K, M extends Model, D extends CreationAttributes<M>>
    extends BaseSettingsManager<K, M> {
    createOrUpdate = (guildId: K, dto: D): Promise<M> =>
        super.$createOrUpdate(this.findOne(guildId), {guildId, ...dto})
}