import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_De3AEtjn.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "Cont\xE1ctanos", "description": "P\xE1gina de contacto", "pubDate": /* @__PURE__ */ new Date() }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h5>Si deseas contratar nuestro servicios rellena este formulario</h5> <br> ${renderComponent($$result2, "Formulario", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/formulario.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/contact.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
