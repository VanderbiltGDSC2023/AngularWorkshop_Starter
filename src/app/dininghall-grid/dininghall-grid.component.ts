import { Component, Input } from '@angular/core';
import { DininghallComponent } from '../dininghall/dininghall.component';

@Component({
  selector: 'app-dininghall-grid',
  templateUrl: './dininghall-grid.component.html',
  styleUrl: './dininghall-grid.component.css',
})
export class DininghallGridComponent {
  diningHalls = [
    {
      name: 'Rothschild',
      main_items: ['Steak', 'Main Item 2'],
      side_items: ['Side Item 1', 'Side Item 2'],
      grains: ['Grain 1', 'Grain 2'],
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
}
