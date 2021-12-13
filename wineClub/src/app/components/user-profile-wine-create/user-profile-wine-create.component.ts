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
  erros = {}
  wineForm: FormGroup;
  options: any = []

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
  }

  ngOnInit(): void {
    this.options = this.getName()
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

    this.submitted = true;
    const dataValid = ['name', 'producer', 'country', 'grape', 'type', 'price', 'harmonizing', 'image']
    const filter = dataValid.filter(item => !this.wineForm.value[item])
    if(filter.length >= 1){
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
