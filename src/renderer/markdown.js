import frontmatter from 'remark-frontmatter'
import html from 'rehype-stringify'
import include from 'remark-include'
import katex from 'rehype-katex'
import math from 'remark-math'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import yamlConfig from 'remark-yaml-config'
import redirect from 'remark-redirect'
import meta from 'remark-meta'
import deflist from 'remark-deflist'
import supersub from 'remark-supersub'
import bibliography from 'remark-bibliography'

const createProcessor = () =>
  unified()
    .use(markdown, {
      footnotes: true
    })
    .use(frontmatter)
    .use(yamlConfig)
    .use(include)
    .use(math)
    .use(deflist)
    .use(supersub)
    .use(meta)
    .use(bibliography)
    .use(redirect)
    .use(remark2rehype)
    .use(katex)
    .use(html)

export default createProcessor
