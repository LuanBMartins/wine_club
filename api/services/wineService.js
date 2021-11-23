const Wine = require('../datas/wineData')


exports.searchWine = (itens) => {
    const filters = ['type', 'country', 'grape', 'harmonizing', 'score']
    const validFilters = {}

    // Analisando quais filtros foram informados
    filters.forEach(filter => {
        itens[filter] != null && itens[filter] != '' ? validFilters[filter] = itens[filter] : false
    })
    // Filtro de score
    itens.score != null && itens.score != '' ? validFilters.score = {$gte: itens.score[0], $lte: itens.score[1]} : false

    if(Object.keys(validFilters).length >= 1){
        return Wine.searchWine(validFilters)
    }else{
        throw new Error('Filtros indefinidos')
    }
}