import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-extangularapp',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-container #container></ng-container>`,
})
export class ExtangularappComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  ngOnInit() {
    this.loadRemoteComponent();
  }

  async loadRemoteComponent() {
    const remoteModule = await loadRemoteModule('angular-mfe', './Component'); // Replace with your remote module URL
    console.log('remoteComponent', remoteModule);
    //const remoteComponent = await remoteModule.get('AppComponent'); // Replace with your remote component name

    const componentRef = this.container.createComponent(
      remoteModule.AppComponent
    );
  }
}
