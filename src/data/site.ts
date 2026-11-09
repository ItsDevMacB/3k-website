// Contenido central del sitio. Edita aquí textos, proyectos y contacto.
import type { ImageMetadata } from 'astro';
import sociogramaImg from '../assets/projects/Sociograma UTP/MainScreen.png';
import sociogramaIcon from '../assets/projects/Sociograma UTP/logo-comite-icon.png';
// Bordicrea y Egresados siguen con imagen provisional hasta tener capturas reales.
import bordicreaImg from '../assets/projects/bordicrea.jpg';
import egresadosImg from '../assets/projects/egresados.jpg';

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

export type ProjectShot = {
	src: ImageMetadata;
	alt: string;
	// Nombre corto de la pantalla (miniaturas del visor).
	label?: string;
};

export type Project = {
	name: string;
	file: string;
	tags: string;
	description: string;
	// Color del disquete.
	tone: 'orange' | 'stone' | 'lime';
	// Captura principal: la que se ve en el monitor.
	image: ImageMetadata;
	imageAlt: string;
	// Capturas del visor a pantalla completa; sin ellas se usa solo la principal.
	gallery?: ProjectShot[];
	// Sitio publicado; agrega el enlace «Ver sitio» en el visor.
	url?: string;
	// Ícono de la barra 3K_OS; sin él se muestra el cuadro naranja genérico.
	icon?: ImageMetadata;
};

// El primer proyecto es el que está en la unidad al cargar la página.
export const projects: Project[] = [
	{
		name: 'Sociograma UTP',
		file: 'sociograma.exe',
		tags: 'Sistema web / Educación',
		description:
			'Sistema para el Comité de Tutorías de la Universidad Tecnológica de Puebla que registra cómo se relacionan los alumnos de cada grupo y genera su sociograma.',
		tone: 'orange',
		image: sociogramaImg,
		icon: sociogramaIcon,
		imageAlt:
			'Pantalla de inicio de sesión de Sociograma UTP: escudo de la universidad sobre fondo verde y formulario con matrícula, contraseña y captcha.',
	},
	{
		name: 'App Egresados',
		file: 'egresados.app',
		tags: 'Web app / Producto',
		description: 'Plataforma para conectar y dar seguimiento a la comunidad de egresados.',
		tone: 'stone',
		image: egresadosImg,
		imageAlt: 'Imagen provisional del proyecto App Egresados.',
	},
	{
		name: 'Bordicrea',
		file: 'bordicrea.exe',
		tags: 'E-commerce / Diseño web',
		description:
			'Sitio comercial y catálogo para una microempresa de bordados personalizados, con cotización directa por WhatsApp.',
		tone: 'lime',
		image: bordicreaImg,
		imageAlt: 'Imagen provisional del proyecto Bordicrea.',
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
	{
		step: 'Descubrir',
		body: 'Entendemos tu negocio, tu público y el objetivo real antes de mover un pixel.',
		icon: '◎',
	},
	{ step: 'Diseñar', body: 'Definimos dirección, jerarquía e interacción en un prototipo editable.', icon: '✦' },
	{
		step: 'Construir',
		body: 'Convertimos el diseño aprobado en un producto responsivo y fácil de mantener.',
		icon: '</>',
	},
	{ step: 'Lanzar', body: 'QA, despliegue y los detalles necesarios para salir al mundo real.', icon: '↗' },
];

export const team = [
	{ initial: 'M', name: 'Mauricio', role: 'Líder del estudio', stat: 'STR 99', tone: 'orange' },
	{ initial: 'B', name: 'Brandon', role: 'Diseño', stat: 'ART 99', tone: 'lime' },
	{ initial: 'O', name: 'Omar', role: 'Desarrollo', stat: 'DEV 99', tone: 'cream' },
] as const;
