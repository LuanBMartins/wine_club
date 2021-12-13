import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService} from '../../service/api.service'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from "@angular/forms";

@Component({
  selector: 'app-wine-review',
  templateUrl: './wine-review.component.html',
  styleUrls: ['./wine-review.component.css']
})
export class WineReviewComponent implements OnInit {


  wines: any = {};
  wineForm: FormGroup;
  value: number = 0;
  score: number = 0
  ratingCount: number = 5;

  constructor(
    private apiService: ApiService,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
  ) { 
    this.wineForm = new FormGroup({
      review: new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
    this.wines = this.getWines();
  }

  onRateChange(rate: number){
    this.score = rate;
    console.log(this.score);
  }

  getWines(): void {
    const id = parseInt(localStorage.getItem('idWine'));

    this.apiService.searchWineWithId(id).subscribe(data => {
      this.wines = data;
      console.log( this.wines );
    });
  }

  onSubmit():boolean {
    if(!this.score){
      window.alert('É obrigatório ao menos informar a nota')
      return false
    }
    
    const review = {
      id: parseInt(localStorage.getItem('userId')),
      name: localStorage.getItem('userName'),
      review: this.wineForm.value.review || '',
      score: this.score,
    }

    this.apiService.reviewWine(parseInt(localStorage.getItem('idWine')), review).subscribe(res => {
      window.alert('Review adicionada com sucesso!')
      this.ngZone.run(() => this.router.navigateByUrl('/profile'))
    }, erro => {
      window.alert('Problemas ao cadastrar review, tente novamente mais tarde!')
    })
    
    return true
  }

}
