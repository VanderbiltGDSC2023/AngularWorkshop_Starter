import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dininghall',
  templateUrl: './dininghall.component.html',
  styleUrl: './dininghall.component.css',
})
export class DininghallComponent {
  @Input() hall: any;
}
