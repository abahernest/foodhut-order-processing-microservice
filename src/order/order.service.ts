import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entity/order.entity';
import {
	CreateOrderRequest,
	CreateOrderResponse,
	UpdateOrderRequest,
} from './proto/order.pb';
import { FindOrderResponseDto } from './dto/order.dto';


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

	public async updateOrderAddress( data: UpdateOrderRequest ): Promise<CreateOrderResponse> {
		const { id, address } = data;

		await this.repository.update(id, { address } );

		const order = await this.repository.findOne({
			where: { id },
		});

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

	public async updateOrdeStatusToProcessing( data: UpdateOrderRequest ): Promise<CreateOrderResponse> {
		const { id } = data;

		await this.repository.update(id, { status: OrderStatus.PROCESSING } );

		const order = await this.repository.findOne({
			where: { id },
		});

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

	public async updateOrdeStatusToCompleted( data: UpdateOrderRequest ): Promise<CreateOrderResponse> {
		const { id } = data;

		await this.repository.update(id, { status: OrderStatus.COMPLETED } );

		const order = await this.repository.findOne({
			where: { id },
		});

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

	public async findOrderById( id: string): Promise<FindOrderResponseDto> {

		return await this.repository.findOne({
			where: { id },
		});

	}
}
