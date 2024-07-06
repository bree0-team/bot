import {Optional} from 'sequelize'
import {Column, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {UserId} from '../../../types/base.type.js'
import {AppLocaleValues} from '../helpers/consts.js'

interface LocaleAttrs {
    userId: UserId
    locale: AppLocaleValues
}

interface LocaleCreationAttrs extends Optional<LocaleAttrs, 'locale'> {}

@Table({tableName: 'language'})
export class LocaleModel extends Model<LocaleAttrs, LocaleCreationAttrs> {
    @PrimaryKey
    @Column
    userId: UserId

    @Column
    locale: AppLocaleValues
}