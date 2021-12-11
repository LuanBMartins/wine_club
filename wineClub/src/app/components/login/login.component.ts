import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    })
  }

  get myForm(): { [key: string]: AbstractControl; }{
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.apiService.login(this.loginForm.value).subscribe(
        (res) => {
          if (res) {
            window.alert('Login realizado com sucesso!');
            localStorage.setItem('userId', res.id);
            localStorage.setItem('userName', res.name);
            this.router.navigate(['advanced-search'])
            .then(() => {
              window.location.reload();
            });
          }
          else {
            window.alert('Usuário não encontrado!');
            console.log(res);
          }
        }, (error) => {
          console.log(error);
        });
    }
  }

}
