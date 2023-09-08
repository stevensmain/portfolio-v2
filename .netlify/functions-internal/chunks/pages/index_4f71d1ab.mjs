/* empty css                           */import { c as createAstro, b as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderComponent, h as renderSlot, m as maybeRenderHead } from '../astro_29e912bc.mjs';
import 'html-escaper';
import 'clsx';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

const useScrollDirection = ({ initialDirection, thresholdPixels, off } = {}) => {
    const [scrollDir, setScrollDir] = useState(initialDirection);

    useEffect(() => {
        const threshold = thresholdPixels || 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                // We haven't exceeded the threshold
                ticking = false;
                return;
            }

            setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        /**
         * Bind the scroll handler if `off` is set to false.
         * If `off` is set to true reset the scroll direction.
         */
        !off ? window.addEventListener('scroll', onScroll) : setScrollDir(initialDirection);

        return () => window.removeEventListener('scroll', onScroll);
    }, [initialDirection, thresholdPixels, off]);

    return scrollDir;
};

const Logo = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "64",
    height: "64",
    viewBox: "0 0 32 32",
    preserveAspectRatio: "xMidYMid",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("path", { d: "M14.656.427c.8-.453 1.82-.455 2.6 0L29.2 7.16c.747.42 1.247 1.253 1.24 2.114v13.5c.005.897-.544 1.748-1.332 2.16l-11.88 6.702a2.6 2.6 0 0 1-2.639-.073l-3.565-2.06c-.243-.145-.516-.26-.688-.495.152-.204.422-.23.642-.32.496-.158.95-.4 1.406-.656.115-.08.256-.05.366.022l3.04 1.758c.217.125.437-.04.623-.145l11.665-6.583c.144-.07.224-.222.212-.38V9.334c.016-.18-.087-.344-.25-.417L16.19 2.244a.41.41 0 0 0-.465-.001L3.892 8.93c-.16.073-.27.235-.25.415v13.37c-.014.158.07.307.215.375l3.162 1.785c.594.32 1.323.5 1.977.265a1.5 1.5 0 0 0 .971-1.409l.003-13.29c-.014-.197.172-.36.363-.34h1.52c.2-.005.357.207.33.405L12.18 23.88c.001 1.188-.487 2.48-1.586 3.063-1.354.7-3.028.553-4.366-.12l-3.4-1.88c-.8-.4-1.337-1.264-1.332-2.16v-13.5a2.46 2.46 0 0 1 1.282-2.141L14.656.427zM18.1 9.785c1.727-.1 3.576-.066 5.13.785 1.203.652 1.87 2.02 1.892 3.358-.034.18-.222.28-.394.267-.5-.001-1.002.007-1.504-.003-.213.008-.336-.188-.363-.376-.144-.64-.493-1.273-1.095-1.582-.924-.463-1.996-.44-3.004-.43-.736.04-1.527.103-2.15.535-.48.328-.624 1-.453 1.522.16.383.603.506.964.62 2.082.544 4.287.5 6.33 1.207.845.292 1.672.86 1.962 1.745.378 1.186.213 2.604-.63 3.556-.684.784-1.68 1.2-2.675 1.442-1.323.295-2.695.302-4.038.17-1.263-.144-2.577-.476-3.552-1.336-.834-.724-1.24-1.852-1.2-2.94.01-.184.193-.312.37-.297h1.5c.202-.014.35.16.36.35.093.6.322 1.25.854 1.6 1.026.662 2.313.616 3.487.635.973-.043 2.065-.056 2.86-.7.42-.367.543-.98.43-1.508-.123-.446-.6-.653-1-.8-2.055-.65-4.285-.414-6.32-1.15-.826-.292-1.625-.844-1.942-1.693-.443-1.2-.24-2.687.693-3.607.9-.915 2.22-1.268 3.47-1.394z" })
  }
);

const Menu = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navRef = useRef(null);
  const onResize = (e) => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  useEffect(() => {
    if (menuOpen) {
      document.querySelector("body").classList.add("active");
    } else {
      document.querySelector("body").classList.remove("active");
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);
  return /* @__PURE__ */ jsxs("nav", { className: "block md:hidden", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "relative z-10 -mr-3 p-4 border-0 bg-transparent linear duration-200",
        onClick: toggleMenu,
        "aria-label": "Menu",
        children: /* @__PURE__ */ jsx("div", { className: "ham-box", children: /* @__PURE__ */ jsx("div", { className: `ham-box-inner ${menuOpen ? "active" : ""}` }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "aside",
      {
        className: `block fixed top-0 bottom-0 py-20 px-4 w-72 max-w-md h-screen bg-light-navy duration-300 shadow z-9 ease-in ${menuOpen ? "right-0" : "-right-full"}`,
        "aria-hidden": !menuOpen,
        tabIndex: menuOpen ? 1 : -1,
        children: /* @__PURE__ */ jsxs("nav", { ref: navRef, className: "w-full flex flex-col text-slate-400 text-center", children: [
          navLinks && /* @__PURE__ */ jsx("ol", { className: "p-0 m-0 list-none w-full", children: navLinks.map(({ url, name }, i) => /* @__PURE__ */ jsx("li", { className: "relative mt-0 mx-auto mb-6 text-xl", children: /* @__PURE__ */ jsx("a", { href: url, onClick: () => setMenuOpen(false), children: name }) }, i)) }),
          /* @__PURE__ */ jsx("a", { className: "text-slate-400 border-slate-400 border px-4 py-3 rounded duration-200 hover:bg-neutral-800", href: "/resume.pdf", target: "_blank", rel: "noopener noreferrer", children: "Resume" })
        ] })
      }
    )
  ] });
};

const Nav = () => {
  const scrollDirection = useScrollDirection("down");
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navLinks = [
    {
      name: "About",
      url: "/#about"
    },
    {
      name: "Experience",
      url: "/#jobs"
    },
    {
      name: "Projects",
      url: "/#projects"
    },
    {
      name: "Contact",
      url: "/#contact"
    }
  ];
  const ResumeLink = /* @__PURE__ */ jsx("a", { className: "text-slate-400 border-slate-400 border px-4 py-2 rounded duration-200 hover:text-emerald-300 hover:border-esmerald-300 hover:bg-slate-300/20", href: "/resume.pdf", target: "_blank", rel: "noopener noreferrer", children: "Resume" });
  return /* @__PURE__ */ jsxs("header", { className: `fixed top-0 py-4 w-full h-24 flex justify-between px-8 md:px-24 duration-200 ease-in items-center bg-navy z-10 backdrop-blur-md ${scrollDirection === "down" && "-translate-y-24"} ${!scrolledToTop && "shadow-xl"}`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-12 w-12",
        "data-aos": "fade",
        "data-aos-duration": "300",
        "data-aos-easing": "ease-in",
        children: /* @__PURE__ */ jsx("a", { href: "/#hero", "aria-label": "home", children: /* @__PURE__ */ jsx(Logo, {}) })
      }
    ),
    /* @__PURE__ */ jsx(Menu, { navLinks }),
    /* @__PURE__ */ jsx("nav", { className: "hidden md:inline-flex text-slate-400", children: /* @__PURE__ */ jsxs("ol", { className: "flex items-center justify-between gap-8", children: [
      navLinks.map(
        ({ url, name }, i) => /* @__PURE__ */ jsx(
          "li",
          {
            "data-aos": "fade-down",
            "data-aos-duration": "300",
            "data-aos-delay": `${i}00`,
            "data-aos-easing": "ease-in",
            children: /* @__PURE__ */ jsx("a", { className: "pointer text-slate-400 hover:text-emerald-300", href: url, children: `0${i + 1}. ${name}` })
          },
          i
        )
      ),
      /* @__PURE__ */ jsx(
        "li",
        {
          "data-aos": "fade-down",
          "data-aos-duration": "300",
          "data-aos-delay": `${navLinks.length}00`,
          "data-aos-easing": "ease-in",
          children: ResumeLink
        }
      )
    ] }) })
  ] });
};

const $$Astro$9 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><title>${title}</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg">${renderHead()}</head><body>${renderComponent($$result, "Navbar", Nav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Navbar.jsx", "client:component-export": "default" })}${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/layouts/Layout.astro", void 0);

const $$Astro$8 = createAstro();
const $$Code = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Code;
  return renderTemplate`${maybeRenderHead()}<div class="bg-slate-900 bg-opacity-50 backdrop-blur-lg grid p-2 rounded-xl w-full divide-y-[1px] divide-zinc-600 gap-2"><div class="flex justify-between items-center"><div class="flex gap-1"><div class="p-1.5 rounded-full bg-zinc-600 hover:bg-red-400 transition-colors"></div><div class="p-1.5 rounded-full bg-zinc-600 hover:bg-amber-400 transition-colors"></div><div class="p-1.5 rounded-full bg-zinc-600 hover:bg-green-400 transition-colors"></div></div><span class="text-zinc-400 text-sm">/index.js</span><svg stroke="currentColor" fill="#52525b"${addAttribute(0, "stroke-width")} viewBox="0 0 24 24" class="cursor-pointer" id="clipboard" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"></path></svg></div><code id="code"><pre class="inline-table">      <span class="text-blue-400">const welcome = <span class="text-yellow-100"> () </span> =&gt; <span class="text-yellow-100">${"{"}</span><br>  const aboutMe =${" "}<span class="text-yellow-100">${"{"}</span>
      fullname:  <span class="text-yellow-100">'Stivens Carrasquel'</span>,
      age:  <span class="text-sky-300">24</span>,
      languages: <span class="text-yellow-100">[]</span><br><span class="text-yellow-100">${"  }"}</span>
      <br>${"  "}return aboutMe<br><span class="text-yellow-100">${"}"}</span>
      </span>
      <br>welcome<span class="text-yellow-100">()</span>
    </pre></code></div>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/sections/hero/Code.astro", void 0);

const $$Astro$7 = createAstro();
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead()}<section class="relative flex flex-col-reverse justify-center lg:flex-row lg:justify-start lg:items-center h-screen" id="hero"><section class="inline-flex flex-col justify-center gap-3 xl:w-8/12" id="hero"><h2 class="font-extrabold text-slate-300 text-4xl md:text-5xl lg:text-6xl" data-aos="fade-up" data-aos-delay="200">
Stivens Carrasquel
</h2><h3 class="font-extrabold text-slate-400 text-4xl md:text-5xl lg:text-6xl" data-aos="fade-up" data-aos-delay="300">
Software Developer
</h3><p class="text-base text-slate-400 lg:w-8/12" data-aos="fade-up" data-aos-delay="400">
I’m a software engineer specializing in building (and occasionally
            designing) exceptional digital experiences. Currently, I’m focused
            on building accessible, human-centered products at Upstatement.
</p></section><section class="relative hidden place-items-center xl:grid lg:w-4/12 lg:h-full">${renderComponent($$result, "Code", $$Code, {})}</section></section>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Hero.astro", void 0);

const Text = ({ children }) => {
  return /* @__PURE__ */ jsx("p", { className: "text-base text-slate-400", children });
};

const Title = ({
  size = "3xl",
  prevMark = null,
  children
}) => {
  return /* @__PURE__ */ jsxs("h2", { className: "text-2xl text-slate-400 font-base section-title", children: [
    prevMark && prevMark,
    /* @__PURE__ */ jsx("strong", { className: "text-3xl text-slate-300 ml-3 font-bold md:whitespace-nowrap", children })
  ] });
};

const $$Astro$6 = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$About;
  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Eleventy",
    "Node.js",
    "WordPress"
  ];
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col justify-center gap-5 py-12 lg:h-screen" id="about" data-astro-cid-v2cbyr3p>${renderComponent($$result, "Title", Title, { "prevMark": "01.", "data-astro-cid-v2cbyr3p": true }, { "default": ($$result2) => renderTemplate`About Me` })}<div class="flex items-center gap-10 flex-col lg:flex-row" data-astro-cid-v2cbyr3p><div class="flex flex-col gap-3 lg:w-6/12" data-astro-cid-v2cbyr3p>${renderComponent($$result, "Text", Text, { "data-astro-cid-v2cbyr3p": true }, { "default": ($$result2) => renderTemplate`
Hello! My name is Brittany and I enjoy creating things that live on the
        internet. My interest in web development started back in 2012 when
` })}<p class="text-base text-slate-400" data-astro-cid-v2cbyr3p>
Fast-forward to today, and I’ve had the privilege of working at${" "}<a href="https://starry.com/" data-astro-cid-v2cbyr3p>a start-up</a>,${" "}<a href="https://www.apple.com/" data-astro-cid-v2cbyr3p>a huge corporation</a>, and${" "}<a href="https://scout.camd.northeastern.edu/" data-astro-cid-v2cbyr3p>a student-led design studio</a>. My main focus these days is building accessible, inclusive products
        and digital experiences at <a href="https://upstatement.com/" data-astro-cid-v2cbyr3p>Upstatement</a> for a variety of clients.
</p><p class="text-base text-slate-400" data-astro-cid-v2cbyr3p>
Here are a few technologies I’ve been working with recently:
</p><ul class="flex flex-wrap gap-y-3" data-astro-cid-v2cbyr3p>${skills && skills.map((skill, i) => renderTemplate`<li class="w-6/12" data-astro-cid-v2cbyr3p>${skill}</li>`)}</ul></div><div class="h-full grid place-items-center lg:w-6/12" data-astro-cid-v2cbyr3p><div class="w-8/12 h-8/12 relative group rounded-sm ease duration-200" data-astro-cid-v2cbyr3p><img src="/img/steve.jpg" alt="Profile picture" class="w-full h-full" data-astro-cid-v2cbyr3p><div class="w-full h-full z-5 absolute top-4 left-4 -z-10 border-2 border-white rounded-sm ease duration-200 group-hover:top-2 group-hover:left-2" data-astro-cid-v2cbyr3p></div><div class="w-full h-full z-10 img-profile absolute top-0 bg-opacity-60 ease duration-200" data-astro-cid-v2cbyr3p></div></div></div></div></section>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/About.astro", void 0);

const $$Astro$5 = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col justify-center items-center gap-5 mt-36 md:mt-24 mb-32 text-center max-w-xl mx-auto" id="contact"><h2 class="text-slate-300 text-base">04. What’s Next?</h2><h2 class="text-slate-300 text-5xl font-extrabold lg:text-6xl">
Get In Touch
</h2><p class="text-base text-slate-400">
Although I’m not currently looking for any new opportunities, my inbox
        is always open. Whether you have a question or just want to say hi, I’ll
        try my best to get back to you!
</p><a class="text-slate-400 border-slate-400 border px-8 py-4 rounded duration-200 hover:bg-neutral-800" href="mailto:stevensgoldzyzz@gmail.com" target="_blank" rel="noopener noreferrer">
Mail me
</a></section>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Contact.astro", void 0);

const $$Astro$4 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="flex justify-center items-center pb-8"><a href="https://github.com/stevensmain" target="_blank" rel="noreferrer">
Developed by Stivens Carrasquel
</a></footer>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Footer.astro", void 0);

const userRepositories = `{
    viewer { 
      repositories(last:5, privacy:PUBLIC){
        nodes{
          name
          description
          url
          languages(first: 5){
            nodes{
              name
              color
            }
          }
        }
      }
    }
}`;

const External = ({ width = 24, height = 24 }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "icon icon-tabler icon-tabler-external-link",
      width,
      height,
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" }),
        /* @__PURE__ */ jsx("line", { x1: "10", y1: "14", x2: "20", y2: "4" }),
        /* @__PURE__ */ jsx("polyline", { points: "15 4 20 4 20 9" })
      ]
    }
  );
};

const Github = ({ width = 24, height = 24 }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: "icon icon-tabler icon-tabler-brand-github",
      width,
      height,
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
          }
        )
      ]
    }
  );
};

const $$Astro$3 = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Projects;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + "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"
  };
  const repositories = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query: userRepositories })
  }).then((res) => {
    if (!res.ok) {
      console.log("Error: " + res.status);
      throw new Error();
    }
    return res.json();
  }).then((jsonResponse) => jsonResponse.data.viewer.repositories.nodes).then(
    (repos) => repos.map((repo) => ({
      ...repo,
      name: repo.name.replace(/[-_]/g, " ")
    }))
  ).catch((err) => {
    console.log(err);
    return [];
  });
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col justify-center md:h-screen" id="projects" data-astro-cid-amng4zvp>${renderComponent($$result, "Title", Title, { "prevMark": "03.", "data-astro-cid-amng4zvp": true }, { "default": ($$result2) => renderTemplate`Some Things I’ve Built` })}<ul class="repo-list" data-astro-cid-amng4zvp>${repositories.map((repo) => renderTemplate`<li class="duration-200 hover:-translate-y-2" data-astro-cid-amng4zvp><div class="repo-item rounded shadow-lg cursor-pointer" data-astro-cid-amng4zvp><div class="flex w-full gap-2 justify-end" data-astro-cid-amng4zvp><a class="text-slate-400 hover:text-emerald-300"${addAttribute(repo.url, "href")} data-astro-cid-amng4zvp>${renderComponent($$result, "Github", Github, { "width": 24, "height": 24, "data-astro-cid-amng4zvp": true })}</a><a class="text-slate-400 hover:text-emerald-300" href="/" data-astro-cid-amng4zvp>${renderComponent($$result, "External", External, { "width": 24, "height": 24, "data-astro-cid-amng4zvp": true })}</a></div><h2 class="text-2xl font-extrabold text-slate-300" data-astro-cid-amng4zvp>${repo.name}</h2><p data-astro-cid-amng4zvp>${repo.description}</p><ul data-astro-cid-amng4zvp>${repo.languages.nodes.map((language) => renderTemplate`<li data-astro-cid-amng4zvp><p data-astro-cid-amng4zvp>${language.name}</p></li>`)}</ul></div></li>`)}</ul></section>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Projects.astro", void 0);

const LinkedIn = ({ width = 30, height = 30 }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      class: "icon icon-tabler icon-tabler-brand-linkedin",
      width,
      height,
      viewBox: "0 0 24 24",
      "stroke-width": "1.5",
      stroke: "currentColor",
      fill: "none",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }),
        /* @__PURE__ */ jsx("line", { x1: "8", y1: "11", x2: "8", y2: "16" }),
        /* @__PURE__ */ jsx("line", { x1: "8", y1: "8", x2: "8", y2: "8.01" }),
        /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12", y2: "11" }),
        /* @__PURE__ */ jsx("path", { d: "M16 16v-3a2 2 0 0 0 -4 0" })
      ]
    }
  );
};

const $$Astro$2 = createAstro();
const $$Rrss = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Rrss;
  const RRSS = [
    {
      Icon: Github,
      href: "https://github.com/stevensmain"
    },
    {
      Icon: LinkedIn,
      href: "https://www.linkedin.com/in/stivens-carrasquel-a691391b3"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="fixed hidden md:block bottom-0 w-12 left-12 z-10 color-slate-300" data-aos="fade-up" data-aos-delay="1000" id="rrss" data-astro-cid-xuijzsbb><ul class="flex flex-col gap-4 items-center" data-astro-cid-xuijzsbb>${RRSS.map(({ Icon, href }, index) => renderTemplate`<li class="duration-200 hover:text-slate-300 hover:-translate-y-2" data-astro-cid-xuijzsbb><a${addAttribute(href, "href")} data-astro-cid-xuijzsbb>${renderComponent($$result, "Icon", Icon, { "width": 30, "height": 30, "data-astro-cid-xuijzsbb": true })}</a></li>`)}</ul></div>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Rrss.astro", void 0);

const $$Astro$1 = createAstro();
const $$Mail = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Mail;
  return renderTemplate`${maybeRenderHead()}<div class="fixed hidden lg:flex flex-col items-center bottom-0 w-12 right-12 z-10 color-slate-300" data-aos="fade-down" data-aos-delay="1000" id="mail" data-astro-cid-6qxnbnof><a class="duration-200 hover:text-slate-300 hover:-translate-y-2" href="mailto:stevensgoldzyzz@gmail.com" data-astro-cid-6qxnbnof>
stevensgoldzyzz@gmail.com</a></div>`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/Mail.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="px-8 md:px-24 lg:px-36">${renderComponent($$result2, "Hero", $$Hero, {})}${renderComponent($$result2, "About", $$About, {})}${renderComponent($$result2, "Jobs", null, { "client:only": true, "client:component-hydration": "only", "client:component-path": "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/components/sections/Jobs", "client:component-export": "default" })}${renderComponent($$result2, "Projects", $$Projects, {})}${renderComponent($$result2, "Contact", $$Contact, {})}${renderComponent($$result2, "Rrss", $$Rrss, {})}${renderComponent($$result2, "Mail", $$Mail, {})}${renderComponent($$result2, "Footer", $$Footer, {})}</main>` })}`;
}, "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/pages/index.astro", void 0);

const $$file = "C:/Users/Steve/Documents/Steve/personal-projects/portfolio-v1/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
