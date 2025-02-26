import { b as createAstro, c as createComponent, m as maybeRenderHead, f as addAttribute, t as spreadAttributes, e as renderSlot, a as renderTemplate } from './astro/server_DzZFFnkJ.mjs';
/* empty css                                                                  */
import 'clsx';

const $$Astro = createAstro("https://front.yourmetrics.cl/");
const $$HeaderLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const pathname = Astro2.url.pathname.replace("/", "");
  const subpath = pathname.match(/[^\/]+/g);
  const isActive = href === pathname || href === "/" + (subpath?.[0] || "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([className, { active: isActive }], "class:list")}${spreadAttributes(props)} data-astro-cid-eimmu3lg> ${renderSlot($$result, $$slots["default"])} </a> `;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/components/HeaderLink.astro", void 0);

export { $$HeaderLink as $ };
