/* global expect, fixtures */
import summary from './summary'

describe('summary', () => {
  it('should parse basic correctly', () => {
    expect.assertions(1)
    const source = fixtures('basic', 'src')
    return expect(summary({ source })).resolves.toMatchObject({
      summary: {
        header: 'Summary',
        prefix: [{ title: 'Basic', url: 'README.md' }],
        chapters: [
          { title: 'Chapter 1', url: 'chapter-1.md', level: 1 },
          { title: 'Chapter 2', url: 'chapter-2.md', level: 1 }
        ],
        suffix: []
      }
    })
  })

  it('should parse even complex summaries', () => {
    expect.assertions(1)
    const source = fixtures('summary', 'complex')
    return expect(summary({ source })).resolves.toMatchObject({
      summary: {
        header: 'Summary',
        prefix: [
          { title: 'Copyright', url: 'COPYRIGHT.md' },
          { title: 'Prologue', url: 'PROLOGUE.md' },
          { title: 'Authors', url: 'AUTHORS.md' }
        ],
        chapters: [
          { title: 'Documentation', url: 'README.md', level: 1 },
          { title: 'Chapter 2', url: 'chapter-1.md', level: 1 },
          { title: 'Topic', url: 'topic.md', level: 1 },
          { title: 'Sub Topic', url: 'sub-topic.md', level: 2 },
          { title: 'Sub Topic 2', url: 'sub-topic.md', level: 2 },
          { title: 'Micro topic', url: 'micro-topic.md', level: 3 },
          { title: 'Sub Topic 3', url: 'sub-topic.md', level: 2 }
        ],
        suffix: [{ title: 'Bibliography', url: 'bibliography.md' }]
      }
    })
  })
})
