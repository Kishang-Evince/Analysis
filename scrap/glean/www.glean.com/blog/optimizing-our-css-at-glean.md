---
url: "https://www.glean.com/blog/optimizing-our-css-at-glean"
canonical: "https://www.glean.com/blog/optimizing-our-css-at-glean"
title: "Optimizing our CSS at Glean"
description: "Raymond Carino Vardhman Singh | Inline styles didn’t scale with Glean's growth, so we chose a new solution that optimized performance and developer experience. Know our learning curve."
fetched_at: "2026-09-01T13:26:49.315Z"
---
Last updated Nov 16, 2022.

# Optimizing our CSS at Glean

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Raymond Carino

Engineering



](/authors/raymond-carimo)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Vardhman Singh

Engineering



](/authors/vardhman-singh)

![Optimizing our CSS at Glean](https://cdn.prod.website-files.com/613513981b0efaf850830620/637569c25397b669f7b8e480_CSS%20at%20Glean.jpg)

Listen to article

0:00

0.5x 1x 1.5x 2x

### Table of contents

[

Heading 2

](#)

[

Heading 3

](#)

[

Heading 4

](#)

[

Heading 5

](#)

[

Heading 6

](#)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

Share this article:

Listen to article

0:00

0.5x 1x 1.5x 2x

Back when [Glean](https://www.glean.com) first started, we chose to use inline styles. This did not scale well as we grew, so we decided to survey CSS-in-JS options. [vanilla-extract](https://vanilla-extract.style/), our chosen solution, optimizes performance (zero-runtime overhead) and developer experience at the cost of a slightly steeper learning curve.

Read this if you:

-   Want to learn about performance and developer experience tradeoffs between common, modern CSS frameworks
-   Are interested in trying out zero-runtime CSS-in-JS solutions

{{richtext-banner-component}}

## Our survey of CSS framework options

We started our search for a CSS solution by checking trends and surveys such as [State of CSS](https://2021.stateofcss.com/en-US/technologies/css-in-js/#css_in_js_experience_ranking) (2021). From usage below, we saw that Styled Components and CSS Modules were a close-ish #1 and #2. Note that vanilla-extract’s usage was near the bottom, at 1%. This made sense given its first stable release was in [May 2021](https://github.com/seek-oss/vanilla-extract/commits/%40vanilla-extract/css%401.0.0).

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/6375696ee433915b08cbdc5b_ltUhW5sCjo1wlO0XZjqzcT5T26UC0NMeX1E-uF1WfUaO6slN15EEfLXWqkpL1LxNrqoNditB5VyHltq2JHXdw6Ek6sZJYofyLRhau5wycXQ4hS6ZWbzIsubbOiXFH_3PEbwUh88J2-8xBeMWSVv_ixrMXyPMQYkrsUz5yZa6QCQjf3UJ_Cu3o7RbekvswQ.png)

‍

However, from developer satisfaction, we saw that vanilla-extract was leading, and CSS Modules was a very close second.  

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/6375696e282f46a43455a3bb_CwFL1Kv_p1CXPxVQYdlZKF9dqiCJyQZ4oOSRDc5fGj6kIVwcw2rCkKgBJSuM8TDo_91be-Pqg17mouWSuuHh3NdyV2sKTWY6IXDUzCBN6x9oTFV1Ac2NaM90BSu1TcueMXjWTSlUgYgsOuMw7IFfBAbu2tfA2ilwMrCIDykpKC9dqpgYESGmiy_F9iRQ5A.png)

‍

To tiebreak our 3 leading options of Styled Components, CSS Modules, and vanilla-extract, we read developer blogs to dig into the pros/cons.

## Why we ruled out Styled Components

[Styled Components](https://styled-components.com/) are an opinionated mechanism of packing style properties (unclassed) into a React Component. Our main concern with Styled Components was its runtime overhead. We didn’t run a Styled Components prototype, but [other developers’ notes](https://dev.to/alexsergey/css-modules-vs-css-in-js-who-wins-3n25#cons) were convincing. In short, Styled Components incurs a runtime bundlesize overhead from its loader. Its render, like inline styles, is also blocked until JS execution.

## CSS Modules were promising

[CSS Modules](https://github.com/css-modules/css-modules) are a mechanism of obfuscating CSS classes to hack local scoping into CSS. We liked its philosophical separation of concerns between CSS files and React Component files. Furthermore, CSS Modules transpile down to plain CSS assets, which are:

-   More [parallelizable](https://stackoverflow.com/a/37759508): CSS only blocks render (not parse) whereas JS blocks HTML parsing.
-   Faster for the browser to apply: See the JS styling overhead in this [benchmark](https://stackoverflow.com/questions/42428311/performance-difference-between-javascript-created-inline-styles-and-javascript-c).

However, CSS Modules are not a CSS-in-JS solution, and would require migrating from TS to CSS or a preprocessor.

## Why we chose vanilla-extract

[vanilla-extract](https://vanilla-extract.style/)’s pitch as a best of both worlds (CSS-in-JS and CSS Modules) solution was promising enough to prototype. Recall vanilla-extract is a build time TS to CSS modules preprocessor. It’s also worth noting that vanilla-extract’s author is the co-creator of CSS Modules, which is second to Styled Components in current [usage](https://2021.stateofcss.com/en-US/technologies/css-in-js/#css_in_js_experience_ranking).

We suspect that Styled Components has high usage but [relatively lower satisfaction](https://2021.stateofcss.com/en-US/technologies/css-in-js/#css_in_js_experience_ranking) because it’s easy for smaller-to-medium sized projects to start up (no CSS preprocessor). Whereas CSS Modules and vanilla-extract are a better fit for larger projects due to their performance, file layout, and debuggability benefits.

## vanilla-extract vs. CSS Modules

CSS Modules and vanilla-extract both support zero-runtime overhead. That is, transpiled native CSS lets the browser do what it does best in native code rather than running in JS "user space" which parses much more slowly and gets blocked during load.

However, we believe vanilla-extract’s CSS-in-JS approach is better than CSS Module transpilation because TS integration offers [IDE intellisense](https://code.visualstudio.com/docs/languages/typescript#_intellisense), [Webpack bundle splitting](https://webpack.js.org/guides/code-splitting/), [tree shaking (dead code pruning)](https://webpack.js.org/guides/tree-shaking/), etc. In short: easier refactoring, and better web performance due to minimal asset size.

That said, our reservations about adopting vanilla-extract still hold true. We’ve adopted the project fairly early. For example, Facebook’s CSS-in-JS solution, [Stylex](https://www.infoq.com/news/2021/10/facebook-css-js-stylex/), might open source and become more popular. This concern is somewhat mitigated by Stylex’s similarity. Both transpile TS down to CSS Modules. If push comes to shove, swapping similar solutions might not be terrible. Lastly, from the [linked article](https://www.infoq.com/news/2021/10/facebook-css-js-stylex/), Stylex should have been released in late 2021, but is still not available as of Sep 2022. This may be a signal that Stylex is conceding to vanilla-extract’s open source traction. We measure traction by: increasing adoption measured by [npm downloads](https://www.npmjs.com/package/@vanilla-extract/css), and [Github commits](https://github.com/seek-oss/vanilla-extract/graphs/contributors).

## Migrating from inline styles to vanilla-extract

While we had switched to vanilla-extract for new features, we still had to migrate the existing inline styles in the codebase. This also turned out to be a fairly large refactor, as we had over ~300 files (10K lines of code) to convert to vanilla-extract.  
  
Manually migrating some of the stylesheets we noticed that the effort is fairly mechanical as we’re converting one style of code to another; So we decided to write a codemod to do some heavy lifting.

### Refactoring using codemods

A codemod is a set of transformations to automate changes that would essentially comprise a refactor. The idea is to treat the code as data for another program that would be able to understand its structure and apply specific transforms. Given the right setup, codemods can reduce a ton of time and effort that goes into large scale refactors.  
  
Looking into the implementation, our codemod scripts would do the following for each stylesheet:

#### Step 1. Convert inline style rules to vanilla-extract styles

For each file we had to convert style rules into corresponding vanilla-extract style() declarations. We do use a custom Stylesheet() declaration for our existing inline styles, which is a good starting point for the codemod script. At a high level we’re looking at four separate transformations:  

1.  Find all *Stylesheet()* declarations in the file.
2.  For each *Stylesheet()*, extract each property and expression to create a new variable declaration.  
    For eg: \`container: { …styleRules }\` → \`export const container = style({ ...styleRules })\`
3.  Add an import for \`style\` from vanilla-extract.
4.  Remove the Stylesheet() declaration and import.

‍  

![Product Illustration](https://cdn.prod.website-files.com/613513981b0efaf850830620/672b56ee7cc862130e4a4400_63757f56035c28b8f8a99500_Screen%2520Shot%25202022-11-16%2520at%25204.24.17%2520PM.png)

‍

#### Step 2. Finally, update ‘style’ props to ‘className’ in the JSX components

With the styles transformed, we also had to convert the components that were using these inline styles.  
Locating them was straightforward as most of our components share a naming convention with their styles.

Once the files are located, we’re looking at a few more transformations:

-   Convert **style** JSXAttributes to **className** and reference the transformed styles.
-   Update the default styles import to named imports since we have moved away from a default Stylesheet export above.

####   
Step 3. Add .css.ts to the filename

At this point, both the stylesheet and the component has been transformed, so the only thing left is to rename the file and add .css.ts to the filename.

### Tools

We used [ASTExplorer](https://astexplorer.net/) to explore and visualize the Abstract syntax tree (AST) for the code and figure out where to apply transformations. We also used [JSCodeshift](https://github.com/facebook/jscodeshift) which provides a neat API to apply transformations to the code.

## Vanilla extract in practice

After prototyping, and widely adopting, we realized [classNames for debugging](https://vanilla-extract.style/#:~:text=Generate%20real%C2%A0stylesheets) was our greatest productivity improvement. The React Component tree and DOM tree often differ greatly. A className=$fileName\_$elementClass\_$moduleHash (ex: ProfilePage\_mainPersonCard\_\_1bmv6no1) is far more debuggable than hacking around inline styles’ lack of [sourcemaps](https://css-tricks.com/should-i-use-source-maps-in-production/). For example, we previously [hotloaded](https://github.com/gaearon/react-hot-loader) tracer textNodes each time we needed to map rendered styles to TS source:  
  
<div style={{...inlineStylesToDebug}}> {/\* no sourcemaps \*/}

   Test: is this the div I’m debugging? {/\* tracer textNode \*/}

   <SomeComponent />

 </div>

The costs of adopting vanilla-extract were one-time:

-   There’s a learning curve to adopting classNames. Ex: [arbitrary className specificity resolution](https://stackoverflow.com/a/13539513). Developers needed to learn new practices such as preferring a max of 1 className per DOM element:

// Near-equivalent of [SCSS mixins](https://sass-lang.com/documentation/at-rules/mixin)

const deepMergedClassName = [style](https://vanilla-extract.style/documentation/api/style/)(\[baseStyle, otherBase, componentOverrides\])

-   Initial migration bugs. Migrating from inline styles to classNames breaks when selectors tie, and when previously common !important properties are present. Manually detecting bugs was tedious, but the bugs motivated more automated [Storybook screenshot diff tests](https://storybook.js.org/docs/react/writing-tests/visual-testing), which prevent future regressions

## Takeaways

Some of the benefits of working at a fast-growing startup are:

-   There’s no lack of impactful work when there’s a lot of low-hanging fruit.
-   If you spot an improvement, you can often fully own solutions.

If [building](https://www.glean.com/careers) or [using](https://www.glean.com/get-a-demo) a best-in-class search product sounds interesting to you, reach out!

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

![What is Retrieval Augmented Generation (RAG)?](https://cdn.prod.website-files.com/613513981b0efaf850830620/65fa99b91c30f8603bc2fcca_655db7ca5918fce2c1a55bf4_RAG%2520Thumbnail.webp)

## What is Retrieval Augmented Generation (RAG)?

Retrieval Augmented Generation is a pipeline framework that retrieves information via an external discovery system, enhancing the knowledge retrieval process for large language models. Generative AI and large language models (LLMs) are emerging as some of today’s most transformative workplace technologies – however, many solutions struggle with knowledge retrieval. Retrieval Augmented Generation addresses this issue by separating the knowledge retrieval from the generation process. Learn more about what it takes to make RAG work and how it unlocks the full potential of generative AI in this free 2-pager.

[Get The Resource](/resources/guides/what-is-retrieval-augmented-generation-rag)

![What is Retrieval Augmented Generation (RAG)?](https://cdn.prod.website-files.com/613513981b0efaf850830620/65fa99b91c30f8603bc2fcca_655db7ca5918fce2c1a55bf4_RAG%2520Thumbnail.webp)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
