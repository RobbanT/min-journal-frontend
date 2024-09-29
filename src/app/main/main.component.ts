import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { JournalComponent } from '../journal/journal.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent, RegisterComponent, LoginComponent, JournalComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
