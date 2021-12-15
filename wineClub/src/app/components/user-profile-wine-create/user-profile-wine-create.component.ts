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
  grapesList: Array<string> = []
  countriesList: Array<string> = []
  harmsList: Array<string> = []
  typesList: Array<string> = []


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

      const reader = new FileReader()

      let img

      reader.onloadend =  () =>  {
        // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
        if(typeof reader.result === 'string'){ 
          var b64 = reader.result.replace(/^data:.+;base64,/, '');
          img = b64
          
          
          this.wineForm.value.image = img
          console.log(this.wineForm.value.image);
          
          // console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
        }
      };
    
      reader.readAsDataURL(file);
      
      

      const data = new FormData()
      data.append('image', file, 'wine')
      
    }
  } 


  get myForm(): { [key: string]: AbstractControl; }{
    return this.wineForm.controls;
  }

  onSubmit() {
    console.log(this.nameValidador);
    console.log(this.wineForm.value);
    
    
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

      this.apiService.createWine({...this.wineForm.value, user_id: parseInt(localStorage.getItem('userId'))}).subscribe(
        (res) => {
          if (res) {
            window.alert('Cadastro realizado com sucesso!');
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
  
  autocompleteMatch(input: string) {
    if (input == '') {
      return [];
    }
    var reg = new RegExp(input)
    return this.options.filter(function(term: string) {
      if (term.match(reg)) {
        return term;
      }
    });
  }

  autocomplete(event: any): void {
    let res = document.getElementById("result");
    res.innerHTML = '';
    let list = '';
    let terms = this.autocompleteMatch(event.target.value);
    for (let i = 0; i<terms.length; i++) {
      list += terms[i] + '<br>'
    }
    res.innerHTML = list
  }


}
