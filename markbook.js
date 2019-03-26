/* global fuse, EventSource */
function togglesearch () {
  var searchbar = document.getElementById('searchbar')
  var button = document.querySelector('span[aria-controls="searchbar"]')
  var enabled = button.getAttribute('aria-expanded') === 'true'

  if (enabled) {
    button.setAttribute('aria-expanded', 'false')
    searchbar.classList.add('hidden')
  } else {
    button.setAttribute('aria-expanded', 'true')
    searchbar.classList.remove('hidden')
  }
}

function togglesidebar () {
  var sidebar = document.getElementById('sidebar')
  var content = document.getElementById('content')
  var button = document.querySelector('span[aria-controls="sidebar"]')
  var enabled = button.getAttribute('aria-expanded') === 'true'

  // Ordering is important
  if (enabled) {
    button.setAttribute('aria-expanded', 'false')
    sidebar.classList.add('hidden')
    content.classList.replace('is-10', 'is-12')
  } else {
    button.setAttribute('aria-expanded', 'true')
    content.classList.replace('is-12', 'is-10')
    sidebar.classList.remove('hidden')
  }
}

function oninput (evt) {
  const results = fuse
    .search(evt.target.value)
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) =>
      matches.map(match => {
        var text = item[match.key]
        var result = []
        var matches = [].concat(match.indices)
        var pair = matches.shift()

        for (var i = 0; i < text.length; i++) {
          var char = text.charAt(i)
          if (pair && i === pair[0]) {
            result.push('<b>')
          }
          result.push(char)
          if (pair && i === pair[1]) {
            result.push('</b>')
            pair = matches.shift()
          }
        }

        return {
          result: result.join(''),
          file: item.file
        }
      })
    )
  if (results && results.length) {
    document.getElementById('search-results').innerHTML = `
      <p class="is-size-5">${results.length} results for '${
      evt.target.value
    }'</p>
      <ul>
        ${results
          .map(
            item => `
          <li>
            <a class="is-size-6"><strong>${item.file}</strong></a>
          </li>
        `
          )
          .join('')}
      </ul>
    `
  } else {
    document.getElementById('search-results').innerHTML = ''
  }
}

function onload () {
  var searchbar = document.querySelector('span[aria-controls="searchbar"]')
  var sidebar = document.querySelector('span[aria-controls="sidebar"]')
  var search = document.getElementById('searchbar')
  if (searchbar) {
    searchbar.addEventListener('click', togglesearch)
  }
  if (sidebar) {
    sidebar.addEventListener('click', togglesidebar)
  }
  if (search) {
    search.addEventListener('input', oninput)
  }

  // We can't make this mobile-first because then this can't be rendered
  // server-side.
  if (window.screen.width < 1024) {
    togglesidebar()
  }

  const sse = new EventSource('/sse')
  sse.addEventListener('reload', e => {
    console.log('reload')
    window.location.reload(true)
  })
  /*
  sse.addEventListener('error', e => {
    console.log('error')
    sse.close()
  })
  */
}

window.addEventListener('DOMContentLoaded', onload)
