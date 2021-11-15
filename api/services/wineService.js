const Wine = require('../datas/wineData')


exports.searchWine = (itens) => {
    // FALTA FILTRAR CORRETAMENTE POR SCORES

    const filters = ['type', 'country', 'grape', 'harmonizing', 'score']
    const validFilters = {}

    // Analisando quais filtros foram informados
    filters.forEach(filter => {
        itens[filter] != null && itens[filter] != '' ? validFilters[filter] = itens[filter] : false
    })

    // Se ao menos um filtro for informado irá haver continuidade no serviço
    if(Object.keys(validFilters).length >= 1){
        return Wine.searchWine(validFilters)
    }else{
        throw new Error('Filtros indefinidos')
    }
}