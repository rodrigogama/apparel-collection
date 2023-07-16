import { error, json } from '@sveltejs/kit';
import ProductsRepository from '$lib/repositories/ProductsRepository';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { productId } = params;
	const product = await ProductsRepository.findById(productId);

	if (!product) {
		throw error(404);
	}

	return json(product);
};
