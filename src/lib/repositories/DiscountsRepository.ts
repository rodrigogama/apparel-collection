import { discounts } from '$lib/data/product-discount.json';
import {
	getBuyThreeOrMoreGet25DtoTotalPrice,
	getBuyTwoGetOneFreeTotalPrice,
	isBuyThreeOrMoreGet25Dto,
	isBuyTwoGetOneFree
} from '$lib/utils/discounts';
import type { ProductDiscount } from '../../types/discount';
import type { Product } from '../../types/product';

class DiscountsRepository {
	findAll(): ProductDiscount[] {
		return discounts;
	}

	findById(id: string): ProductDiscount | undefined {
		return discounts.find((discount) => discount.id.toLocaleLowerCase() === id.toLowerCase());
	}

	findByProductId(productId: Product['id']): ProductDiscount | undefined {
		return discounts.find((discount) => discount.eligibleProducts.includes(productId));
	}

	calculate(product: Product, quantity: number): number {
		const discount = this.findByProductId(product.id);

		if (!discount) {
			return product.price * quantity;
		}

		if (isBuyTwoGetOneFree(discount)) {
			return getBuyTwoGetOneFreeTotalPrice(product, quantity);
		}

		if (isBuyThreeOrMoreGet25Dto(discount)) {
			return getBuyThreeOrMoreGet25DtoTotalPrice(product, quantity, discount);
		}

		return product.price * quantity;
	}
}

export default new DiscountsRepository();
