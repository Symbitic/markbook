import frontmatter from 'remark-frontmatter'
import html from 'rehype-stringify'
import include from 'remark-include'
import katex from 'rehype-katex'
import math from 'remark-math'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import yamlConfig from 'remark-yaml-config'
import rename from './remark-rename'
import meta from './remark-meta'
import deflist from './remark-deflist'

const createProcessor = () =>
  unified()
    .use(markdown)
    .use(frontmatter)
    .use(yamlConfig)
    .use(include)
    .use(math)
    .use(deflist)
    .use(meta)
    .use(rename)
    .use(remark2rehype)
    .use(katex)
    .use(html)

export default createProcessor
