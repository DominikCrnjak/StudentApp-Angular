import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean;
  currentLanguage: string;

  constructor(
    private loginService: LoginService,
    public userService: UserService,
    private translateService: TranslateService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
    this.setCurrentLanguageDropdownValue();
  }

  setCurrentLanguageDropdownValue() {
    if (this.translateService.currentLang === "hr") {
      this.translateService.get('language.croatian').subscribe(language => this.currentLanguage = language);
    } else if (this.translateService.currentLang === "en") {
      this.translateService.get('language.english').subscribe(language => this.currentLanguage = language);
    } else {
      throw Error('Unknown current language!');
    }
  }


  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }

  onLanguageChange(newLanguage: string) {
    this.translateService.use(newLanguage).subscribe(
      languageSwitched => this.setCurrentLanguageDropdownValue()
    );
  }
}
