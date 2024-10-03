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
  datePickerMax: string = localStorage.getItem('datePickerMax') != null ? localStorage.getItem('datePickerMax') as string : '2025-01-01';
  datePickerMin: string = localStorage.getItem('datePickerMin') != null ? localStorage.getItem('datePickerMin') as string : '2024-01-01';
  mostCommonState: States = States.SAD;
  constructor() {
    fetch(
      `http://localhost:8080/user/${
        JSON.parse(localStorage.getItem('user') as string).username
      }/posts`,
      {
        headers: {
          'Content-Type': 'application/json',
          minDate: this.datePickerMin,
          maxDate: this.datePickerMax,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.posts = data;
        for (let post of this.posts) {
          post.createdTime = post.createdTime.replace('T', ' - ').slice(0, 18);
        }

        let tempArray = [];
        for (let post of this.posts) {
          tempArray.push(post.state);
        }

        tempArray.sort((a, b) => a - b);
        let count = 1,
          max = 0,
          element;

        for (let i = 1; i < tempArray.length; ++i) {
          if (tempArray[i] === tempArray[i - 1]) {
            count++;
          } else {
            count = 1;
          }

          if (count > max) {
            max = count;
            element = tempArray[i];
          }
        }
        this.mostCommonState = element as States;
      });    
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
        this.rerender.set(this.rerender());
      })
      .catch(() => alert('Något gick fel. Försök igen!'));
  }

  pickMaxDate(event: any) {
    if (event.target.value < this.datePickerMin) {
      event.target.value = this.datePickerMin;
    }
    localStorage.setItem('datePickerMax', event.target.value);
  }

  pickMinDate(event: any) {
    if (event.target.value > this.datePickerMax) {
      event.target.value = this.datePickerMax;
    }
    localStorage.setItem('datePickerMin', event.target.value);
  }
}
