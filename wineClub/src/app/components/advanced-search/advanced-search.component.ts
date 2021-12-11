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


  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };
  
  ngOnInit() {

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
      { item_type: 'grape', item_text: 'Moscato' },
    ];

    this.countriesList = [
      { item_type: 'country', item_text: 'França' },
      { item_type: 'country', item_text: 'Itália' },
      { item_type: 'country', item_text: 'Espanha' },
      { item_type: 'country', item_text: 'Argentina' },
      { item_type: 'country', item_text: 'Chile' },
    ];

    this.harmsList = [
      { item_type: 'harm', item_text: 'Peixe' },
      { item_type: 'harm', item_text: 'Queijo' },
      { item_type: 'harm', item_text: 'Carne Vermelha' },
      { item_type: 'harm', item_text: 'Frutas' },
      { item_type: 'harm', item_text: 'Doces' },
    ];

    this.typesList = [
      { item_type: 'type', item_text: 'Tinto' },
      { item_type: 'type', item_text: 'Rosé' },
      { item_type: 'type', item_text: 'Branco' },
      { item_type: 'type', item_text: 'Espumante' },
      { item_type: 'type', item_text: 'Fortificado' },
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
      console.log(data);
      this.wines = data;
    });
  }


  onCountrySelect(item: any) {
    console.log(item);
    this.searchParams.country.push(item.item_text)
    console.log(this.searchParams);
    this.getWines();
    console.log(this.wines);
  }

  onCountrySelectAll(itens: any) {
    console.log(itens);
    this.searchParams.country = explode(itens);
    console.log(this.searchParams);  
  }

  onCountryDeSelect(item: any) {
    console.log(item);
  }

  onGrapeSelect(item: any) {
    console.log(item);
    this.searchParams.grape.push(item.item_text)
    console.log(this.searchParams);
  }

  onGrapeSelectAll(itens: any) {
    console.log(itens);
    this.searchParams.grape = explode(itens);
    console.log(this.searchParams);  
  }

  onHarmSelect(item: any) {
    console.log(item);
    this.searchParams.harmonizing.push(item.item_text)
    console.log(this.searchParams);
  }

  onHarmSelectAll(itens: any) {
    console.log(itens);
    this.searchParams.harmonizing = explode(itens);
    console.log(this.searchParams);  
  }

  onTypeSelect(item: any) {
    console.log(item);
    this.searchParams.type.push(item.item_text)
    console.log(this.searchParams);
  }

  onTypeSelectAll(itens: any) {
    console.log(itens);
    this.searchParams.type = explode(itens);
    console.log(this.searchParams);  
  }

  lowPriceChange(){

  }

  highPriceChange(){

  }

  onRateChange(rate: number){
    console.log(rate);
    this.searchParams.score = rate;
    console.log(this.searchParams);  
  }

}
