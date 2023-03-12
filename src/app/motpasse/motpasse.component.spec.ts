import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotpasseComponent } from './motpasse.component';

describe('MotpasseComponent', () => {
  let component: MotpasseComponent;
  let fixture: ComponentFixture<MotpasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotpasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotpasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
