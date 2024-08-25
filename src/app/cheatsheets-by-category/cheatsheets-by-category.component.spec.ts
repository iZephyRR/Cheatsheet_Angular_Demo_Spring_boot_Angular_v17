import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatsheetsByCategoryComponent } from './cheatsheets-by-category.component';

describe('CheatsheetsByCategoryComponent', () => {
  let component: CheatsheetsByCategoryComponent;
  let fixture: ComponentFixture<CheatsheetsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheatsheetsByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheatsheetsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
