import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerDetailComponent } from './locker-detail.component';

describe('LockerDetailComponent', () => {
  let component: LockerDetailComponent;
  let fixture: ComponentFixture<LockerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
