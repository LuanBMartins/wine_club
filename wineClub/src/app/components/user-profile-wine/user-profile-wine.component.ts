import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService} from '../../service/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-wine',
  templateUrl: './user-profile-wine.component.html',
  styleUrls: ['./user-profile-wine.component.css']
})
export class UserProfileWineComponent implements OnInit {

  wines: any = [];
  wines_found: number = 0;
  showReviewsDiv: boolean = false
  showReviewProdId: number = -1

  constructor(
    private apiService: ApiService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.wines = this.getWines();
  }

  get myWines() {
    return this.wines.controls;
  }

  editWine(item: any): void {

    localStorage.setItem('idWine', item.target.id)
    this.ngZone.run(() => this.router.navigateByUrl('/profile/wine/update'))
  }

  addReviews(item: any): void {
    localStorage.setItem('idWine', item.target.id)
    this.ngZone.run(() => this.router.navigateByUrl('/wine/review'))
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

  showReviews(wineId: number){
    if (this.showReviewsDiv){
      this.showReviewsDiv=false;
      this.showReviewProdId=wineId;
    }
    else{
      this.showReviewsDiv=true;
      this.showReviewProdId=wineId;
    }
  }

}
