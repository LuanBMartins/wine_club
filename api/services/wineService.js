const Wine = require('../datas/wineData')
const error = require('../utils/error')

exports.findAll = () => {
    return Wine.findAll()
}

exports.searchWine = (itens) => {
    const filters = ['type', 'country', 'grape', 'harmonizing']
    const validFilters = []

    // Analisando quais filtros foram informados
    filters.forEach(item => {
        itens[item] != null && itens[item] != '' && itens.item != [] ? validFilters.push({[item]: {$in: itens[item]}}) : false
    })
    // Filtro de score
    itens.score != null && itens.score != '' && itens.score != [] ? validFilters.push({'score': {$lte: itens.score}}) : false
    itens.price != null && itens.price != '' && itens.price != [] ? validFilters.push({'price': {$gte: itens.price[0], $lte: itens.price[1]}}) : false

    if(Object.keys(validFilters).length >= 1){
        return Wine.searchWine({$and: validFilters})
    }else{
        return Wine.searchWine({})
    }
}

exports.searchId = (id) => {
    return Wine.searchId({'id': {$in: id}})
}

