import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingDialogPage } from './loading-dialog.page';

describe('LoadingDialogPage', () => {
  let component: LoadingDialogPage;
  let fixture: ComponentFixture<LoadingDialogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
