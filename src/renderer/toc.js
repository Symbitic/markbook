export default function createToc (config) {
  const geturl = filename =>
    filename
      .replace(/README\.md$/, 'index.md')
      .replace(/\.md$/, '')
      .concat('.html')

  const chapter = (items, i) =>
    items.slice(0, i + 1).filter(item => item.level === 1).length

  const subchapter = (items, i) =>
    i -
    items.indexOf(
      items
        .slice(0, i + 1)
        .reverse()
        .find(i => i.level === 1)
    )

  const prefix = config.summary.prefix.map(item => ({
    title: item.title,
    url: geturl(item.url)
  }))

  const chapters = config.summary.chapters.map((item, i, items) => ({
    title: item.title,
    url: geturl(item.url),
    ch: `${chapter(items, i)}.${subchapter(items, i)}`.replace(/\.0$/, '.'),
    level: item.level
  }))

  const suffix = config.summary.suffix.map(item => ({
    title: item.title,
    url: geturl(item.url)
  }))

  return {
    prefix,
    chapters,
    suffix
  }
}
