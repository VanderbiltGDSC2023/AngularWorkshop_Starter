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
  commons: any;
  roth: any;
  zeppos: any;
  ebi: any;

  constructor() {
    this.reference = ref(this.database, '/Commons');
    this.getData('Commons');
    this.reference = ref(this.database, '/Rothschild');
    this.getData('Rothschild');
    this.reference = ref(this.database, '/EBI');
    this.getData('EBI');
    this.reference = ref(this.database, '/Zeppos');
    this.getData('Zeppos');
  }

  getData(data: string) {
    get(this.reference)
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (data == 'Commons') {
            this.commons = snapshot.val();
          }
          if (data == 'Rothschild') {
            this.roth = snapshot.val();
          }
          if (data == 'EBI') {
            this.ebi = snapshot.val();
          }
          if (data == 'Zeppos') {
            this.zeppos = snapshot.val();
          }
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error getting data:', error);
      });
  }
}
