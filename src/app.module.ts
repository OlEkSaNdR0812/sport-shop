import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportingGoodsModule } from './sporting_goods/sporting_goods.module';
import { StoreModule } from './store/store.module';
import { SportingGoods } from './entity/sporting_goods';
import { Order } from './entity/order';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';

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
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule { }
