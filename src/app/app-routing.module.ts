import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { VerifyEmailComponent } from './core/auth/verify-email/verify-email.component';
import { AuthGuardService } from './core';
import { AboutComponent } from './static';
import { FeaturesComponent } from './static/features/features.component';
import { StatutReglementComponent } from './static/statut-reglement/statut-reglement.component';
import { ManifesteComponent } from './static/manifeste/manifeste.component';
import { NoIdComponent } from './static/no-id/no-id.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'noid/maison',
    pathMatch: 'full'
  },
  {
    path: 'noid',
    component:NoIdComponent ,
    children: [
    {
      path: '',
      redirectTo: 'maison',
      pathMatch: 'full'
    },
    {
      path: 'maison',
      component: AboutComponent,
      data: { title: 'Maison' }
    },

    {
      path: 'test',
      component: FeaturesComponent,
      data: { title: 'anms.menu.settings' }
    },
    {
      path: 'manifeste',
      component: ManifesteComponent,
      data: { title: '' }
    },
    {
      path: 'statut-reglement',
      component: StatutReglementComponent,
      data: { title: 'statut-reglement' }
    },
    {
      path: 'emailLogin',
      component: SignInComponent,
      data: { title: 'signIn' }
    },
    {
      path: 'emailSignUp',
      component: SignUpComponent,
      data: { title: 'signUp' }
    },
    {
      path: 'forget',
      component: ForgotPasswordComponent,
      data: { title: 'Oublie du mot de pass' }
    },
    {
      path: 'verify-email-address',
      component: VerifyEmailComponent,
      data: { title: 'Vérification du courriel' }
    },
  ]
  },

  {
    path: 'app',
    loadChildren: () => import('app/examples/examples.module').then(m => m.ExamplesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: '**',
    redirectTo: 'noid/maison'
  }
]

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
