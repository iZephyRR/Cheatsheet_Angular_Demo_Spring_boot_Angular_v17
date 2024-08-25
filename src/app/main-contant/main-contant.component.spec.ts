import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContantComponent } from './main-contant.component';

describe('MainContantComponent', () => {
  let component: MainContantComponent;
  let fixture: ComponentFixture<MainContantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainContantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainContantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
