import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingExchangeComponent } from './pending-exchange.component';

describe('PendingExchangeComponent', () => {
  let component: PendingExchangeComponent;
  let fixture: ComponentFixture<PendingExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingExchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
