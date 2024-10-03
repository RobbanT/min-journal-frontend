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
        if (this.password == this.passwordConfirm) {
            fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password,
                }),
            }).then((res) => res.json()).then(() => {
                alert(`Användaren "${this.username}" är nu registrerad!`);
                this.changeTitle('Hem');
            }).catch(() =>
                alert(`Användaren "${this.username}" existerar redan. Försök igen!`)
            );
        } else {
            alert('Lösenorden stämmer inte överens. Försök igen!');
        }
    }
}
