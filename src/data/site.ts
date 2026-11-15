// Contenido central del sitio. Edita aquí textos, proyectos y contacto.
import type { ImageMetadata } from 'astro';
// Cada proyecto tiene su carpeta en assets/projects: MainScreen (captura principal), Screen2 y Screen3,
// y logo-icon (versión ligera de su Logo, que en SVG trae un PNG incrustado y pesa demasiado).
// Las capturas con datos personales se usan en su copia pixelada (*-public.png); los originales no se versionan.
import sociogramaImg from '../assets/projects/Sociograma UTP/MainScreen.png';
import sociogramaShot2 from '../assets/projects/Sociograma UTP/Screen2-public.png';
import sociogramaShot3 from '../assets/projects/Sociograma UTP/Screen3-public.png';
import sociogramaIcon from '../assets/projects/Sociograma UTP/logo-icon.png';
import egresadosImg from '../assets/projects/AppEgresados/MainScreen.png';
import egresadosShot2 from '../assets/projects/AppEgresados/Screen2-public.png';
import egresadosShot3 from '../assets/projects/AppEgresados/Screen3-public.png';
import egresadosIcon from '../assets/projects/AppEgresados/logo-icon.png';
import bordicreaImg from '../assets/projects/Bordicrea/MainScreen.png';
import bordicreaShot2 from '../assets/projects/Bordicrea/Screen2.png';
import bordicreaShot3 from '../assets/projects/Bordicrea/Screen3.png';
// Solo el abanico del logo: en la etiqueta del cartucho el logo completo queda ilegible.
import bordicreaIcon from '../assets/projects/Bordicrea/logo-mark.png';

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
	// Color del cartucho.
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
		gallery: [
			{
				src: sociogramaImg,
				alt: 'Pantalla de inicio de sesión de Sociograma UTP: escudo de la universidad sobre fondo verde y formulario con matrícula, contraseña y captcha.',
				label: 'Inicio de sesión',
			},
			{
				src: sociogramaShot2,
				alt: 'Panel del grupo: sociograma con las relaciones de aceptación y rechazo entre alumnos, avance de respuestas y clasificación con los nombres pixelados.',
				label: 'Panel del grupo',
			},
			{
				src: sociogramaShot3,
				alt: 'Vista previa de la encuesta sociométrica con los logos de la UTP y del Comité de Tutorías y las instrucciones para elegir a tres compañeros.',
				label: 'Encuesta',
			},
		],
	},
	{
		name: 'App Egresados',
		file: 'egresados.app',
		tags: 'Web app / Producto',
		description: 'Plataforma para conectar y dar seguimiento a la comunidad de egresados.',
		tone: 'stone',
		image: egresadosImg,
		icon: egresadosIcon,
		imageAlt:
			'Pantalla de inicio de sesión del Sistema de Egresados UTP: panel guinda con el escudo de la universidad y formulario de usuario y contraseña.',
		gallery: [
			{
				src: egresadosImg,
				alt: 'Pantalla de inicio de sesión del Sistema de Egresados UTP: panel guinda con el escudo de la universidad y formulario de usuario y contraseña.',
				label: 'Inicio de sesión',
			},
			{
				src: egresadosShot2,
				alt: 'Panel de inicio del egresado: resumen de ofertas, aplicaciones y avance del perfil, con accesos rápidos.',
				label: 'Panel del egresado',
			},
			{
				src: egresadosShot3,
				alt: 'Sección «Mis postulaciones»: contadores por estado y una vacante de desarrollador web jr enviada.',
				label: 'Postulaciones',
			},
		],
	},
	{
		name: 'Bordicrea',
		file: 'bordicrea.exe',
		tags: 'E-commerce / Diseño web',
		description:
			'Sitio comercial y catálogo para una microempresa de bordados personalizados, con cotización directa por WhatsApp.',
		tone: 'lime',
		image: bordicreaImg,
		icon: bordicreaIcon,
		imageAlt:
			'Página de inicio de Bordicrea: titular «Bordados personalizados con calidad y precisión», botón para cotizar por WhatsApp y fotos de prendas bordadas.',
		gallery: [
			{
				src: bordicreaImg,
				alt: 'Página de inicio de Bordicrea: titular «Bordados personalizados con calidad y precisión», botón para cotizar por WhatsApp y fotos de prendas bordadas.',
				label: 'Inicio',
			},
			{
				src: bordicreaShot2,
				alt: 'Sección «Prendas listas para llevar tu identidad»: tarjetas de playeras, polos y gorras bordadas.',
				label: 'Productos',
			},
			{
				src: bordicreaShot3,
				alt: 'Sección para cotizar: «Te ayudamos a definir tu bordado sin complicaciones», con los datos que se piden y el botón «Enviar mi idea».',
				label: 'Cotización',
			},
		],
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
