import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodeService {
  create(createEpisodeDto: CreateEpisodeDto) {
    return 'This action adds a new episode';
  }

  findAll() {
    return `This action returns all episode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
