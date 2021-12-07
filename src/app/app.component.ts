import { TestService } from './test.service';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { environment } from 'src/environments/environment';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc-keycloak';

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService, private readonly service: TestService) { }

  public async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.keycloak.keycloakEvents$.subscribe({
      next: e => {
        if (e.type === KeycloakEventType.OnTokenExpired) {
          this.keycloak.updateToken(20).catch(() => {
            alert('sesión expirada');
            this.keycloak.logout('http://localhost:4200');
          });
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

  public console(): void {
    window.location.href = `${environment.keycloak}/realms/${this.keycloak.getKeycloakInstance().realm}/account/`;
  }

  public tls(): void {
    this.service.cert().pipe(
      mergeMap((res: any) => this.service.sso(res.access_token, this.keycloak.getKeycloakInstance().realm))
    ).subscribe(() => this.keycloak.login());
  }

}
