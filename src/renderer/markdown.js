import bibliography from 'remark-bibliography'
import deflist from 'remark-deflist'
import frontmatter from 'remark-frontmatter'
import html from 'rehype-stringify'
import include from './remark/remark-include'
import katex from 'rehype-katex'
import math from 'remark-math'
import markdown from 'remark-parse'
import meta from 'remark-meta'
import redirect from 'remark-redirect'
import remark2rehype from 'remark-rehype'
import supersub from 'remark-supersub'
import unified from 'unified'
import yamlConfig from 'remark-yaml-config'

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
