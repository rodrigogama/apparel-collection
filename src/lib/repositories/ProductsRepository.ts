import { products } from '$lib/data/products.json';
import type { Product } from '../../../types/product';

class ProductsRepository {
	findAll(): Product[] {
		return products;
	}

	findById(id: string): Product | undefined {
		return products.find((product) => product.id.toLocaleLowerCase() === id.toLowerCase());
	}
}

export default new ProductsRepository();
