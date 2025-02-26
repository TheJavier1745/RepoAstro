import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_De3AEtjn.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "", "description": "Formulario de inicio de sesi\xF3n", "pubDate": /* @__PURE__ */ new Date() }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginComponent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/login.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "App", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/_app.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/login.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
