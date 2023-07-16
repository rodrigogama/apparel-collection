import type {
	BaseDiscount,
	BuyThreeOrMoreGet25Dto,
	BuyTwoGetOneFreeDiscount
} from '../../types/discount';
import type { Product } from '../../types/product';

export const isBuyThreeOrMoreGet25Dto = (
	discount: BaseDiscount
): discount is BuyThreeOrMoreGet25Dto => {
	return discount.id === 'BUY_THREE_OR_MORE_25DTO';
};

export const isBuyTwoGetOneFree = (
	discount: BaseDiscount
): discount is BuyTwoGetOneFreeDiscount => {
	return discount.id === 'BUY_TWO_GET_ONE_FREE';
};

export const getBuyTwoGetOneFreeTotalPrice = (product: Product, quantity: number) => {
	if (!quantity) return 0;

	const freeItems = Math.floor(quantity / 3);
	return (quantity - freeItems) * product.price;
};

export const getBuyThreeOrMoreGet25DtoTotalPrice = (
	product: Product,
	quantity: number,
	discount: BuyThreeOrMoreGet25Dto
) => {
	if (discount.bulkQuantity > quantity) return product.price * quantity;

	return product.price * (1 - discount.bulkDiscount) * quantity;
};
