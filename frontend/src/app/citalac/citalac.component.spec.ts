import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitalacComponent } from './citalac.component';

describe('CitalacComponent', () => {
  let component: CitalacComponent;
  let fixture: ComponentFixture<CitalacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitalacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitalacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
