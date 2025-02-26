import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_DIIna-4K.mjs';
/* empty css                                               */
export { renderers } from '../renderers.mjs';

const $$AdministrarUsuarios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Panel de Administraci\xF3n", "pubDate": /* @__PURE__ */ new Date(), "data-astro-cid-txekuzsp": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UsuariosAdminPage", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-txekuzsp": true, "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/TablaAdministracionUsuarios.jsx", "client:component-export": "default" })} ` })} `;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/administrarUsuarios.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/administrarUsuarios.astro";
const $$url = "/administrarUsuarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AdministrarUsuarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
