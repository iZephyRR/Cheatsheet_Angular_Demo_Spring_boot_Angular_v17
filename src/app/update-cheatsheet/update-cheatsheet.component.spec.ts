import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCheatsheetComponent } from './update-cheatsheet.component';

describe('UpdateCheatsheetComponent', () => {
  let component: UpdateCheatsheetComponent;
  let fixture: ComponentFixture<UpdateCheatsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCheatsheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCheatsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
