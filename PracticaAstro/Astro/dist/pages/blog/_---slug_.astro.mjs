import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DzZFFnkJ.mjs';
import 'kleur/colors';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_Bn9Pw-gZ.mjs';
import { $ as $$BlogPost } from '../../chunks/BlogPost_De3AEtjn.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://front.yourmetrics.cl/");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post
  }));
}
const prerender = true;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { ...post.data }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/blog/[...slug].astro", void 0);

const $$file = "C:/Users/jenni/Documents/GitHub/RepoAstro/PracticaAstro/Astro/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
