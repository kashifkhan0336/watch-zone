import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly em: EntityManager
    ) { }

    async create(dto: CreateUserDto): Promise<any> {
        console.log(dto)
        const user = new User(dto.email, dto.password);
        await this.em.persistAndFlush(user);
    }
}
