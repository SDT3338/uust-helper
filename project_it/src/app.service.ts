import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lost } from './entities/lost.entity.js';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Lost)
    private lostsRepository: Repository<Lost>,
  ) {}
  async getLosts(page: number = 1, count: number = 10) {
    return await this.lostsRepository.find({
      skip: (page - 1) * count,
      take: count,
    });
  }
  async getLostById(id: number) {
    const lost = await this.lostsRepository.findOneBy({ id });
    if (!lost) {
      throw new NotFoundException({ error: `Lost with id ${id} not found` });
    }
    return {
      error: false,
      ...lost,
    };
  }
  async createLost(data: {
    description: string;
    phone: string;
    photo: string;
  }) {
    const newLost = this.lostsRepository.create(data);
    return await this.lostsRepository.save(newLost);
  }
}
