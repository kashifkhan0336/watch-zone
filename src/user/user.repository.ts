import { EntityRepository } from "@mikro-orm/postgresql";
import { UserEntity } from './user.entity';

export class UserRepository extends EntityRepository<UserEntity>{
    
}