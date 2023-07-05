import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { Media } from './media';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [Media, MediaService]
})
export class MediaModule {}
