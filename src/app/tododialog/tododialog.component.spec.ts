import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TododialogComponent } from './tododialog.component';

describe('TododialogComponent', () => {
  let component: TododialogComponent;
  let fixture: ComponentFixture<TododialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TododialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TododialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
