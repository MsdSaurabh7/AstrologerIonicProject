import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInSuccessPage } from './sign-in-success.page';

describe('SignInSuccessPage', () => {
  let component: SignInSuccessPage;
  let fixture: ComponentFixture<SignInSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
