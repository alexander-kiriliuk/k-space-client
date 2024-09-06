import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class LayoutComponent {

}
