import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';

import { environment } from '@env/environment';

import { httpInterceptorProviders } from './http-interceptors';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthGuardService } from './auth/auth-guard.service';
import { AnimationsService } from './animations/animations.service';
import { TitleService } from './title/title.service';
import { reducers, metaReducers } from './core.state';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { CustomSerializer } from './router/custom-serializer';
import { NotificationService } from './notifications/notification.service';
import { GoogleAnalyticsEffects } from './google-analytics/google-analytics.effects';
import { GoogleAuthService } from './auth/google-auth.service';

import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AngularFireModule } from 'angularfire2';
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from 'angularfire2/firestore';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // angular
    CommonModule,
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    // ngrx
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),

    EffectsModule.forRoot([AuthEffects, GoogleAnalyticsEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material Starter'
        }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    ForgotPasswordComponent,
    SignUpComponent,
    VerifyEmailComponent,
    SignInComponent
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    GoogleAuthService,
    NotificationService,
    LocalStorageService,
    AuthGuardService,
    AnimationsService,
    httpInterceptorProviders,
    TitleService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}
