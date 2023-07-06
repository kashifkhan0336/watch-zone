import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService

    ) { }

    async create(userId: string): Promise<any> {
        this.prisma.media.create({ data: { mediaName: "The Dark Knight", movie: {}}})
        return this.prisma.user.create({ data: { userId } })
    }
}
