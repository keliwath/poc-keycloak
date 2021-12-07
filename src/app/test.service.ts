import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private backend: HttpBackend) { }

  public test(): Observable<string[]> {
    return this.http.get<string[]>('api/test/people');
  }

  public admin(): Observable<any> {
    return this.http.get<any>('api/test/admin');
  }

  public cert(): Observable<any> {
    const client = new HttpClient(this.backend);
    return client.get<any>(environment.tls, { withCredentials: true });
  }

  public sso(token: string, realm: string | undefined): Observable<any> {
    return this.http.get<any>(`${environment.keycloak}/realms/${realm}/sso`, { withCredentials: true, headers: {
      Authorization: `Bearer ${token}`
    }});
  }

}
