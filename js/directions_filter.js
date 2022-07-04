const DirectionsFilter = function({choicesNode, items} = {}) {
  this.choices = choicesNode
  let filterTypeMap = {}
  filterTypeMap.all = 0
  filterTypeMap.fullTime = 1 //очная
  filterTypeMap.absentia = 2 // заочная
  filterTypeMap.fullTimeAbsentia = 3 // очно-заочная

  this.items = items
}

DirectionsFilter.prototype.init = function() {
  this.choicesOptions = this.choices.getElementsByClassName('choices__options')[0]
  this.choicesOptions.addEventListener('click', this.onChoicesClick)
  this.choicesOptions.context = this
}

DirectionsFilter.prototype.onChoicesClick = (e) => {
  const target = e.target
  if(target.nodeName !== 'INPUT') return

  const $this = e.currentTarget.context;
  const selectedFilter = target.getAttribute('data-filter')
  const found = $this.findItemByFilters(selectedFilter)
  if(found.length == 0) {
    $this.showAll()
    return
  }
  $this.hideAll()
  $this.showItems(found)
}

DirectionsFilter.prototype.findItemByFilters = function(filter) {
  let found = []
  for(let i = 0; i < this.items.length; i++) {
    const item = this.items[i]
    const inputFilter = JSON.parse(item.getAttribute('data-filter'))
    if(inputFilter.fullTime && filter == 'fullTime') {
      found.push(item)
    }
    if(inputFilter.absentia && filter == 'absentia') {
      found.push(item)
    }
    if(inputFilter.fullTimeAbsentia && filter == 'fullTimeAbsentia') {
      found.push(item)
    }
  }
  return found
}

DirectionsFilter.prototype.showItems = function(filtered) {
  for(let i = 0; i < filtered.length; i++) {
    const item = filtered[i]
    item.style.display = 'flex'
  }
}

DirectionsFilter.prototype.hideAll = function() {
  for(let i = 0; i < this.items.length; i++) {
    const item = this.items[i]
    item.style.display = 'none'
  }
}

DirectionsFilter.prototype.showAll = function() {
  for(let i = 0; i < this.items.length; i++) {
    const item = this.items[i]
    item.style.display = 'flex'
  }
}

const section = document.getElementById('directions')
const choices = document.getElementById('directions_choices')
const items = section.getElementsByClassName('directions__item')
const form = document.getElementById('filter-choices')
const filter = new DirectionsFilter({ choicesNode: choices, items: items });
form.reset()
filter.init()
