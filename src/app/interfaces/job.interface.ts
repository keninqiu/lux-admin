import { Entity } from './entity.interface';
export interface Job extends Entity {
    name: string,
    category: string
}
