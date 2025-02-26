import { b as createAstro, c as createComponent, r as renderComponent, d as renderHead, e as renderSlot, a as renderTemplate } from './astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Footer_BiE1ie6v.mjs';
/* empty css                         */

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-2kanml4j> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-2kanml4j": true })}${renderHead()}</head> <body data-astro-cid-2kanml4j> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-2kanml4j": true })} <main id="main-content" data-astro-cid-2kanml4j> <div class="content" data-astro-cid-2kanml4j> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-2kanml4j": true })} </body></html>`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
