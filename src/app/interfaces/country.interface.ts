import { Entity } from './entity.interface';
export interface Country extends Entity {
    name: string,
    iso: string,
    currencyCode: string
}
