import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { CreateOrderRequest, CreateOrderResponse } from './proto/order.pb';

@Injectable()
export class OrderService implements OnModuleInit {
	@InjectRepository(Order)
	private readonly repository: Repository<Order>;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public onModuleInit(): void {}

	public async createOrder( data: CreateOrderRequest ): Promise<CreateOrderResponse> {
		let order: Order = new Order();
		//
		order.name = data.name;
		order.address = data.address;

		order = await this.repository.save(order);


		return {
			id: order.id,
			name: order.name,
			address: order.address,
			status: order.status,
			dispatched: order.dispatched,
			createdAt: String(order.createdAt),
			updatedAt: String(order.updatedAt),
		};
	}
}
