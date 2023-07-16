export interface Product {
	id: string;
	code: string;
	name: string;
	description: string;
	price: number;
	assets: {
		imageSrc?: string;
		thumbSrc?: string;
	};
}
