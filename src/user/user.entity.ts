import {
    Collection,
    Entity,
    EntityDTO,
    EntityRepositoryType,
    OneToMany,
    PrimaryKey,
    Property
} from "@mikro-orm/core";
import { UserRepository } from "./user.repository";


@Entity({ customRepository: () => UserRepository })
export class User {
    [EntityRepositoryType]?: UserRepository

    @PrimaryKey()
    id: number;

    @Property({ hidden: true, unique: true, length: 255 })
    email: string;


    @Property({ hidden: true })
    password: string;

    @Property({ default: false })
    isVerified: boolean;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

}