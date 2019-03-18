import frontmatter from 'remark-frontmatter'
import html from 'rehype-stringify'
import include from 'remark-include'
import katex from 'rehype-katex'
import math from 'remark-math'
import markdown from 'remark-parse'
import plantuml from 'remark-plantuml'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import yamlConfig from 'remark-yaml-config'
import rename from './remark-rename.js'
import meta from './remark-meta.js'
import deflist from './remark-deflist.js'

const createProcessor = () =>
  unified()
    .use(markdown)
    .use(frontmatter)
    .use(yamlConfig)
    .use(include)
    .use(math)
    .use(plantuml)
    .use(deflist)
    .use(meta)
    .use(rename)
    .use(remark2rehype)
    .use(katex)
    .use(html)

export default createProcessor
