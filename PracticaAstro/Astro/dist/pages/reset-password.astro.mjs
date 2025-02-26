import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$ResetPassword = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ResetPassword;
  const { email } = Astro2.request.url.searchParams;
  return renderTemplate`${renderComponent($$result, "Layout", Layout, { "pubDate": /* @__PURE__ */ new Date() }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Restablecer Contraseña</h1> ${renderComponent($$result2, "ResetPasswordForm", null, { "client:only": "react", "email": email, "client:component-hydration": "only", "client:component-path": "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/resetpass.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/reset-password.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/reset-password.astro";
const $$url = "/reset-password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ResetPassword,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
