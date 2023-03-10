import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { ORDER_SERVICE_NAME, CreateOrderResponse, UpdateOrderResponse } from './proto/order.pb';
import { CreateOrderRequestDto, UpdateOrderRequestDto, UpdateOrderResponseDto } from './dto/order.dto';
import { CronService } from './clock';
import { OrderStatus } from './entity/order.entity';

@Controller('order')
export class OrderController {
	@Inject(OrderService)
	private readonly service: OrderService;

	@Inject(CronService)
	private readonly cronService: CronService;

	@GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
	private async createOrder( data: CreateOrderRequestDto ): Promise<CreateOrderResponse> {

		const order = await this.service.createOrder(data);

		// simulated cpu intensive process running in a process queue
		this.cronService.changeOrderStatusToProcessing( { id: order.id });
		this.cronService.changeOrderStatusToCompleted( { id: order.id });

		return order;
	}

	@GrpcMethod(ORDER_SERVICE_NAME, 'UpdateOrder')
	private async updateOrder( data: UpdateOrderRequestDto ): Promise<UpdateOrderResponse> {
		const order = await this.service.findOrderById(data.id);

		if (!order) {
			const emptyOrder: UpdateOrderResponse = {
				code: 400,
				message: 'resource not found',
			};
			return emptyOrder;
		}

		if (order.status == OrderStatus.COMPLETED || order.dispatched == true) {
			const emptyOrder: UpdateOrderResponse = {
				code: 400,
				message: 'cannot change address at this time',
			};
			return emptyOrder;
		}

		return {
			code: 200,
			message: 'success',
			data: await this.service.updateOrderAddress(data)
		}
		};
	}

