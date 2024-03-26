import { Component, Input } from '@angular/core';
import { DininghallComponent } from '../dininghall/dininghall.component';

@Component({
  selector: 'app-dininghall-grid',
  templateUrl: './dininghall-grid.component.html',
  styleUrl: './dininghall-grid.component.css',
})
export class DininghallGridComponent {
  @Input() commons: any;
  @Input() roth: any;
  @Input() ebi: any;
  @Input() zeppos: any;

  diningHalls = [
    {
      name: 'Rothschild',
      main_items: ['Steak', 'Main Item 2'],
      side_items: ['Side Item 1', 'Side Item 2'],
      grains: ['Grain 1', 'Grain 2'],
      location: '2301 West End Ave',
      image: '../../assets/rothschild.jpg',
    },
    {
      name: 'EBI',
      main_items: ['Main Item 1', 'Main Item 2'],
      side_items: ['Side Item 1', 'Side Item 2'],
      grains: ['Grain 1', 'Grain 2'],
      image: '../../assets/ebi.jpg',
    },
    {
      name: 'Zeppos',
      main_items: ['Main Item 1', 'Main Item 2'],
      side_items: ['Side Item 1', 'Side Item 2'],
      grains: ['Grain 1', 'Grain 2'],
      image: '../../assets/zeppos.jpg',
    },
    {
      name: 'Commons Center',
      main_items: ['Main Item 1', 'Main Item 2'],
      side_items: ['Side Item 1', 'Side Item 2'],
      grains: ['Grain 1', 'Grain 2'],
      image: '../../assets/commons.jpg',
    },
  ];

  ngOnChanges() {
    this.diningHalls = [];
    if (this.commons) {
      this.diningHalls.push({
        name: 'Commons Center',
        main_items: this.commons.main_items.slice(0, 2),
        side_items: this.commons.side_items.slice(0, 2),
        grains: this.commons.grains.slice(0, 2),
        image: '../../assets/commons.jpg',
      });
    }
    if (this.zeppos) {
      this.diningHalls.push({
        name: 'Zeppos',
        main_items: this.zeppos.main_items.slice(0, 2),
        side_items: this.zeppos.side_items.slice(0, 2),
        grains: this.zeppos.grains.slice(0, 2),
        image: '../../assets/zeppos.jpg',
      });
    }
    if (this.roth) {
      this.diningHalls.push({
        name: 'Rothschild',
        main_items: this.roth.main_items.slice(0, 2),
        side_items: this.roth.side_items.slice(0, 2),
        grains: this.roth.grains.slice(0, 2),
        image: '../../assets/rothschild.jpg',
      });
    }
    if (this.ebi) {
      this.diningHalls.push({
        name: 'EBI',
        main_items: this.ebi.main_items.slice(0, 2),
        side_items: this.ebi.side_items.slice(0, 2),
        grains: this.ebi.grains.slice(0, 2),
        image: '../../assets/ebi.jpg',
      });
    }
  }
}
