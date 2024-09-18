import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HomePageComponent {

}
