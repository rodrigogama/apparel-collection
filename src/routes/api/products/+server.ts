import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import ProductsRepository from '$lib/repositories/ProductsRepository';

export const GET: RequestHandler = async () => {
	const products = await ProductsRepository.findAll();
	return json(products);
};
