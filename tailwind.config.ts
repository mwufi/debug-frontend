import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			typography: {
				DEFAULT: {
					css: {
						'max-width': 'none',
						color: 'hsl(var(--foreground))',
						'line-height': '1.5',
						'> *': {
							'margin-top': '0.75em',
							'margin-bottom': '0'
						},
						'h1, h2, h3, h4': {
							'margin-top': '1em',
							'margin-bottom': '0.5em',
							'line-height': '1.3'
						},
						'p': {
							'margin-top': '0.3em',
							'margin-bottom': '0.3em'
						},
						'pre': {
							'margin-top': '0.3em',
							'margin-bottom': '0.3em',
							'padding': '0.5em',
							'background-color': 'hsl(var(--secondary))',
							'border-radius': 'calc(var(--radius) - 2px)',
							'overflow-x': 'auto'
						},
						'code': {
							'background-color': 'hsl(var(--secondary))',
							'border-radius': 'calc(var(--radius) - 4px)',
							'padding': '0.2em 0.4em',
							'font-size': '0.875em'
						},
						'code::before': { content: '""' },
						'code::after': { content: '""' },
						'ul, ol': {
							'margin-top': '0.3em',
							'margin-bottom': '0.3em',
							'padding-left': '1.2em'
						},
						'li': {
							'margin-top': '0.1em',
							'margin-bottom': '0.1em',
							'padding-left': '0.2em'
						},
						'li > p': {
							'margin-top': '0.1em',
							'margin-bottom': '0.1em'
						},
						'blockquote': {
							'margin-top': '0.5em',
							'margin-bottom': '0.5em',
							'padding-left': '1em',
							'border-left': '2px solid hsl(var(--border))',
							'font-style': 'italic',
							'color': 'hsl(var(--muted-foreground))'
						},
						'blockquote p:first-of-type::before': { content: '""' },
						'blockquote p:last-of-type::after': { content: '""' },
						'a': {
							'color': 'hsl(var(--primary))',
							'text-decoration': 'none',
							'font-weight': '500',
							'&:hover': {
								'text-decoration': 'underline'
							}
						},
						'hr': {
							'margin-top': '0.5em',
							'margin-bottom': '0.5em',
							'border-color': 'hsl(var(--border))'
						},
						'table': {
							'margin-top': '0.3em',
							'margin-bottom': '0.3em'
						},
						'thead th': {
							'padding': '0.3em 0.5em',
							'border-bottom': '1px solid hsl(var(--border))'
						},
						'tbody td': {
							'padding': '0.3em 0.5em',
							'border-bottom': '1px solid hsl(var(--border))'
						}
					}
				}
				,
				'sm': {
					css: {
						'h1': {
							'font-size': '1.5em',
							'font-weight': '600',
							'margin-top': '0.5em',
							'margin-bottom': '0.3em'
						},
						'h2': {
							'font-size': '1.25em',
							'font-weight': '600',
							'margin-top': '0.4em',
							'margin-bottom': '0.2em'
						},
						'h3': {
							'font-size': '1.1em',
							'font-weight': '600',
							'margin-top': '0.3em',
							'margin-bottom': '0.2em'
						},
						'h4': {
							'font-size': '1em',
							'font-weight': '600',
							'margin-top': '0.2em',
							'margin-bottom': '0.1em'
						},
						'p': {
							'margin-top': '0.2em',
							'margin-bottom': '0.2em'
						}
					}
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
} satisfies Config;
