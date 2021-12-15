import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService} from '../../service/api.service'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-wine-update',
  templateUrl: './user-profile-wine-update.component.html',
  styleUrls: ['./user-profile-wine-update.component.css']
})
export class UserProfileWineUpdateComponent implements OnInit {

  submitted = false;
  nameValidador: boolean = true
  name: string = ''
  wines: any = {};
  options: any = []
  wineForm: FormGroup;
  grapesList: Array<string> = []
  countriesList: Array<string> = []
  harmsList: Array<string> = []
  typesList: Array<string> = []

  constructor(
    private apiService: ApiService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.wineForm = new FormGroup({
      name: new FormControl(this.wines.name,Validators.required),
      producer: new FormControl(this.wines.producer,Validators.required),
      country: new FormControl(this.wines.country,Validators.required),
      grape: new FormControl(this.wines.grape,Validators.required),
      type: new FormControl(this.wines.type,Validators.required),
      harmonizing: new FormControl(this.wines.harmonizing || '',Validators.required),
      price: new FormControl(this.wines.price,Validators.required),
      
    })

    this.grapesList = [
      'Cabernet Sauvignon',
      'Cabernet Franc',
      'Tannat',
      'Merlot',
      'Malbec',
      'Pinot Noir',
      'Riesling Itálico',
      'Chardonnay',
      'Gewurztraminer',
      'Semillón',
      'Sauvignon Blanc',
      'Barbera',
      'Carménère',
      'Syrah',
      'Tempranillo',
      'Petit Verdot',
      'Touriga Nacional',
      'Sangiovese',
      'Riesling',
      'Viognier',
      'Moscato',
    ];

    this.countriesList = [
      'França',
      'Itália',
      'Brasil',
      'Espanha',
      'Chile',
      'Portugal',
      'Estados Unidos',
      'Austrália',
      'Uruguai',
      'África do Sul',
      'Alemanha',
      'Rússia',
      'Romênia',
      'Hungria',
      'Áustria',
      'Grécia'
    ]

    this.harmsList = [
      'Peixe',
      'Queijo',
      'Carne Vermelha',
      'Frutas',
      'Sobremesa',
      'Aves',
      'Comida Picante',
      'Cordeiro',
      'Carne de Porco',
      'Cogumelos',
      'Aperitivo',
      'Carne Curada',
      'Massa',
      'Marisco',
      'Vegetariano',
    ];

    this.typesList = [
      'Tinto',
      'Rosé',
      'Branco',
      'Espumante',
      'Fortificado',
      'Sobremesa',
    ];
   }

  ngOnInit(): void {
    this.wines = this.getWines();
  }

  getWines(): void {
    const id = parseInt(localStorage.getItem('idWine'));

    this.apiService.searchWineWithId(id).subscribe(data => {
      this.wines = data;
      console.log( this.wines );
    });
  }

  validatorName(event: any): void {
    this.name = event
    this.options.includes(event) ? this.nameValidador = false : this.nameValidador = true 
  }

  onSubmit() {
    
    this.submitted = true;
    const dataValid = ['name', 'producer', 'country', 'grape', 'type', 'price', 'harmonizing', 'image']
    const filter = dataValid.filter(item => !this.wineForm.value[item])

    console.log(this.wineForm.value);
    

    if(filter.length === 8){
      window.alert(`Nenhuma edição fornecida!`)
      return false;
    }
    else 
    {
          
        if(!this.wines.harmonizing && this.wineForm.value.harmonizing){
          this.wines.harmonizing = [this.wineForm.value.harmonizing]
        }else if(this.wineForm.value.harmonizing && !this.wines.harmonizing.includes(this.wineForm.value.harmonizing)){
          this.wines.harmonizing.push(this.wineForm.value.harmonizing)
        }
        console.log(this.wines.harmonizing);

        const body = {
          name: this.wineForm.value.name || this.wines.name,
          producer: this.wineForm.value.producer || this.wines.producer,
          country: this.wineForm.value.country || this.wines.country,
          grape: this.wineForm.value.grape || this.wines.grape,
          type: this.wineForm.value.type || this.wines.type,
          harmonizing: this.wines.harmonizing,
          price: this.wineForm.value.price || this.wines.price,
        }

        console.log(body);
        
        
        this.apiService.updateWine(
          parseInt(localStorage.getItem('idWine')),
          body
          ).subscribe(
          (res) => {
            if (res) {
              window.alert('Item de harmonização adicionado com sucesso!');
              console.log('Vinho criado com sucesso!');
              this.router.navigate(['profile/wine'])
              .then(() => {
                window.location.reload();
              });
            }
            else {            
              window.alert('Erro ao cadastrar! Tente novamente.');
            }
          }, (error) => {
            console.log(error);
          });
      
      
    }
  }

}
