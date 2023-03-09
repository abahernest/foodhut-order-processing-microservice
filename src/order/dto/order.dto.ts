import { IsAlpha, IsString } from 'class-validator';
import { CreateOrderRequest } from '../proto/order.pb';

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsString()
  @IsAlpha()
  public name: string;

  @IsString()
  public address: string;
}
