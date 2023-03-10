import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { ORDER_SERVICE_NAME, CreateOrderResponse } from './proto/order.pb';
import { CreateOrderRequestDto } from './dto/order.dto';
import { CronService } from './clock';

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
}
