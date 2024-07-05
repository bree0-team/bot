import {Optional} from 'sequelize'
import {AllowNull, BeforeCreate, Column, DataType, Default, Model, PrimaryKey, Table} from 'sequelize-typescript'
import {GuildId, MessageId, UserId} from '../../../types/base.type.js'
import {InteractionData} from '../../../types/data.type.js'
import {defaultData} from '../constants/defaults.js'

interface InteractionAttrs {
    guildId: GuildId
    messageId: MessageId
    userId: UserId
    data: InteractionData
}

interface InteractionCreationAttrs extends Optional<InteractionAttrs, 'userId'> {}

@Table({tableName: 'interaction', updatedAt: false})
export class InteractionModel extends Model<InteractionAttrs, InteractionCreationAttrs> {
    @AllowNull(false)
    @Column
    guildId: GuildId

    @PrimaryKey
    @Column
    messageId: MessageId

    @AllowNull(false)
    @Column
    userId: UserId

    @AllowNull(false)
    @Default(defaultData)
    @Column(DataType.TEXT)
    get data(): Object {
        return JSON.parse(<string>this.getDataValue('data'))
    }
    set data(value: Object) {
        this.setDataValue('data', JSON.stringify(value));
    }

    @AllowNull(false)
    @Column
    updatedAt: Date

    @BeforeCreate
    static validationItem(model: InteractionModel) {
        // todo: ValidationErrorItem
        if (!model.data) model.data = defaultData
    }
}