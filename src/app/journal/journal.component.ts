import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post, States } from '../models/post.model';

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css',
})
export class JournalComponent {
  posts: Array<Post> = [];
  rerender = signal(false);
  state: States = States.SAD;
  note: string = '';
  datePickerMax: String = '2025-01-01';
  datePickerMin: String = '2024-01-01';
  constructor() {
    fetch(
      `http://localhost:8080/user/${
        JSON.parse(localStorage.getItem('user') as string).username
      }/posts`,
      {
        headers: {
          'Content-Type': 'application/json',
          minDate: '2024-01-01',
          maxDate: '2025-01-01',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => (this.posts = data));
  }
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

  pickMaxDate(event: any) {
    console.log(event.target.value);
    if (event.target.value < this.datePickerMin) {
      event.target.value = this.datePickerMin;
    }
  }

  pickMinDate(event: any) {
    console.log(event.target.value);
    if (event.target.value > this.datePickerMax) {
      event.target.value = this.datePickerMax;
    }
  }
}
