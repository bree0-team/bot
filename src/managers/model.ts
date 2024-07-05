import {Collection} from 'discord.js'
import {Attributes, ModelStatic} from 'sequelize'
import {Model} from 'sequelize-typescript'
import {CreationAttributes, WhereOptions} from 'sequelize/types/model.js'
import {Col, Fn, Literal} from 'sequelize/types/utils.js'

type UpdateAttributes<M> = {[key in keyof M]?: M[key] | Fn | Col | Literal}

/**
 * Сервис кэширования данных
 */
export abstract class ModelManager<K, M extends Model> {
    constructor(
        protected readonly collection: Collection<K, M>,
        protected readonly model: ModelStatic<M>,
        protected readonly key: string = 'id'
    ) {}

    /**
     * Записать в кэш модель по ключу
     * @param modelId - Ключ
     * @param model - Модель
     */
    set(modelId: K, model: M): Collection<K, M> {
        return this.collection.set(modelId, model)
    }

    /**
     * Записать все данные из базы в кэш
     */
    async setAll(): Promise<Collection<K, M>> {
        const models = await this.model.findAll()
        models.forEach(model => this.set(model[this.key], model))
        return this.collection
    }

    /**
     * Получить все данные кэша
     */
    findAll(): Collection<K, M> {
        return this.collection
    }

    /**
     * Найти модель в кэше
     * @param args
     */
    abstract findOne(...args: any[]): M | undefined

    /**
     * Получить модель по ключу или по самой модели
     * @param idOrModel - модель или ключ модели
     */
    resolve(idOrModel: K | M): M | undefined {
        if (idOrModel instanceof this.model) return idOrModel
        if (typeof idOrModel === typeof this.key) this.collection.get(idOrModel)
        return undefined
    }

    /**
     * Получить ключ модели по модели или по ключу модели
     * @param idOrModel - модель или ключ модели
     */
    resolveId(idOrModel: K | M): K | undefined {
        if (idOrModel instanceof this.model) return idOrModel[this.key]
        if (typeof idOrModel === typeof this.key) return idOrModel
        return undefined
    }

    /**
     * Создать объект в модель и записать в кэш
     * @param values - Данные для записи в модель
     * @protected
     */
    protected async $create(values: CreationAttributes<M>): Promise<M> {
        const model = await this.model.create(values)
        this.set(model[this.key], model)
        return model
    }

    /**
     * Создать много объектов в модель и записать в кэш
     * @param values - Массив данных для записи в модель
     * @param onDuplicateKeysUpdate - Данные для обновления если запись существвует
     * @protected
     */
    protected async $createMany(
        values: CreationAttributes<M>[],
        onDuplicateKeysUpdate?: (keyof Attributes<M>)[]
    ): Promise<M[]> {
        const models = await this.model.bulkCreate(values, {updateOnDuplicate: onDuplicateKeysUpdate})
        models.map(model => this.set(model[this.key], model))
        return models
    }

    /**
     * Обновить модель и кэш
     * @param model - Модель
     * @param dto - Данные для обновления модели
     * @protected
     */
    protected $update(model: M, dto: UpdateAttributes<M>): Promise<M> {
        for (const key of Object.keys(dto)) model[key] = dto[key]
        return model.save()
    }

    /**
     * Создать или обновить модель и кэш
     * @param model - Модель
     * @param createOrUpdateDto - Данные для записи или обновления модели
     * @param updateDto - Данные для обновления модели
     * @protected
     */
    protected async $createOrUpdate(
        model: M,
        createOrUpdateDto: CreationAttributes<M> & UpdateAttributes<M>,
        updateDto?: UpdateAttributes<M>
    ): Promise<M> {
        if (!updateDto) updateDto = createOrUpdateDto
        if (model) return this.$update(model, updateDto)
        return this.$create(createOrUpdateDto)
    }

    /**
     * Найти модель в кэше по ключу
     * @param modelId - Ключ
     * @protected
     */
    protected $findOne(modelId: K): M | undefined {
        return this.collection.get(modelId)
    }

    /**
     * Удалить модель из базы данных и из кэша
     * @param modelId - Ключ
     * @param where - По каким ключам удалять из базы
     * @protected
     */
    protected async $remove(modelId: K, where: WhereOptions<Attributes<M>>): Promise<boolean> {
        await this.model.destroy({where})
        return this.collection.delete(modelId)
    }
}