// Contenido central del sitio. Edita aquí textos, proyectos y contacto.
import type { ImageMetadata } from 'astro';
import bordicreaImg from '../assets/projects/bordicrea.jpg';
import egresadosImg from '../assets/projects/egresados.jpg';
import studioImg from '../assets/projects/3k-studio.jpg';
import mathmassImg from '../assets/projects/mathmass.jpg';

export const contact = {
	// TODO: reemplazar con el número real de WhatsApp Business (formato internacional, sin "+").
	whatsapp: '520000000000',
	// TODO: reemplazar con el correo real del estudio.
	email: 'hola@3kstudio.mx',
	location: 'Puebla, MX',
};

export const whatsappLink = (message = 'Hola 3K, quiero iniciar un proyecto.') =>
	`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const socials = [
	{ label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
	{ label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
	{ label: 'TikTok', href: 'https://tiktok.com/', icon: 'tiktok' },
] as const;

export const nav = [
	{ label: 'Trabajo', href: '#trabajo' },
	{ label: 'Servicios', href: '#servicios' },
	{ label: 'Proceso', href: '#proceso' },
	{ label: 'Equipo', href: '#equipo' },
];

export const marquee = [
	'Desarrollo web',
	'E-commerce',
	'Sistemas a medida',
	'UI / UX',
	'Automatización',
	'Experiencias digitales',
];

export type Project = {
	name: string;
	file: string;
	tags: string;
	description: string;
	tone: 'orange' | 'stone' | 'lime' | 'ink';
	status: string;
	image: ImageMetadata;
};

export const projects: Project[] = [
	{
		name: 'Bordicrea',
		file: 'bordicrea.exe',
		tags: 'E-commerce / Web Design',
		description:
			'Sitio comercial y catálogo para una microempresa de bordados personalizados, con cotización directa por WhatsApp.',
		tone: 'orange',
		status: 'Caso de estudio',
		image: bordicreaImg,
	},
	{
		name: 'App Egresados',
		file: 'egresados.app',
		tags: 'Web App / Producto',
		description: 'Plataforma para conectar y dar seguimiento a la comunidad de egresados.',
		tone: 'stone',
		status: 'Web App',
		image: egresadosImg,
	},
	{
		name: '3K Studio',
		file: '3k_studio.sys',
		tags: 'Marca / Creative Dev',
		description: 'Nuestra propia identidad: Digital Playground. Retro, pixelado y hecho a mano.',
		tone: 'lime',
		status: 'En línea',
		image: studioImg,
	},
	{
		name: 'MathMass',
		file: 'mathmass.pwa',
		tags: 'PWA / Educación',
		description: 'App progresiva para practicar matemáticas de forma ligera y offline.',
		tone: 'orange',
		status: 'PWA',
		image: mathmassImg,
	},
];

export const services = [
	{
		title: 'Desarrollo web',
		body: 'Landing pages, sitios corporativos e informativos, y páginas a la medida de tu negocio. Rápidos y responsivos.',
		cmd: 'build --web',
	},
	{
		title: 'Catálogos y e-commerce',
		body: 'Catálogos digitales, tiendas en línea, formularios de cotización y pedidos para vender sin fricción.',
		cmd: 'deploy --shop',
	},
	{
		title: 'Sistemas web a medida',
		body: 'Paneles administrativos y sistemas para gestionar clientes, productos, ventas, inventarios o citas.',
		cmd: 'init --system',
	},
	{
		title: 'Automatización e integraciones',
		body: 'Conectamos WhatsApp Business, formularios y herramientas para que tus procesos corran solos.',
		cmd: 'run --auto',
	},
	{
		title: 'Mantenimiento y soporte',
		body: 'Actualizaciones, correcciones, mejoras de rendimiento, despliegues y soporte continuo.',
		cmd: 'patch --care',
	},
];

export const process = [
	{ step: 'Descubrir', body: 'Entendemos tu negocio, tu público y el objetivo real antes de mover un pixel.', icon: '◎' },
	{ step: 'Diseñar', body: 'Definimos dirección, jerarquía e interacción en un prototipo editable.', icon: '✦' },
	{ step: 'Construir', body: 'Convertimos el diseño aprobado en un producto responsivo y fácil de mantener.', icon: '</>' },
	{ step: 'Lanzar', body: 'QA, despliegue y los detalles necesarios para salir al mundo real.', icon: '↗' },
];

export const team = [
	{ initial: 'M', name: 'Mauricio', role: 'Líder del estudio', stat: 'STR 99', tone: 'orange' },
	{ initial: 'B', name: 'Brandon', role: 'Diseño', stat: 'ART 99', tone: 'lime' },
	{ initial: 'O', name: 'Omar', role: 'Desarrollo', stat: 'DEV 99', tone: 'cream' },
] as const;

