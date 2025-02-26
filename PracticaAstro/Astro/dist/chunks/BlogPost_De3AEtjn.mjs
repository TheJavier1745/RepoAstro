import { b as createAstro, c as createComponent, r as renderComponent, d as renderHead, e as renderSlot, f as addAttribute, a as renderTemplate } from './astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Footer_BiE1ie6v.mjs';
/* empty css                         */

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, heroImage } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-bvzihdzo> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-bvzihdzo": true })}<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body data-astro-cid-bvzihdzo> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-bvzihdzo": true })} <main id="main-content" data-astro-cid-bvzihdzo> <div class="content" data-astro-cid-bvzihdzo> ${heroImage && renderTemplate`<img${addAttribute(heroImage, "src")}${addAttribute(title, "alt")} class="hero-image" data-astro-cid-bvzihdzo>`} <div class="title" data-astro-cid-bvzihdzo>${title}</div> <div class="date" data-astro-cid-bvzihdzo> ${pubDate.toLocaleDateString("es-ES")} </div> <div class="prose" data-astro-cid-bvzihdzo> ${renderSlot($$result, $$slots["default"])} <!-- Contenido del blog aquí --> </div> </div> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-bvzihdzo": true })} </body></html>`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/layouts/BlogPost.astro", void 0);

export { $$BlogPost as $ };
