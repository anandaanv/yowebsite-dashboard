import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWebsiteComponent } from './create-website.component';

describe('CreateWebsiteComponent', () => {
  let component: CreateWebsiteComponent;
  let fixture: ComponentFixture<CreateWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
