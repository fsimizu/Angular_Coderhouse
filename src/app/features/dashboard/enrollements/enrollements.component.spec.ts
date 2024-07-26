import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollementsComponent } from './enrollements.component';

describe('EnrollementsComponent', () => {
  let component: EnrollementsComponent;
  let fixture: ComponentFixture<EnrollementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
