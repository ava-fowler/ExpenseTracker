import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// AngularFire imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDs9kfV3JYLHzWyWFwJAtidPNntC8BTwEc",
      authDomain: "expensetracker-81265.firebaseapp.com",
      projectId: "expensetracker-81265",
      storageBucket: "expensetracker-81265.appspot.com",
      messagingSenderId: "231401828877",
      appId: "1:231401828877:web:2391fb7575e8d38bcd9b44",
      measurementId: "G-4VDLWQY097"
    })),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
