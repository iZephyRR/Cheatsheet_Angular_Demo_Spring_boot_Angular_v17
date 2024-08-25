import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatsheetCreateComponent } from './cheatsheet-create.component';

describe('CheatsheetCreateComponent', () => {
  let component: CheatsheetCreateComponent;
  let fixture: ComponentFixture<CheatsheetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheatsheetCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheatsheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
