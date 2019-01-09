import { Injectable } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    public electronService: ElectronService,
  ) { }

  private currentVersion: string
  private currentName: string

  /***
   * https://github.com/Syncthetic/ElectronAutoUpdateAPI
   * apiDomain should be set to an ElectronAutoUpdateAPI's base URL
   * apiBase should be set to the API's base
   ***/

  private apiDomain: string // = http://api.website.com/
  private apiBase: string // = 'api/'
  private api: string

  public isAppVersionOld: boolean
  public latestAppVersion: string
  public newDownloadLink: string
  public latestApp: any

  check () {
    this.currentVersion = this.electronService.remote.app.getVersion()
    this.currentName = this.electronService.remote.app.getName()
    this.api = `${this.apiDomain}/${this.apiBase}/application/${this.currentName}`
    this.electronService.updateService.check_app_version(this.api, this.currentVersion, (app) => {
      this.isAppVersionOld = app.version !== this.currentVersion
      this.latestAppVersion = app.version
      this.newDownloadLink = app.download
      this.latestApp = app
    })
  }

  requestDownload () {
    window.open(this.newDownloadLink)
  }
}
