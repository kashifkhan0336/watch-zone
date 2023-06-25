import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { EntityManager, RequestContext } from '@mikro-orm/core';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly em: EntityManager
    ) { }

    async create(userId: string): Promise<any> {
        const User = new UserEntity(userId);
        // const user = new UserEntity(userId)
        // console.log("Message from user service!")
        // await this.em.persistAndFlush(user)
        await RequestContext.createAsync(this.em, async () => {
            const user_ = this.em.create(UserEntity, { userId: userId })
            await this.em.persistAndFlush(user_);
        })

    }
}
