import { IsAlpha, IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { CreateOrderRequest, UpdateOrderRequest, UpdateOrderResponse } from '../proto/order.pb';
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

class UpdateOrderResponseDto_data {
  @IsString()
  @IsUUID()
  id?: string;

  @IsEnum(OrderStatus)
  status?: string;

  @IsString()
  address?: string;

  @IsBoolean()
  dispatched?: boolean
}
export class UpdateOrderResponseDto{

  code: number;

  message: string;

  data?: UpdateOrderResponseDto_data;

}



export class FindOrderResponseDto {
  id: string;

  name: string

  status: string;

  address: string;

  dispatched: boolean;

  createdAt: Date;

  updatedAt: Date;

}
