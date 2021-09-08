import { Entity } from './entity.interface';
export interface City extends Entity {
    name: string,
    code: string,
    state: string
}
