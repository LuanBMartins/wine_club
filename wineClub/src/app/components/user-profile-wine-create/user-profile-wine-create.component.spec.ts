import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileWineCreateComponent } from './user-profile-wine-create.component';

describe('UserProfileWineCreateComponent', () => {
  let component: UserProfileWineCreateComponent;
  let fixture: ComponentFixture<UserProfileWineCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileWineCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileWineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
