import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsContainerComponent } from './students-container.component';

describe('StudentsContainerComponent', () => {
  let component: StudentsContainerComponent;
  let fixture: ComponentFixture<StudentsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
