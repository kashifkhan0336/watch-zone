import {
    Collection,
    Entity,
    EntityDTO,
    EntityRepositoryType,
    OneToMany,
    PrimaryKey,
    Property,
    BeforeCreate,
    BeforeUpdate,
    Enum
} from "@mikro-orm/core";
import { UserRepository } from "./user.repository";



export enum UserPlan {
    NONE = 'none',
    TRIAL = 'trial',
    BASIC = 'basic',
    PREMIUM = 'premium'
}

@Entity({ customRepository: () => UserRepository })
export class UserEntity {
    [EntityRepositoryType]?: UserRepository

    @PrimaryKey()
    id: number;

    @Property()
    userId: string

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(userId: string) {
        this.userId = userId;
    }
}

