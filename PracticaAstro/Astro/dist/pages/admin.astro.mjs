import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_DIIna-4K.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  const title = "Panel de Administraci\xF3n";
  const description = "Administra usuarios y mensajes de contacto.";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": title, "description": description, "data-astro-cid-2zp6q64z": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminPanel", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-2zp6q64z": true, "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/Admin.jsx", "client:component-export": "default" })} ` })} `;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/admin.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
