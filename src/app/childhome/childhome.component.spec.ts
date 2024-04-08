import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildhomeComponent } from './childhome.component';

describe('ChildhomeComponent', () => {
  let component: ChildhomeComponent;
  let fixture: ComponentFixture<ChildhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
