import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportingGoodsModule } from './sporting_goods/sporting_goods.module';
import { StoreModule } from './store/store.module';
import { SportingGoods } from './entity/sporting_goods';
import { Order } from './entity/order';
import { User } from './entity/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './google.strategy';
import { RolesGuard } from './auth/roles/guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hv08msa9',
      database: 'sports_shop',
      entities: [User, SportingGoods, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    SportingGoodsModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, RolesGuard],
})
export class AppModule {}
