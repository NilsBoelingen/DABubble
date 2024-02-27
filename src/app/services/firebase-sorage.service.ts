import { Injectable, inject } from '@angular/core';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseSorageService {
  auth = inject(FirebaseAuthService);
  firebaseApp = getApp();
  storage = getStorage(this.firebaseApp, 'gs://dabubble-9de42.appspot.com');

  avatarURL: string = '';

  constructor() {}

  uploadCustomAvatar(selectedFile: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const avatarImagesRef = ref(
        this.storage,
        `/avatars/${this.auth.newUser.name}/${selectedFile.name}`
      );
      uploadBytes(avatarImagesRef, selectedFile).then((snapshot) => {

        getDownloadURL(snapshot.ref).then((downloadURL) => {
          this.avatarURL = downloadURL;
          resolve(); // Resolve the promise when upload and URL retrieval are completed
        }).catch(reject); // Reject the promise if URL retrieval fails
      }).catch(reject); // Reject the promise if upload fails
    });
  }
}
