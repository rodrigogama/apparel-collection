export const formatCurrency = (value: number, locale = 'es-ES', currency = 'EUR'): string => {
	const fractionDigits = value % 1 === 0 ? 0 : 2;
	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	});

	return formatter.format(value);
};
