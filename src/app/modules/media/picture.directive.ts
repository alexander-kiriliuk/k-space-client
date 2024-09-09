import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges
} from "@angular/core";
import {Media, MediaFile} from "../../global/types";
import {ReservedMediaFormat} from "./media.constants";
import {LocalizePipe} from "../locale/localize.pipe";
import {MediaUrlPipe} from "./media-url.pipe";
import {Preferences} from "@capacitor/preferences";
import {API_HOST_TOKEN} from "../http/http.constants";

@Directive({
  selector: "[pic]",
  standalone: true,
  providers: [
    MediaUrlPipe,
    LocalizePipe
  ]
})
export class PictureDirective implements OnChanges, OnDestroy {

  src = input.required<Media>();
  color = input("ECECEC");
  alt = input<string>();
  placeholderFile = input<string>();
  format = input<string>(ReservedMediaFormat.ORIGINAL);
  private observer: IntersectionObserver;
  private readonly host = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly localizePipe = inject(LocalizePipe);
  private readonly mediaUrlPipe = inject(MediaUrlPipe);

  get url(): string {
    return this.mediaUrlPipe.transform(this.src(), this.format());
  }

  get file(): MediaFile {
    return this.src()?.files?.find(v => v.format.code === this.format());
  }

  @HostBinding("attr.width")
  get width(): string {
    return this.file?.width ? this.file.width.toString() : undefined;
  }

  @HostBinding("attr.height")
  get height(): string {
    return this.file?.height ? this.file.height.toString() : undefined;
  }

  get placeholder() {
    if (this.placeholderFile()) {
      return this.placeholderFile();
    }
    return `data:image/svg+xml,%3Csvg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 ${this.width} ${this.height}'%3E%3Crect width='${this.width}'
            height='${this.height}' fill='%23${this.color()}'%3E%3C/rect%3E%3C/svg%3E`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes["media"] && !changes["media"].firstChange) || (changes["url"] && !changes["url"].firstChange)) {
      this.renderer.setAttribute(this.host.nativeElement, "src", this.url);
      return;
    }
    this.renderer.setAttribute(this.host.nativeElement, "src", this.placeholder);
    let alt = this.alt();
    if (!alt) {
      alt = this.localizePipe.transform(this.src()?.name) as string;
    }
    this.renderer.setAttribute(this.host.nativeElement, "alt", alt);

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          const imgElement = entry.target as HTMLImageElement;
          const res = await Preferences.get({key: API_HOST_TOKEN});
          imgElement.src = `${res.value}/media${this.url}`;
          this.observer.unobserve(imgElement);
        }
      });
    }, {
      rootMargin: "0px",
      threshold: 0.1
    });
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
