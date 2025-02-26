import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_De3AEtjn.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$AgregarUsuario = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AgregarUsuario;
  const token = Astro2.cookies.get("token");
  if (!token) {
    Astro2.redirect("/login");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "Agregar un administrador", "description": "Administrador", "pubDate": /* @__PURE__ */ new Date() }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h5>Indique los datos del usuario al que quiere agregar:</h5> <br> ${renderComponent($$result2, "FormularioAgregarAdmin", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/formularioAgregarAdmin.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/agregarUsuario.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/agregarUsuario.astro";
const $$url = "/agregarUsuario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AgregarUsuario,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
