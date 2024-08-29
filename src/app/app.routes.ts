import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'loading-dialog',
    loadComponent: () => import('./loading-dialog/loading-dialog.page').then( m => m.LoadingDialogPage)
  },
  {
    path: 'success-dialog',
    loadComponent: () => import('./success-dialog/success-dialog.page').then( m => m.SuccessDialogPage)
  },
  {
    path: 'sign-in-success',
    loadComponent: () => import('./sign-in-success/sign-in-success.page').then( m => m.SignInSuccessPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./sign-in-success/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'user/my-profile',
    loadComponent: () => import('./user/my-profile/my-profile.page').then( m => m.MyProfilePage)
  },
  {
    path: 'astro/my-profile',
    loadComponent: () => import('./astro/my-profile/my-profile.page').then( m => m.MyProfilePage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./astro/my-profile/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  }
];
