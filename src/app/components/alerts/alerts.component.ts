import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../../services/update/update.service'

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(
    public updater: UpdateService,
  ) { }

  ngOnInit() {
    this.updater.check()
    this.startLoop()
  }

  startLoop () {
    setInterval(this.loopMethod.bind(this), 60000)
  }

  loopMethod () {
    this.updater.check()
  }

}
