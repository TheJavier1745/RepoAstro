import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_De3AEtjn.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "Sobre Nosotros", "description": "Conoce m\xE1s sobre Consultora AP Ltda", "pubDate": /* @__PURE__ */ new Date(), "heroImage": "../utilitarios/blog6a.jpg", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p data-astro-cid-kh7btl4r>
En Consultora AP Ltda, nos especializamos en ofrecer soluciones estratégicas para empresas que buscan mejorar sus procesos y alcanzar sus metas. Contamos con más de 10 años de experiencia trabajando con organizaciones de diversos sectores, brindando un enfoque personalizado y adaptado a las necesidades únicas de cada cliente.
</p> <p data-astro-cid-kh7btl4r>
Nuestro equipo está compuesto por profesionales altamente calificados en áreas como consultoría empresarial, gestión financiera y capacitación. Nos esforzamos por construir relaciones sólidas con nuestros clientes basadas en confianza, excelencia y resultados comprobados.
</p> <p data-astro-cid-kh7btl4r>
Creemos en la innovación y la mejora continua como pilares fundamentales para el éxito empresarial. Por ello, utilizamos las herramientas y metodologías más avanzadas para garantizar que nuestros clientes obtengan el máximo valor de nuestros servicios.
</p> <p data-astro-cid-kh7btl4r>
Nuestro compromiso es ser socios estratégicos de nuestros clientes, acompañándolos en cada paso hacia el éxito y garantizando resultados que superen sus expectativas.
</p>  ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/about.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
