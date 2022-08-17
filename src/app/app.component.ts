import { Component, NgZone } from '@angular/core';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { BackButtonService } from './services/back-button.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private statusBar: StatusBar, 
    private router: Router, 
    private zone: NgZone,
    private backButtonService: BackButtonService,
    private screen: ScreenOrientation,
    private nativePageTransitions: NativePageTransitions
  ) {
    // Statusbar configs
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#990033');
    // Screen orientation
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    // Back button handle
    App.addListener('backButton', event=>{
      if (window.location.href.includes('search'))
        this.zone.run(()=>{
          this.nativePageTransitions.slide({direction: 'right'});
          this.router.navigate([''])
        });
      else if (!window.location.href.includes('loading')) {
        if (this.backButtonService.modal)
          this.backButtonService.modal.dismiss();
      }
      event.canGoBack = false;
      return event;
    });
  }

  get showNavBar (): boolean {
    if (this.router.url.includes('loading'))
      return false;
    else if (this.router.url.includes('login'))
      return false;
    return true;
  }
}
