/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#7350FF',
					dark: '#6848e6'
				},
				body: {
					primary: {
						DEFAULT: '#1A1A38',
						dark: '#212240'
					},
					secondary: {
						DEFAULT: '#62628A'
					}
				}
			},
			fontFamily: {
				sans: ['"Avenir"', 'sans-serif']
			},
			fontSize: {
				xxs: '0.625rem', // 10px
				sm: '0.813rem' // 13px
			},
			letterSpacing: {
				tight: ' -0.01em'
			}
		}
	},
	plugins: []
};
