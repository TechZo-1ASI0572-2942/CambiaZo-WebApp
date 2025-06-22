import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLockerHeadquarterComponent } from './dialog-locker-headquarter.component';

describe('DialogLockerHeadquarterComponent', () => {
  let component: DialogLockerHeadquarterComponent;
  let fixture: ComponentFixture<DialogLockerHeadquarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLockerHeadquarterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogLockerHeadquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
