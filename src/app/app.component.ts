import { Component, inject } from '@angular/core';
import { Database, ref, get, DatabaseReference } from '@angular/fire/database';
import { DininghallGridComponent } from './dininghall-grid/dininghall-grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private database: Database = inject(Database);
  private reference: DatabaseReference;

  constructor() {
    this.reference = ref(this.database, '/Commons');
    this.getData('Commons');
  }

  getData(data: string) {
    get(this.reference)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
      });
  }
}
