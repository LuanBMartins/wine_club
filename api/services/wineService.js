const Wine = require('../datas/wineData')
const error = require('../utils/error')

exports.findAll = () => {
    return Wine.findAll()
}

exports.searchWine = (itens) => {
    const filters = ['type', 'country', 'grape', 'harmonizing']
    const validFilters = []

    // Analisando quais filtros foram informados
    filters.forEach(filter => {
        itens[filter] != null && itens[filter] != '' && itens[filter] != [] ? validFilters.push({filter: {$in: itens[filter]}}) : false
    })
    // Filtro de score
    itens.score != null && itens.score != '' && itens.score != [] ? validFilters.push({'score': {$lte: itens.score}}) : false
    itens.price != null && itens.price != '' && itens.price != [] ? validFilters.push({'price': {$gte: itens.price[0], $lte: itens.price[1]}}) : false

    if(Object.keys(validFilters).length >= 1){
        return Wine.searchWine({$and: validFilters})
    }else{
        throw new error('Campos inexistentes', '400')
    }
}