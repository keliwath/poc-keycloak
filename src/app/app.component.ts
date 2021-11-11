import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc-keycloak';

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.keycloak.keycloakEvents$.subscribe({
      next: e => {
        if (e.type === KeycloakEventType.OnTokenExpired) {
          this.keycloak.updateToken(20);
        }
      }
    });
  }

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.keycloak.logout('http://localhost:4200');
  }

  public profile(): void {
  }

}
