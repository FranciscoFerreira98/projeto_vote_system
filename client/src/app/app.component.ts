import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showMesaBoard = false;
  username?: string;
  isDarkTheme = false;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showMesaBoard = this.roles.includes('ROLE_MESA');

      this.username = user.username;
    }
   
  }
  changeTheme(): void {
    if (this.isDarkTheme) {
       document.getElementById('global-theme')!.setAttribute('href', 'assets/css/style.bundle.css');
       this.isDarkTheme = false;
       console.log(this.isDarkTheme);
    } else {
       document.getElementById('global-theme')!.setAttribute('href', 'assets/css/dark.bundle.css')!;
       this.isDarkTheme = true;
       console.log(this.isDarkTheme);
    }
 }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
