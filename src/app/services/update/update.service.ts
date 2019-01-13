import { Injectable } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    public electronService: ElectronService
  ) {}

  private currentVersion: string
  private currentName: string

  /***
   * https://github.com/Syncthetic/ElectronAutoUpdateAPI
   * apiDomain should be set to an ElectronAutoUpdateAPI's base URL
   * apiBase should be set to the API's base
   ***/

  private apiDomain: string //  = 'http://apps.mywebsite.com'
  private apiBase: string  // = 'api'
  private api: string
  public isAppVersionOld: boolean
  public latestAppVersion: string
  public newDownloadLink: string
  public latestApp: any
  public downloadInProgress: boolean

  check (cb?) {
    this.currentVersion = this.electronService.remote.app.getVersion()
    this.currentName = this.electronService.remote.app.getName()
    this.api = `${this.apiDomain}/${this.apiBase}/application/${this.currentName}`
    this.electronService.updateService.check_app_version(this.api, this.currentVersion, (app) => {
      this.isAppVersionOld = app.version !== this.currentVersion
      this.latestAppVersion = app.version
      this.newDownloadLink = app.download
      this.latestApp = app
      if ( cb ) cb(this.isAppVersionOld)
    })
  }

  requestDownload () {
    /**
     * Helpful Link
     * http://qaru.site/questions/2430642/electron-download-a-file-to-a-specific-location
     */
    console.log('Should download to ' + this.electronService.remote.app.getAppPath())
    const props = {
      openFolderWhenDone: true,
      directory: this.electronService.remote.app.getAppPath()
    }
    this.electronService.ipcRenderer.send('download', {
      url: this.newDownloadLink,
      properties: props
    })
    this.isAppVersionOld = !this.isAppVersionOld
    this.downloadInProgress = true
  }
}