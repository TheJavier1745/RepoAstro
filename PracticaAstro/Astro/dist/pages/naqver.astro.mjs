import { b as createAstro, c as createComponent, r as renderComponent, d as renderHead, e as renderSlot, f as addAttribute, a as renderTemplate, m as maybeRenderHead, g as renderScript } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_BiE1ie6v.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, description, pubDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-ouamjn2i> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-ouamjn2i": true })}<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body data-astro-cid-ouamjn2i> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ouamjn2i": true })} <main id="main-content" data-astro-cid-ouamjn2i> <div class="content" data-astro-cid-ouamjn2i> ${heroImage && renderTemplate`<img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="hero-image" data-astro-cid-ouamjn2i>`} <div class="date" data-astro-cid-ouamjn2i></div> <div class="prose" data-astro-cid-ouamjn2i> ${renderSlot($$result, $$slots["default"])} <!-- Contenido del blog aquí --> </div> </div> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ouamjn2i": true })} </body></html>`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/layouts/MainLayout.astro", void 0);

const prerender = true;
const $$Naqver = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$MainLayout, { "title": "Consultora AP Ltda", "description": "Soluciones integrales para potenciar tu negocio", "data-astro-cid-fmketegh": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero" data-astro-cid-fmketegh> <div class="hero-content" data-astro-cid-fmketegh> <img src="../utilitarios/logo_Cuadrado-min.jpg" alt="Logo de Consultora AP Ltda" class="hero-logo" data-astro-cid-fmketegh> <h1 class="hero-title" data-astro-cid-fmketegh>Bienvenido a Consultora AP Ltda</h1> <p class="hero-subtitle" data-astro-cid-fmketegh>
Soluciones integrales para potenciar tu negocio.
</p> <a href="#servicios" class="btn-primary scroll-btn" data-astro-cid-fmketegh>Conoce nuestros servicios</a> </div> </section>  <section class="about" data-astro-cid-fmketegh> <div class="about-content" data-astro-cid-fmketegh> <h2 class="about-title" data-astro-cid-fmketegh>Quiénes Somos</h2> <p data-astro-cid-fmketegh>
En Consultora AP Ltda, contamos con un equipo de expertos dedicados a brindar 
                soluciones personalizadas que se adapten a las necesidades de nuestros clientes.
</p> <a href="/about" class="btn-primary" data-astro-cid-fmketegh>Acerca de Nosotros</a> </div> </section> <section id="servicios" data-astro-cid-fmketegh> <h2 class="section-title" data-astro-cid-fmketegh>Nuestros servicios</h2> <div class="services-container" data-astro-cid-fmketegh> ${renderComponent($$result2, "BotonesComplejos", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-fmketegh": true, "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/botonescomplejos.jsx", "client:component-export": "default" })} </div> </section> <section class="contactanos" data-astro-cid-fmketegh> <h2 class="section-title" data-astro-cid-fmketegh>¿Deseas contar con nuestros servicios?</h2> <p data-astro-cid-fmketegh>
En Consultora AP Ltda, contamos con un equipo de expertos dedicados a brindar soluciones personalizadas.
</p> <div class="btn-container" data-astro-cid-fmketegh> <a href="/contact" class="btn-primary" data-astro-cid-fmketegh>Contáctanos</a> </div> </section>  ${renderScript($$result2, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/naqver.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/naqver.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/naqver.astro";
const $$url = "/naqver";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Naqver,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
