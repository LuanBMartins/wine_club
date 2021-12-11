import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ApiService } from './../../service/api.service';


function explode(list: any) {
  let res = []
  for (let i=0; i<list.length; i++){
    res.push(list[i].item_text);
  }
  return res
}

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})

export class AdvancedSearchComponent implements OnInit {  
  constructor(
    private apiService: ApiService
    ) { }

  wines: any = [];
  grapesList: any = [];
  countriesList: any = [];
  harmsList: any = [];
  typesList: any = [];
  selectedGrapes: any = [];
  selectedCountries: any = [];
  selectedHarms: any = [];
  selectedTypes: any = [];
  dropdownSettings: IDropdownSettings = {};

  value = 0;
  ratingCount = 5;


  minValue: number = 0;
  maxValue: number = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000,
    step: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Minimo:</b> R$' + value;
        case LabelType.High:
          return '<b>Máximo:</b> R$' + value;
        default:
          return 'R$' + value;
      }
    }
  };
  
  ngOnInit() {
    this.wines = this.getWines();

    this.grapesList = [
      { item_type: 'grape', item_text: 'Cabernet Sauvignon' },
      { item_type: 'grape', item_text: 'Cabernet Franc' },
      { item_type: 'grape', item_text: 'Tannat' },
      { item_type: 'grape', item_text: 'Merlot' },
      { item_type: 'grape', item_text: 'Malbec' },
      { item_type: 'grape', item_text: 'Pinot Noir' },
      { item_type: 'grape', item_text: 'Riesling Itálico' },
      { item_type: 'grape', item_text: 'Chardonnay' },
      { item_type: 'grape', item_text: 'Gewurztraminer' },
      { item_type: 'grape', item_text: 'Semillón' },
      { item_type: 'grape', item_text: 'Sauvignon Blanc' },
      { item_type: 'grape', item_text: 'Barbera' },
      { item_type: 'grape', item_text: 'Carménère' },
      { item_type: 'grape', item_text: 'Syrah' },
      { item_type: 'grape', item_text: 'Tempranillo' },
      { item_type: 'grape', item_text: 'Petit Verdot' },
      { item_type: 'grape', item_text: 'Touriga Nacional' },
      { item_type: 'grape', item_text: 'Sangiovese' },
      { item_type: 'grape', item_text: 'Riesling' },
      { item_type: 'grape', item_text: 'Viognier' },
      { item_type: 'grape', item_text: 'Moscato' },

    ];

    this.countriesList = [
      { item_type: 'country', item_text: 'França' },
      { item_type: 'country', item_text: 'Itália' },
      { item_type: 'country', item_text: 'Espanha' },
      { item_type: 'country', item_text: 'Argentina' },
      { item_type: 'country', item_text: 'Chile' },
      { item_type: 'country', item_text: 'Portugal' },
      { item_type: 'country', item_text: 'Estados Unidos' },
      { item_type: 'country', item_text: 'Austrália' },
      { item_type: 'country', item_text: 'Uruguai' },
      { item_type: 'country', item_text: 'África do Sul' },
      { item_type: 'country', item_text: 'Alemanha' },
      { item_type: 'country', item_text: 'Rússia' },
      { item_type: 'country', item_text: 'Romênia' },
      { item_type: 'country', item_text: 'Hungria' },
      { item_type: 'country', item_text: 'Áustria' },
      { item_type: 'country', item_text: 'Grécia' },

    ];

    this.harmsList = [
      { item_type: 'harm', item_text: 'Peixe' },
      { item_type: 'harm', item_text: 'Queijo' },
      { item_type: 'harm', item_text: 'Carne Vermelha' },
      { item_type: 'harm', item_text: 'Frutas' },
      { item_type: 'harm', item_text: 'Sobremesa' },
      { item_type: 'harm', item_text: 'Aves' },
      { item_type: 'harm', item_text: 'Comida Picante' },
    ];

    this.typesList = [
      { item_type: 'type', item_text: 'Tinto' },
      { item_type: 'type', item_text: 'Rosé' },
      { item_type: 'type', item_text: 'Branco' },
      { item_type: 'type', item_text: 'Espumante' },
      { item_type: 'type', item_text: 'Fortificado' },
      { item_type: 'type', item_text: 'Sobremesa' },
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_text',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  
  searchParams = {
    'type': new Array,
    'country': new Array,
    'grape': new Array,
    'harmonizing': new Array,
    'score': 0,
    'price': new Array,
  }


  get myWines() {
    return this.wines.controls;
  }

  getWines() {
    this.apiService.searchWine(this.searchParams).subscribe(data => {
      console.log(this.searchParams);
      console.log(data);
      this.wines = data;
    });
  }

  onCountrySelect(item: any) {
    this.searchParams.country.push(item.item_text)
    this.getWines();
  }

  onCountrySelectAll(itens: any) {
    this.searchParams.country = explode(itens);
    this.getWines();
  }

  onCountryDeSelect(value: any) {
    this.searchParams.country = this.searchParams.country.filter(item => item !== value.item_text);
    this.getWines();
  }

  onCountryDeSelectAll() {
    this.searchParams.country = []
    this.getWines();
  }

  onGrapeSelect(item: any) {
    this.searchParams.grape.push(item.item_text)
    this.getWines();
  }

  onGrapeSelectAll(itens: any) {
    this.searchParams.grape = explode(itens);
    this.getWines();
  }

  onGrapeDeSelect(value: any) {
    this.searchParams.grape = this.searchParams.grape.filter(item => item !== value.item_text);
    this.getWines();
  }

  onGrapeDeSelectAll() {
    this.searchParams.grape = []
    this.getWines();
  }

  onHarmSelect(item: any) {
    this.searchParams.harmonizing.push(item.item_text)
    this.getWines();
  }

  onHarmSelectAll(itens: any) {
    this.searchParams.harmonizing = explode(itens);
    this.getWines();
  }

  onHarmDeSelect(value: any) {
    this.searchParams.harmonizing = this.searchParams.harmonizing.filter(item => item !== value.item_text);
    this.getWines();
  }

  onHarmDeSelectAll() {
    this.searchParams.harmonizing = []
    this.getWines();
  }

  onTypeSelect(item: any) {
    this.searchParams.type.push(item.item_text);
    this.getWines();
  }

  onTypeSelectAll(itens: any) {
    this.searchParams.type = explode(itens);
    this.getWines();
  }

  onTypeDeSelect(value: any) {
    this.searchParams.type = this.searchParams.type.filter(item => item !== value.item_text);
    this.getWines();
  }

  onTypeDeSelectAll() {
    this.searchParams.type = []
    this.getWines();
  }

  onPriceChange(value: any){
    this.searchParams.price[0] = value.value;
    this.searchParams.price[1] = value.highValue;
    this.getWines();
  }

  onRateChange(rate: number){
    this.searchParams.score = rate;
    this.getWines();
  }

}
