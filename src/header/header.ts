import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
