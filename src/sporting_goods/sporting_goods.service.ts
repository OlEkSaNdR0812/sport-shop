import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportingGoods } from '../entity/sporting_goods'

@Injectable()
export class SportingGoodsService {
  constructor(
    @InjectRepository(SportingGoods)
    private sportingGoodsRepository: Repository<SportingGoods>,
  ) {}

  findAll(): Promise<SportingGoods[]> {
    return this.sportingGoodsRepository.find();
  }

  findOne(id: number): Promise<SportingGoods> {
    return this.sportingGoodsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.sportingGoodsRepository.delete(id);
  }

  async create(sportingGood: SportingGoods): Promise<SportingGoods> {
    return this.sportingGoodsRepository.save(sportingGood);
  }

  async update(id: number, sportingGood: SportingGoods): Promise<void> {
    await this.sportingGoodsRepository.update(id, sportingGood);
  }
}
