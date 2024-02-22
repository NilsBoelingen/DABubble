import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"dabubble-9de42","appId":"1:768652740673:web:6560399dc3c4fb77c49ec0","storageBucket":"dabubble-9de42.appspot.com","apiKey":"AIzaSyBJK8GlJlQT9HQl-IJMXP9Or6ltrEY8VNs","authDomain":"dabubble-9de42.firebaseapp.com","messagingSenderId":"768652740673"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
