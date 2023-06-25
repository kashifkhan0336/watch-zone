import { Injectable, NestMiddleware } from '@nestjs/common';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MikroOrmMiddleware implements NestMiddleware {
    constructor(private readonly orm: MikroORM) { }

    use(req: Request, res: Response, next: NextFunction) {
        RequestContext.create(this.orm.em, next);
    }
}
