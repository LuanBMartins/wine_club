import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: 'app-user-profile-wine-create',
  templateUrl: './user-profile-wine-create.component.html',
  styleUrls: ['./user-profile-wine-create.component.css']
})
export class UserProfileWineCreateComponent implements OnInit {

  submitted = false;
  nameValidador: boolean = true
  name: string = ''
  erros = {}
  wineForm: FormGroup;
  options: any = []
  grapesList: Array<object> = []
  countriesList: Array<object> = []
  harmsList: Array<object> = []
  typesList: Array<object> = []


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
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
  }

// ANALISAR
//   onChanges(){
//     this.searchForm.get('searchBar').valueChanges.pipe(
//        filter( data => data.trim().length > 0 ),
//        debounceTime(500),
//        switchMap(  (id: string) => {
//           return id ? this.serachService.searchingValue(id.replace(/[\s]/g,'')) : of([]);
//        })
//     ).subscribe(data =>{
//        this.searchResult = data as Array<{}>; 
//     })
//  }

  ngOnInit(): void {
    this.options = this.getName()
  }

  validatorName(event: any): void {
    this.name = event
    this.options.includes(event) ? this.nameValidador = false : this.nameValidador = true 
  }

  onClick(): void {
    const id = parseInt(localStorage.getItem('userId'));

    this.apiService.updateUserWine(id, {name: this.name}).subscribe(
      (res) => {
        if (res) {
          window.alert('Vinho adicionado a sua lista com sucesso!');
          this.ngZone.run(() => this.router.navigateByUrl('/profile/wine'))
        }
        else {            
          window.alert('Erro ao cadastrar! Tente novamente.');
        }
      }, (error) => {
        console.log(error);
      });
  }

  getName(): any {
    this.apiService.searchWineName().subscribe( (res) => {
      const array: Array<string> = []
      const resArray = res
      resArray.forEach((item: {name: string, _id: string}) => {
          array.push(item['name'])
      })
      
      if(array.length >= 1) {
        this.options = array
        console.log(this.options);
        
      }
    })
  }

  onFileInput(event: any | null): void {
    if(event){
      const file: File = event[0]

      const data = new FormData()
      data.append('image', file, 'wine')
      this.wineForm.value.image = data
    }
  } 


  get myForm(): { [key: string]: AbstractControl; }{
    return this.wineForm.controls;
  }

  onSubmit() {
    console.log(this.nameValidador);
    
    this.submitted = true;
    const dataValid = ['name', 'producer', 'country', 'grape', 'type', 'price', 'harmonizing', 'image']
    const filter = dataValid.filter(item => !this.wineForm.value[item])

    if(!this.nameValidador){
      window.alert(`Vinho já existente em nossa base de dados!`)
      return false;
    }
    else if(filter.length >= 1){
      window.alert(`Por favor preencher todos os campos!`)
      return false;
    }
    else if (!this.wineForm.valid) {
      return false;
    } 
    else 
    {
      console.log(this.wineForm.value);

      this.apiService.createWine(this.wineForm.value).subscribe(
        (res) => {
          if (res) {
            window.alert('Cadastro realizado com sucesso!');
            console.log('Vinho criado com sucesso!');
            this.ngZone.run(() => this.router.navigateByUrl('/profile/wine'))
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
