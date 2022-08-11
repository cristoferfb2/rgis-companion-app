import { Component, NgZone } from '@angular/core';
import { fader } from './route-animations';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { BackButtonService } from './services/back-button.service';


@Component({
  selector: 'app-root',
  animations: [
    fader
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private statusBar: StatusBar, 
    private router: Router, 
    private zone: NgZone,
    private backButtonService: BackButtonService
  ) {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#990033');
    App.addListener('backButton', event=>{
      if (window.location.href.includes('search'))
        this.zone.run(()=>this.router.navigate(['']));
      else if (!window.location.href.includes('loading')) {
        if (this.backButtonService.modal)
          this.backButtonService.modal.dismiss();
      }
      event.canGoBack = false;
      return event;
    });
  }
}
