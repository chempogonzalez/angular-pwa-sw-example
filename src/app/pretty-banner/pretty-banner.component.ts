import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-pretty-banner',
  templateUrl: './pretty-banner.component.html',
  styleUrls: ['./pretty-banner.component.scss'],
})
export class PrettyBannerComponent implements OnInit {

  @Output() installed = new EventEmitter<boolean>();
  @HostBinding('class') hostClass = 'animated fadeInUp';

  deferredPrompt: any;
  customError: string;


  constructor() { }

  ngOnInit() {
    this.initListenerToInstallTheApp();
  }

  /**
   * @description Add the beforeinstallprompt listener and stash the event to be
   *              triggered later (stashed in deferredPrompt)
   */
  private initListenerToInstallTheApp(): any {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = event;
    });
  }

  /**
   * @description Event triggered by the user clicking in the ADD button. Displays the error if an error occurs
   */
  installApp() {
    if (this.deferredPrompt) {
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
            this.installed.emit(true);
          } else {
            console.log('User dismissed the A2HS prompt');
            this.installed.emit(false);
          }
          this.deferredPrompt = null;
        });

    } else {
      this.customError = 'An error has occurred and it was not possible to open the installer prompt';
      setTimeout(() => {
        this.customError = '';
      },      4500);
    }
  }

  /**
   * @description Change the host class value to animate it with a fadeOutDown
   */
  closeBanner() {
    this.hostClass = 'animated fadeOutDown';
  }

}
