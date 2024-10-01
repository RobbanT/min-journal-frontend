import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  changedTitle = output<string>();
  username: string = '';
  password: string = '';
  passwordConfirm: string = '';

  changeTitle(title: string) {
    this.changedTitle.emit(title);
  }
  formSubmit() {
    console.log('Form submit');
    this.changeTitle('Hem');
  }
}
