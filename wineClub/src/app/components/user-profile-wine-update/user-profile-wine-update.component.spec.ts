import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileWineUpdateComponent } from './user-profile-wine-update.component';

describe('UserProfileWineUpdateComponent', () => {
  let component: UserProfileWineUpdateComponent;
  let fixture: ComponentFixture<UserProfileWineUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileWineUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileWineUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
