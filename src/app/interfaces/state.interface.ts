import { Entity } from './entity.interface';
export interface State extends Entity {
    name: string,
    code: string,
    country: string
}
