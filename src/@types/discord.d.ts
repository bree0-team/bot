import {Collection} from 'discord.js'
import {ITranslate, LocalizationManager} from '../services/i18n.js'
import {InteractionHandler} from '../handlers/interaction.js'
import {Command, CommandName} from '../builders/slash.js'
import {CustomId} from '../types/base.type.js'

declare module "discord.js" {
    export interface Client {
        commands: Collection<CommandName, Command>
        interactions: Collection<CustomId, InteractionHandler>
        lang: LocalizationManager
    }
    export interface ChatInputCommandInteraction {
        t: ITranslate
    }
    export interface AutocompleteInteraction {
        t: ITranslate
    }
    export interface ButtonInteraction {
        t: ITranslate
    }
    export interface SelectMenuInteraction {
        t: ITranslate
    }
    export interface UserSelectMenuInteraction {
        t: ITranslate
    }
    export interface RoleSelectMenuInteraction {
        t: ITranslate
    }
    export interface MentionableSelectMenuInteraction {
        t: ITranslate
    }
    export interface ChannelSelectMenuInteraction {
        t: ITranslate
    }
    export interface ModalSubmitInteraction {
        t: ITranslate
    }
    export interface MessageContextMenuCommandInteraction {
        t: ITranslate
    }
    export interface UserContextMenuCommandInteraction {
        t: ITranslate
    }
}