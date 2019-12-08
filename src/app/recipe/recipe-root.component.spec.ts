import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRootComponent } from './recipe-root.component';

describe('RecipeRootComponent', () => {
  let component: RecipeRootComponent;
  let fixture: ComponentFixture<RecipeRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
