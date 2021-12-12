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
  }



  get myForm(): { [key: string]: AbstractControl; }{
    return this.wineForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const dataValid = ['name', 'producer', 'country', 'grape', 'type', 'price', 'harmonizing']
    const filter = dataValid.filter(item => !this.wineForm.value[item])
    
    const invalid = filter.join(',')
    
    if(filter.length >= 1){
      window.alert(`Campos obrigatórios que ainda não foram preenchidos: ${invalid}`)
    }
    else if (!this.wineForm.valid) {
      return false;
    } 
    else 
    {
      this.apiService.createUser(this.wineForm.value).subscribe(
        (res) => {
          if (res) {
            window.alert('Cadastro realizado com sucesso!');
            console.log('Usuário criado com sucesso!');
            this.ngZone.run(() => this.router.navigateByUrl('/login'))
          }
          else {
            window.alert('Esse usuário já existe! Tente novamente.');
          }
        }, (error) => {
          console.log(error);
        });
    }
  }

}
