import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExchangesComponent } from './user-exchanges.component';

describe('UserExchangesComponent', () => {
  let component: UserExchangesComponent;
  let fixture: ComponentFixture<UserExchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExchangesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
