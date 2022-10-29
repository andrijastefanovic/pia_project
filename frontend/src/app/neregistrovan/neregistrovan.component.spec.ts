import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeregistrovanComponent } from './neregistrovan.component';

describe('NeregistrovanComponent', () => {
  let component: NeregistrovanComponent;
  let fixture: ComponentFixture<NeregistrovanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeregistrovanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeregistrovanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
