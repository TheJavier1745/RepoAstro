import { b as createAstro, c as createComponent, m as maybeRenderHead, f as addAttribute, a as renderTemplate, r as renderComponent, d as renderHead } from '../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_BiE1ie6v.mjs';
import { S as SITE_DESCRIPTION, a as SITE_TITLE } from '../chunks/consts_C-Ssg0Dv.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bn9Pw-gZ.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  const safeDate = date ? new Date(date) : null;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(safeDate ? safeDate.toISOString() : "", "datetime")}> ${safeDate ? safeDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }) : "Fecha no disponible"} </time>`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/FormattedDate.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return renderTemplate`<html lang="en" data-astro-cid-5tznm7mj> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-5tznm7mj": true })}${renderHead()}</head> <body data-astro-cid-5tznm7mj> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5tznm7mj": true })} <main data-astro-cid-5tznm7mj> <section data-astro-cid-5tznm7mj> <ul data-astro-cid-5tznm7mj> ${posts.map((post) => renderTemplate`<li data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.id}/`, "href")} data-astro-cid-5tznm7mj> <img${addAttribute(720, "width")}${addAttribute(360, "height")}${addAttribute(post.data.heroImage, "src")} alt="" data-astro-cid-5tznm7mj> <h4 class="title" data-astro-cid-5tznm7mj>${post.data.title}</h4> <p class="date" data-astro-cid-5tznm7mj> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "data-astro-cid-5tznm7mj": true })} </p> </a> </li>`)} </ul> </section> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5tznm7mj": true })} </body></html>`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/blog/index.astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
