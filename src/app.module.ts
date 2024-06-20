import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportingGoodsModule } from './sporting_goods/sporting_goods.module';
import { StoreModule } from './store/store.module';
import { SportingGoods } from './entity/sporting_goods'
import { Order } from './entity/order';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'sports_shop',
      entities: [SportingGoods, Order],
      synchronize: true,
    }),
    SportingGoodsModule,
    StoreModule,
  ],
})
export class AppModule {}
