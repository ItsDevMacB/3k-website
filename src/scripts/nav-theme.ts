type NavTheme = 'light' | 'dark' | 'orange';

/**
 * Cambia data-nav-theme del header según la sección con [data-nav-bg] que pasa bajo el centro del nav.
 * Usa un IntersectionObserver con una banda de 1 px en esa altura: sin listeners de scroll ni lecturas de layout por frame.
 */
export function observeNavTheme(header: HTMLElement) {
	const targets = [...document.querySelectorAll<HTMLElement>('[data-nav-bg]')];
	const row = header.querySelector<HTMLElement>('[data-nav-row]') ?? header;
	const active = new Set<HTMLElement>();
	let observer: IntersectionObserver | undefined;

	const apply = () => {
		// Si hay solapes (dither junto a sección, marquee inclinado), gana el último en orden del documento
		let theme: NavTheme = 'light';
		for (const el of targets) if (active.has(el)) theme = el.dataset.navBg as NavTheme;
		if (header.dataset.navTheme === theme) return;
		header.dataset.navTheme = theme;
	};

	const build = () => {
		observer?.disconnect();
		active.clear();
		// El root del observer es el layout viewport; visualViewport cambia con pinch-zoom y la barra de iOS
		const vh = document.documentElement.clientHeight;
		const r = row.getBoundingClientRect();
		const y = Math.round(r.top + r.height / 2);
		observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active.add(e.target as HTMLElement);
					else active.delete(e.target as HTMLElement);
				}
				apply();
				// Tras el primer cálculo se habilitan las transiciones (evita animar al entrar con #contacto)
				if (!header.hasAttribute('data-nav-ready'))
					requestAnimationFrame(() => header.setAttribute('data-nav-ready', ''));
			},
			{ rootMargin: `-${y}px 0px -${Math.max(0, Math.round(vh - y - 1))}px 0px`, threshold: 0 },
		);
		targets.forEach((el) => observer!.observe(el));
	};

	let t: number | undefined;
	const rebuild = () => {
		clearTimeout(t);
		t = window.setTimeout(build, 150);
	};

	window.addEventListener('resize', rebuild);
	window.addEventListener('orientationchange', rebuild);
	window.visualViewport?.addEventListener('resize', rebuild);
	build();
}
