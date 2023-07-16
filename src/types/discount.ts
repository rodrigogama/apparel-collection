import type { Product } from './product';

export interface BaseDiscount {
	id: string;
	name: string;
	eligibleProducts: Product['id'][];
}

export interface BuyTwoGetOneFreeDiscount extends BaseDiscount {
	id: 'BUY_TWO_GET_ONE_FREE';
}

export interface BuyThreeOrMoreGet25Dto extends BaseDiscount {
	id: 'BUY_THREE_OR_MORE_25DTO';
	bulkQuantity: number;
	bulkDiscount: number;
}

export type ProductDiscount = BaseDiscount | BuyTwoGetOneFreeDiscount | BuyThreeOrMoreGet25Dto;
