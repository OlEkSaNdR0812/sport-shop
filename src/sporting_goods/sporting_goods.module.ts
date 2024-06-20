import { Module } from '@nestjs/common';
import { SportingGoodsController } from './sporting_goods.controller';
import { SportingGoodsService } from './sporting_goods.service';
import { SportingGoods } from '../entity/sporting_goods'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SportingGoods])],
  controllers: [SportingGoodsController],
  providers: [SportingGoodsService]
})
export class SportingGoodsModule {}
