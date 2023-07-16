import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import DiscountsRepository from '$lib/repositories/DiscountsRepository';

export const GET: RequestHandler = async () => {
	const discounts = await DiscountsRepository.findAll();
	return json(discounts);
};
