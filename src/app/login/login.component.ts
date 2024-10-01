import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  changedUserLoggedIn = output<boolean>();
  changedTitle = output<string>();
  username: string = '';
  password: string = '';

  changeUserIsLoggedIn(userLoggedIn: boolean) {
    this.changedUserLoggedIn.emit(userLoggedIn);
  }
  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }
  formSubmit() {
    fetch(`http://localhost:8080/user/${this.username}/${this.password}`)
      .then((res) => res.json())
      .then((data) => {
        (data as User).password = '';
        (data as User).posts = [];
        localStorage.setItem('user', JSON.stringify(data));
        alert(`Användaren "${this.username}" är nu inloggad!`);
        this.changeUserIsLoggedIn(true);
        this.changeTitle('Hem');
      })
      .catch(() =>
        alert(
          `Användaren "${this.username}" med lösenordet "${this.password}" existerar inte. Försök igen!`
        )
      );
  }
}
