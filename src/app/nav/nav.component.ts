import { Component, output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  changedTitle = output<string>();

  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }

  logOut() {
    // Logga ut kod här.
    this.changedTitle.emit('Hem');
  }

  showJournal = true;
  showLogin = true;
  showOut = true;
  showRegister = true;
}
