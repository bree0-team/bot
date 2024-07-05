import _ from 'lodash'

export const QA_SELECT: string = 'bSx7NH-3Qs2nV-?n8iJg-MtyUx|'
export const QA_CHANNEL: string = 'PmXJ8k-xdm4)}-Ga9XTg-5ZsTRt'
export const QA_CREATE: string = 'u3T(gU-sk8m8u-NSyrDx-UPY7T*'
export const QA_DELETE: string = 'UiHJte-<CBE_4-CR99az-QkY7GR'
export enum QaSelectValues {
    Interface = 'interface',
    Text = 'text',
    Resp = 'resp',
    AddsResp = 'adds_resp',
    Roles = 'roles'
}
export const QaSelectValuesSorted: string[] = _.values(QaSelectValues)