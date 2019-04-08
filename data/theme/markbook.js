/* global EventSource, index */

// Store elements for faster ops.
var searchHeader = document.getElementById('search-header')
var searchResults = document.getElementById('search-results')
var searchbar = document.getElementById('searchbar')
var searchbarToggle = document.getElementById('searchbar-toggle')
var search = document.getElementById('search')
var sidebar = document.getElementById('sidebar')
var sidebarToggle = document.getElementById('sidebar-toggle')
var content = document.getElementById('content')

function togglesearch () {
  var enabled = searchbarToggle.getAttribute('aria-expanded') === 'true'

  if (enabled) {
    searchbarToggle.setAttribute('aria-expanded', 'false')
    searchbar.value = ''
    search.classList.add('hidden')
  } else {
    searchbarToggle.setAttribute('aria-expanded', 'true')
    search.classList.remove('hidden')
    searchbar.focus()
  }
}

function togglesidebar () {
  var enabled = sidebarToggle.getAttribute('aria-expanded') === 'true'

  // Ordering is important
  if (enabled) {
    sidebarToggle.setAttribute('aria-expanded', 'false')
    sidebar.classList.add('hidden')
    content.classList.replace('is-10', 'is-12')
  } else {
    sidebarToggle.setAttribute('aria-expanded', 'true')
    content.classList.replace('is-12', 'is-10')
    sidebar.classList.remove('hidden')
  }
}

function oninput (evt) {
  if (evt.target.value.length < 3) {
    searchHeader.innerHTML = ''
    searchResults.innerHTML = ''
    return
  }
  var results = index.search(evt.target.value, 15).map(result => {
    var contents = result.contents.split(/\s/).filter(str => str.length)
    var idx = contents.indexOf(evt.target.value)
    var start = Math.max(idx - 10, 0)
    var end = Math.min(idx + 15, contents.length - 1)
    var regex = new RegExp(evt.target.value, 'gi')
    var str = contents
      .slice(start, end)
      .join(' ')
      .replace(regex, '<strong>$&</strong>')
    var file =
      result.file.length > 0 && result.title.length > 0
        ? '<a href="' + result.file + '">' + result.title + '</a>'
        : ''
    var teaser =
      str.length > 0 && str.indexOf(evt.target.value) !== -1
        ? '<span class="teaser">' + str + '</span>'
        : ''
    return '<li>'
      .concat(file)
      .concat(teaser)
      .concat('</li>')
      .replace('<li></li>', '')
  })
  searchHeader.innerHTML =
    String(results.length) + ' results for "' + evt.target.value + '"'
  searchResults.innerHTML = results.join('')
}

function clear (evt) {
  var enabled = searchbarToggle.getAttribute('aria-expanded') === 'true'
  if (enabled) {
    if (evt.key === 'Escape') {
      searchHeader.innerHTML = ''
      searchResults.innerHTML = ''
      searchbar.value = ''
      document.activeElement.blur()
    }
  }
}

function reload () {
  // window.location.reload(true);
}

function onload () {
  if (searchbarToggle) {
    searchbarToggle.addEventListener('click', togglesearch)
  }
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', togglesidebar)
  }
  if (searchbar) {
    searchbar.addEventListener('input', oninput)
    searchbar.addEventListener('keyup', clear)
  }

  // We can't make this mobile-first because then this can't be rendered
  // server-side.
  if (window.screen.width < 1024) {
    togglesidebar()
  }

  var sse = new EventSource('/sse')
  sse.addEventListener('reload', reload)
}

window.addEventListener('DOMContentLoaded', onload)
