import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from "@angular/core";
import {Directory, FileInfo, Filesystem} from "@capacitor/filesystem";
import {
  AlertController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {arrowBackOutline, documentOutline, folderOutline} from "ionicons/icons";

@Component({
  selector: "dirs-picker",
  templateUrl: "./dirs-picker-page.component.html",
  styleUrl: "./dirs-picker-page.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonSpinner,
    IonButtons,
    IonContent,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class DirsPickerPageComponent implements OnInit {

  dirs = signal<FileInfo[]>(undefined);
  currentDir = signal("");
  pathTree = signal<string[]>([]);
  loaderVisibility = signal(true);
  isEmpty = signal(false);
  private readonly alertController = inject(AlertController);

  constructor() {
    addIcons({arrowBackOutline, folderOutline, documentOutline});
  }

  ngOnInit() {
    this.readDir("");
  }

  readDir(dirName = "", isFile?: boolean) {
    if (isFile) {
      return;
    }
    this.loaderVisibility.set(true);
    Filesystem.requestPermissions().then(async result => {
      if (result.publicStorage !== "granted") {
        const alert = await this.alertController.create({
          header: "Error",
          subHeader: "Access deny",
          buttons: ["OK"],
        });
        await alert.present();
        return;
      }
      this.loaderVisibility.set(true);
      const requestedDir = this.currentDir() + "/" + dirName;
      console.log(`Attempting to read directory: ${requestedDir}`);
      Filesystem.readdir({
        path: requestedDir,
        directory: Directory.ExternalStorage
      }).then(async res => {
        if (dirName.length && dirName !== "/") {
          this.pathTree.update(value => {
            value.push(dirName);
            return value;
          });
        }
        this.currentDir.set(requestedDir.replace(/^\/+|\/+$/g, ""));
        this.dirs.set(res.files);
        if (res.files.length === 0) {
          this.isEmpty.set(true);
        } else {
          this.isEmpty.set(false);
        }
      }).catch(async err => {
        const alert = await this.alertController.create({
          header: "Error",
          subHeader: err.message,
          buttons: ["OK"],
        });
        await alert.present();
      }).finally(() => {
        this.loaderVisibility.set(false);
      });
    }).catch(async err => {
      const alert = await this.alertController.create({
        header: "Error",
        subHeader: err.message,
        buttons: ["OK"],
      });
      await alert.present();
    }).finally(() => {
      this.loaderVisibility.set(false);
    });
  }

  moveBack() {
    const parts = this.currentDir().split("/");
    parts.splice(parts.length - 1);
    const currDir = parts.join("/");
    this.pathTree.update(value => {
      value.splice(value.length - 1);
      return value;
    });
    this.currentDir.set(currDir);
    this.readDir("");
  }

}
