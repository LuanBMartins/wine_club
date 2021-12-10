import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor() { }

  grapesList: any = [];
  countriesList: any = [];
  harmsList: any = [];
  selectedGrapes: any = [];
  selectedCountries: any = [];
  selectedHarms: any = [];
  dropdownSettings: IDropdownSettings = {};

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

    this.selectedCountries = [
      { item_type: 'country', item_text: 'Chile' },
    ];

    this.selectedGrapes = [
      { item_type: 'grape', item_text: 'Merlot' },
      { item_type: 'grape', item_text: 'Malbec' },
    ];

    this.selectedHarms = [
      { item_type: 'harm', item_text: 'Peixe' },
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

  onGrapeSelect(item: any) {
    console.log(item);
  }

  onCountrySelect(item: any) {
    console.log(item);
  }

  onHarmSelect(item: any) {
    console.log(item);
  }

  onGrapeSelectAll(itens: any) {
    console.log(itens);
  }

  onCountrySelectAll(itens: any) {
    console.log(itens);
  }

  onHarmSelectAll(item: any) {
    console.log(item);
  }
}
