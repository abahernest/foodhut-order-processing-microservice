import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { CronService } from './clock';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService, CronService],
})
export class OrderModule {}
