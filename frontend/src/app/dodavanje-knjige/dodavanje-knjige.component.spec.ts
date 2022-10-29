import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeKnjigeComponent } from './dodavanje-knjige.component';

describe('DodavanjeKnjigeComponent', () => {
  let component: DodavanjeKnjigeComponent;
  let fixture: ComponentFixture<DodavanjeKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodavanjeKnjigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodavanjeKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
