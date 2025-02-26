import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_De3AEtjn.mjs';
export { renderers } from '../renderers.mjs';

const $$Logout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "Cerrando sesi\xF3n", "description": "Cierre de sesi\xF3n en progreso", "pubDate": /* @__PURE__ */ new Date() }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LogoutComponent", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/logout.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/logout.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
