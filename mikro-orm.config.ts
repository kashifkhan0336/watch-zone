import { LoadStrategy } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';


export default defineConfig({
    host: 'localhost',
    port: 5432,
    user: 'kashifkhan',
    password: '123',
    dbName: 'watchzone',
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: true,
    loadStrategy: LoadStrategy.JOINED,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    // @ts-expect-error nestjs adapter option
    registerRequestContext: false,
    extensions: [Migrator, EntityGenerator, SeedManager],
});