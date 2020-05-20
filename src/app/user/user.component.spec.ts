import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should use user from userService', () => {
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.user.name);
  });

  it('should display the user name if the user is logged in', () => {
    component.isLoggedIn = true;
    let compiledTemplate = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiledTemplate.querySelector('p').textContent).toContain(component.user.name);
  });

  it('should\'t display the user name if the user is not logged in', () => {
    let compiledTemplate = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(compiledTemplate.querySelector('p').textContent).not.toContain(component.user.name);
  });

  it('should\'t fetch data if it is not called asynchronously', () => {
    let datService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(datService, 'getData').and.returnValue(Promise.resolve({data: 'newData'}));
    fixture.detectChanges();
    expect(component.data).toBeUndefined();
  });

  it('should fetch data if it is called asynchronously', async(() => {
    let datService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(datService, 'getData').and.returnValue(Promise.resolve({data: 'newData'}));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.data).toEqual({data: 'newData'});
    });
  }));

  it('should fetch data if it is called asynchronously v2', fakeAsync(() => {
    let datService = fixture.debugElement.injector.get(DataService);
    let spy = spyOn(datService, 'getData').and.returnValue(Promise.resolve({data: 'newData'}));
    fixture.detectChanges();
    fixture.whenStable();
    tick();
    expect(component.data).toEqual({data: 'newData'});

  }));
});
