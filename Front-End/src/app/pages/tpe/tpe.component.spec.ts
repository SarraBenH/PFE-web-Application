import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpeComponent } from './tpe.component';

describe('FooterComponent', () => {
  let component: TpeComponent;
  let fixture: ComponentFixture<TpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
