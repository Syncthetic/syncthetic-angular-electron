import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { UpdateService } from '../../services/update/update.service'
import { ElectronService } from '../../providers/electron.service'

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private electron: ElectronService,
    public updater: UpdateService,
  ) {
    if (!this.initialized) {
      this.initialized = true
      this.electron.ipcRenderer.on("download progress", (event, progress) => {
        const cleanProgressInPercentages = Math.floor(progress * 100)
        this.downloadInProgress = true
        this.downloadProgress = cleanProgressInPercentages
        this.ref.detectChanges()
      })

      this.electron.ipcRenderer.on("download complete", (event, file) => {
        this.downloadComplete = true
        this.executeFile(file)
        this.ref.detectChanges()
      })
    }
  }

  public downloadInProgress: boolean
  public downloadProgress: Number
  private initialized: boolean
  public displayDownload: boolean = false
  public downloadComplete: boolean = false

  ngOnInit() {
    this.startLoop()
  }

  executeFile(file) {
    let currentAppPath = this.electron.remote.app.getPath('exe')
    console.log('pre should remove', currentAppPath)
    let parameters = [`--remove-app=${currentAppPath}`]
    this.electron.childProcess.execFile(file, parameters, function (err, data) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data.toString());
    });
    

  }

  startLoop () {
    this.updater.check((res) => {
      this.displayDownload = res
      console.log('set to', res)
      this.ref.detectChanges()
    })
    setInterval(this.loopMethod.bind(this), 60000)
  }

  displayDownloadPrompt () {
    return this.updater.isAppVersionOld
  }
  loopMethod () {
    this.updater.check((res) => {
      this.displayDownload = res
      console.log('set to', res)
      this.ref.detectChanges()
    })
  }

}