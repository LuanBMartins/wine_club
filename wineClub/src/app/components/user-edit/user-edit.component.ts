import { User } from '../../model/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  userData: User[];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateUser();
    let id = parseInt(this.actRoute.snapshot.paramMap.get('id'));
    this.getUser(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    })
  }

  updateProfile(e: any) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  get myForm() {
    return this.editForm.controls;
  }

  getUser(id: number) {
    this.apiService.getUser(id).subscribe(data => {
      this.editForm.setValue({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    });
  }

  updateUser() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Tem certeza de que deseja atualizar os dados?')) {
        let id = parseInt(this.actRoute.snapshot.paramMap.get('id'));
        this.apiService.updateUser(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/users-list');
            window.alert('Usuário atualizado com sucesso!');
            console.log('Usuário atualizado com sucesso!');
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}