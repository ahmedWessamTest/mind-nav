import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlankLayoutComponent } from "./layouts/blank-layout/blank-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
}
