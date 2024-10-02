import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { States } from '../models/post.model';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css',
})
export class JournalComponent {
  rerender = signal(false);
  state: States = States.SAD;
  note: string = '';
  formSubmit() {
    fetch(
      `http://localhost:8080/user/${
        JSON.parse(localStorage.getItem('user') as string).username
      }/post`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: this.state,
          note: this.note,
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        this.rerender.set(!this.rerender());
      })
      .catch(() => alert('Något gick fel. Försök igen!'));
  }
}
