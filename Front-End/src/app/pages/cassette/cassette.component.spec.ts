import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CassetteComponent } from './cassette.component';

describe('FooterComponent', () => {
  let component: CassetteComponent;
  let fixture: ComponentFixture<CassetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CassetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CassetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
