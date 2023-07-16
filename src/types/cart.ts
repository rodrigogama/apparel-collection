import type { Product } from './product';

export interface CartItem extends Product {
	quantity: number;
	total: number;
	totalWithDiscount: number;
}

export interface CartTotal {
	totalAmount: number;
	totalAmountWithDiscount: number;
}

export interface CartDiscount {
	id: string;
	description: string;
	totalAmount: number;
}

export interface CartState {
	items: Map<string, CartItem>;
}
