import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatsheetListComponent } from './cheatsheet-list.component';

describe('CheatsheetListComponent', () => {
  let component: CheatsheetListComponent;
  let fixture: ComponentFixture<CheatsheetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheatsheetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheatsheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
