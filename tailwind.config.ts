import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

const config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: ["class"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				alternative: '#0E0E0E',
				studio: '#121212',
				brand: {
					DEFAULT: '#3ecf8e',
					dark: '#32b37a',
				},
				'brand-border': '#3A3A3A',
				'brand-divider': '#2B2B2B',
				'brand-card': '#1C1C1C',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				'spotlight': 'spotlight 2s ease 0.75s 1 forwards',
				'aurora': 'aurora 60s linear infinite',
			},
			keyframes: {
				spotlight: {
					'0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
					'100%': { opacity: 1, transform: 'translate(-50%, -40%) scale(1)' },
				},
				aurora: {
					'0%': { backgroundPosition: '50% 50%, 50% 50%' },
					'100%': { backgroundPosition: '350% 50%, 350% 50%' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		animatePlugin
	],
} satisfies Config;

export default config;