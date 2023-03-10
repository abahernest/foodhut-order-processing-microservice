import { IsAlpha, IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { CreateOrderRequest, UpdateOrderRequest } from '../proto/order.pb';
import { OrderStatus } from '../entity/order.entity';

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsString()
  @IsAlpha()
  public name: string;

  @IsString()
  public address: string;
}

export class UpdateOrderRequestDto implements UpdateOrderRequest {
  @IsString()
  @IsUUID()
  id: string;

  @IsEnum(OrderStatus)
  status?: string;

  @IsString()
  address?: string;

}

export class UpdateOrderResponseDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsEnum(OrderStatus)
  status: string;

  @IsString()
  address: string;

  @IsBoolean()
  dispatched: boolean

}