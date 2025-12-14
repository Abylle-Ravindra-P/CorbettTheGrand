import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

declare var bootstrap: any; // Required for Bootstrap Offcanvas JS

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  constructor(private router: Router) {}

  closeMenu() {
    const offcanvasEl = document.getElementById('offcanvasExample');
    if (!offcanvasEl) return;

    const instance =
      bootstrap.Offcanvas.getInstance(offcanvasEl) ||
      new bootstrap.Offcanvas(offcanvasEl);

    instance.hide();
  }
}
