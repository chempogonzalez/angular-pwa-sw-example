import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Angular PWA with custom Service Worker example';
  displayPrettyBanner = true;

  ngOnInit(): void {
    this.displayPrettyBanner = !this.isRunningStandalone();
  }

  /**
   * @description Check if the user is running the application from installed app
   */
  private isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  /**
   * @description Method to change the 'displayPrettyBanner' when customer interacts with the installer prompt
   * @param installed event from app-pretty-banner
   */
  userInteraction(installed) {
    if (installed) {
      this.displayPrettyBanner = false;
    } else {
      this.displayPrettyBanner = true;
    }
  }
}
