import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as ENV } from '@environments/environment';
import { User } from '@entities/all-entities';
import { HttpClient } from '@angular/common/http';

import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable()
export class CoreService {

  constructor(
    private http: HttpClient,
    private platform: Platform) { }

  public getUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${ENV.api}/?page=${page}&results=10`).pipe(
      map((respond: any) => respond.results)
    );
  }

  public async addPicture(): Promise<string> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const base64Data = await this.readAsBase64(capturedPhoto);
    return base64Data;
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });
      return file.data;
    }
    else {
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

}
