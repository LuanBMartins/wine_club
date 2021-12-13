import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../service/api.service'

@Component({
  selector: 'app-user-profile-wine',
  templateUrl: './user-profile-wine.component.html',
  styleUrls: ['./user-profile-wine.component.css']
})
export class UserProfileWineComponent implements OnInit {

  wines: any = [];
  wines_found: number = 0;
  showReviewsDiv: boolean = false

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.wines = this.getWines();
  }

  get myWines() {
    return this.wines.controls;
  }

  getWines() {
    const id = parseInt(localStorage.getItem('userId'));

    this.apiService.searchWineId(id).subscribe(data => {
      console.log();
      console.log(data);
      this.wines = data;
      this.wines_found = data.length
    });
  }

  showReviews(){
    if (this.showReviewsDiv){
      this.showReviewsDiv=false;
    }
    else{
      this.showReviewsDiv=true;
    }
  }

}
