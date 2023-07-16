import type { ProductDiscount } from '../types/discount';
import type { Product } from '../types/product';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const fetchProducts = fetch('/api/products');
	const fetchDiscounts = fetch('/api/discounts');

	const [productsResponse, discountResponse] = await Promise.all([fetchProducts, fetchDiscounts]);

	const products: Product[] = await productsResponse.json();
	const discounts: ProductDiscount[] = await discountResponse.json();

	const mergedData = products.map((product) => {
		const discount = discounts.find(({ eligibleProducts }) =>
			eligibleProducts.includes(product.id)
		);

		return {
			...product,
			discountName: discount ? discount.name : null
		};
	});

	return {
		products: mergedData
	};
}) satisfies PageLoad;
