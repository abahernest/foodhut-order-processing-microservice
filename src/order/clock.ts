import { CronJob } from 'cron';
import { Inject, Injectable } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderRequest } from './proto/order.pb';

@Injectable()
export class CronService {
	@Inject(OrderService)
	private readonly service: OrderService;


	public async changeOrderStatusToProcessing( data: UpdateOrderRequest ): CronJob {

		return new CronJob(
			'5 * * * *', // cron job runs 5 mins after it's called
			async () => this.service.updateOrdeStatusToProcessing( data ),
			null,
			true,
			'Africa/Lagos',
		);
	}

	public async changeOrderStatusToCompleted( data: UpdateOrderRequest ): CronJob {

		return new CronJob(
			'10 * * * *', // cron job runs 10 mins after it's called
			async () => this.service.updateOrdeStatusToCompleted( data ),
			null,
			true,
			'Africa/Lagos',
		);
	}

}