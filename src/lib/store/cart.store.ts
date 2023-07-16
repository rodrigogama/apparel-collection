import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CartDiscount, CartItem, CartState, CartTotal } from '../../types/cart';
import type { Product } from '../../types/product';

import DiscountsRepository from '$lib/repositories/DiscountsRepository';

const createCartStore = () => {
	const cart: Writable<CartState> = writable({ items: new Map<string, CartItem>() });

	const getProductTotals = (product: Product, quantity: number) => {
		const total = product.price * quantity;
		const totalWithDiscount = DiscountsRepository.calculate(product, quantity);

		return {
			total,
			totalWithDiscount
		};
	};

	const addToCart = (product: Product) => {
		cart.update((state) => {
			const { id } = product;
			const item = state.items.get(id);

			const currentQuantity = item?.quantity ?? 0;
			const updatedQuantity = currentQuantity + 1;
			const productTotals = getProductTotals(product, updatedQuantity);

			state.items.set(id, {
				...product,
				...productTotals,
				quantity: updatedQuantity
			});
			return state;
		});
	};

	const removeFromCart = (product: Product) => {
		cart.update((state) => {
			const { id } = product;

			if (!state.items.has(id)) return state;

			const { quantity: currentQuantity } = state.items.get(id) as CartItem;

			if (currentQuantity > 1) {
				const updatedQuantity = currentQuantity - 1;
				const productTotals = getProductTotals(product, updatedQuantity);

				state.items.set(id, {
					...product,
					...productTotals,
					quantity: updatedQuantity
				});
			} else {
				state.items.delete(id);
			}

			return state;
		});
	};

	const cartItems = derived(cart, ($cart) => {
		return Array.from($cart.items.values());
	});

	const cartItemsCount = derived(cartItems, ($cartItems) => {
		let count = 0;

		for (const { quantity } of $cartItems) {
			count += quantity;
		}

		return count;
	});

	const cartDiscounts = derived<typeof cartItems, CartDiscount[]>(cartItems, ($cartItems) => {
		const discountsApplied: CartDiscount[] = [];

		$cartItems.forEach((cartItem) => {
			const discount = DiscountsRepository.findByProductId(cartItem.id);

			if (discount) {
				discountsApplied.push({
					id: discount.id,
					description: discount.name,
					totalAmount: cartItem.total - cartItem.totalWithDiscount
				});
			}
		});

		const discounts = discountsApplied.reduce<CartDiscount[]>((acc, curr) => {
			// Find if current discount type is already in the accumulator
			const found = acc.find((discount) => discount.id === curr.id);

			// If it's found, add the current totalAmount to the existing one
			if (found) {
				found.totalAmount += curr.totalAmount;
			} else {
				// If it's not found, add the current discount entry to the accumulator
				acc.push(curr);
			}

			return acc;
		}, []);

		return discounts;
	});

	const cartTotals = derived<typeof cartItems, CartTotal>(cartItems, ($cartItems) => {
		let totalAmount = 0;
		let totalAmountWithDiscount = 0;

		for (const product of $cartItems) {
			totalAmount += product.total;
			totalAmountWithDiscount += product.totalWithDiscount;
		}

		return {
			totalAmount,
			totalAmountWithDiscount
		};
	});

	return {
		cartStore: cart,
		cartItems,
		cartItemsCount,
		cartDiscounts,
		cartTotals,
		addToCart,
		removeFromCart
	};
};

export default createCartStore();
