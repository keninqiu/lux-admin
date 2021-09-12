import { Entity } from './entity.interface';
export interface School extends Entity {
    name: string,
    url: string,
    category: string
}