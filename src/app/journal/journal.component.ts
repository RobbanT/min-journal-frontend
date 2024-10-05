import { Component, output } from '@angular/core';
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
    state: States = States.HAPPY;
    stateStatistics: string = "";
    note: string = '';
    datePickerMax: string = localStorage.getItem('datePickerMax') != null ? (localStorage.getItem('datePickerMax') as string) : '2025-01-01';
    datePickerMin: string =localStorage.getItem('datePickerMin') != null ? (localStorage.getItem('datePickerMin') as string) : '2024-01-01';

    constructor() {
        this.fetchPosts();
    }

    fetchPosts() {
        fetch(`https://min-journal-app-gmr2z.ondigitalocean.app/user/${JSON.parse(localStorage.getItem('user') as string).username}/posts`, {
        headers: {
            'Content-Type': 'application/json',
            minDate: this.datePickerMin,
            maxDate: this.datePickerMax,
        },
        }).then((res) => res.json()).then((data) => {
            this.posts = data;
            let tempStateStatistics = new Map<string, number>();
            for (let post of this.posts) {
                post.createdTime = post.createdTime.replace('T', ' - ').slice(0, 18);
                tempStateStatistics.set(post.state.toString(), tempStateStatistics.get(post.state.toString()) == null ? 1 : <number>tempStateStatistics.get(post.state.toString()) + 1);
            }
            this.stateStatistics = `SAD (${tempStateStatistics.get("SAD") != null ? (<number>tempStateStatistics.get("SAD") / this.posts.length * 100).toFixed(2): 0}%) 
                HAPPY (${tempStateStatistics.get("HAPPY") != null ? (<number>tempStateStatistics.get("HAPPY") / this.posts.length * 100).toFixed(2): 0}%) 
                STRESSED (${tempStateStatistics.get("STRESSED") != null ? (<number>tempStateStatistics.get("STRESSED") / this.posts.length * 100).toFixed(2): 0}%)
                ANGRY (${tempStateStatistics.get("ANGRY") != null ? (<number>tempStateStatistics.get("ANGRY") / this.posts.length * 100).toFixed(2): 0}%)
                TIRED (${tempStateStatistics.get("TIRED") != null ? (<number>tempStateStatistics.get("TIRED") / this.posts.length * 100).toFixed(2): 0}%)`
        });
    }

    formSubmit() {
        fetch(`https://min-journal-app-gmr2z.ondigitalocean.app/user/${JSON.parse(localStorage.getItem('user') as string).username}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: this.state,
                note: this.note,
            }),
        }).then((res) => res.json()).then(() => {
            this.state = States.HAPPY;
            this.note = "";
            this.fetchPosts();
        }).catch(() => alert('Något gick fel. Försök igen!'));
    }

    pickMinDate(event: any) {
        console.log(event.target.value);
        if (event.target.value > this.datePickerMax) {
            event.target.value = this.datePickerMax;
        }
        localStorage.setItem('datePickerMin', event.target.value);
        console.log(event.target.value);
        this.fetchPosts();
    }

    pickMaxDate(event: any) {
        console.log(event.target.value);
        if (event.target.value < this.datePickerMin) {
            event.target.value = this.datePickerMin;
        }
        console.log(event.target.value);
        localStorage.setItem('datePickerMax', event.target.value);
        this.fetchPosts();
    }
}
