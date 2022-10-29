import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeKnjigeComponent } from './azuriranje-knjige.component';

describe('AzuriranjeKnjigeComponent', () => {
  let component: AzuriranjeKnjigeComponent;
  let fixture: ComponentFixture<AzuriranjeKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeKnjigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzuriranjeKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
