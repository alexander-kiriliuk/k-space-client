import {Component, OnInit, signal} from "@angular/core";
import {IonContent} from "@ionic/angular/standalone";
import {Directory, FileInfo, Filesystem} from "@capacitor/filesystem";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
  standalone: true,
  imports: [
    IonContent
  ]
})
export class HomePageComponent implements OnInit {

  dirs = signal<FileInfo[]>(undefined);
  currentDir = signal("");

  ngOnInit() {
    this.readDir();
  }

  readDir(dirName = "") {
    Filesystem.requestPermissions().then(result => {
      if (result.publicStorage !== "granted") {
        // todo alert
        return;
      }
      const requestedDir = this.currentDir() + "/" + dirName;
      console.debug(`Attempting to read directory: ${requestedDir}`);
      Filesystem.readdir({
        path: requestedDir,
        directory: Directory.ExternalStorage
      }).then(res => {
        if (res.files.length === 0) {
          console.debug("Directory is empty or cannot be read.");
        } else {
          this.currentDir.set(requestedDir.replace(/^\/+|\/+$/g, ""));
          console.debug("Files found:", res.files);
        }
        this.dirs.set(res.files);
      }).catch(err => {
        console.error("Error while reading directory:", err);
      });
    }).catch(err => {
      console.error("Permissions err:", err);
    });
  }

}
