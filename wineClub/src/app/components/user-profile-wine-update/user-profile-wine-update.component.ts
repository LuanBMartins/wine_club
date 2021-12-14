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
      name: new FormControl('',Validators.required),
      producer: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      grape: new FormControl('',Validators.required),
      type: new FormControl('',Validators.required),
      harmonizing: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      image: new FormControl('',Validators.required),
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
      'massa'
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

    if(filter.length === 8){
      window.alert(`Nenhuma edição fornecida!`)
      return false;
    }
    else 
    {
            
      let valid = true
      
      this.wines.harmonizing.forEach((item: string) => {
        if(this.wineForm.value.harmonizing === item.trim()){
          valid = false
          stop
        }
      })

      console.log(valid);
      
      if(!valid){
        window.alert(`Item de Harmonização já existente!`)
        return false;
      }else {
        if(this.wines.harmonizing.length === 0){
          this.wines.harmonizing.push(this.wineForm.value.harmonizing)
        }else {
          this.wines.harmonizing.push(' ' + this.wineForm.value.harmonizing)
        }
        console.log(this.wines.harmonizing);
        
        this.apiService.updateWine(
          parseInt(localStorage.getItem('idWine')),
          { harmonizing: this.wines.harmonizing }
          ).subscribe(
          (res) => {
            if (res) {
              window.alert('Item de harmonização adicionado com sucesso!');
              console.log('Vinho criado com sucesso!');
              this.ngZone.run(() => this.router.navigateByUrl('/profile/wine/update'))
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

}
