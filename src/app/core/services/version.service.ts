import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import * as build from '../../../build-version.json';

@Injectable()
export class VersionService {

  /**
   * To display the current build version on the console
   */
  displayBuildVersion(): void {
    console.log(
      `%cCurrent version: ${environment.version}`,
      `background: #0082af; padding: 8px 12px; border-radius: 4px; color: #fafafa; font-size: x-large`
    );

    try {
      console.log(
        `%cCurrent build number: ${build?.buildVersion}`,
        `background: #0082af; padding: 8px 12px; border-radius: 4px; color: #fafafa; font-size: large`
      );
    } catch (e) {
      console.warn(e);
    }
  }
}
