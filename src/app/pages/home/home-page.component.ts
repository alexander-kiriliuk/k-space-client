import {Component, inject, OnInit} from "@angular/core";
import {getDirsForSync} from "../dirs-picker/dirs-picker.constants";
import {Router} from "@angular/router";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
  standalone: true,
  imports: []
})
export class HomePageComponent implements OnInit {

  private readonly router = inject(Router);

  async ngOnInit() {
    const dirs = await getDirsForSync();
    if (!dirs) {
      this.router.navigateByUrl("/dirs-picker");
    }
    // todo
  }

}
