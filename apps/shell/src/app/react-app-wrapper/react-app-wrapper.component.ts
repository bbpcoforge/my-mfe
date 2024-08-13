import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';

@Component({
  selector: 'app-react-app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './react-app-wrapper.component.html',
  styleUrl: './react-app-wrapper.component.css',
})
export class ReactAppWrapperComponent implements OnInit {
  @ViewChild('reactmfe', { static: true }) containerRef!: ElementRef;

  ngOnInit() {
    loadRemoteModule('react-mfe', './ReactApp').then((m) => {
      console.log('remote react mfew::', m);
      m.mount(this.containerRef.nativeElement);
    });
  }
}
