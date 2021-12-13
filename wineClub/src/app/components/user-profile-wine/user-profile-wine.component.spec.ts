import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileWineComponent } from './user-profile-wine.component';

describe('UserProfileWineComponent', () => {
  let component: UserProfileWineComponent;
  let fixture: ComponentFixture<UserProfileWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
