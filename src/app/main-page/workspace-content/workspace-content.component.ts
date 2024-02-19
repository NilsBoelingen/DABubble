import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-workspace-content',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTreeModule],
  templateUrl: './workspace-content.component.html',
  styleUrl: './workspace-content.component.scss'
})
export class WorkspaceContentComponent {
  channelsOpen: boolean = false;
  channelsArrow: string = 'arrow_right';
  contactsOpen: boolean = false;
  contactsArrow: string = 'arrow_right';

  switchChannels() {
    if (this.channelsOpen) {
      this.channelsOpen = false;
      this.channelsArrow = 'arrow_right';
    } else {
      this.channelsOpen = true;
      this.channelsArrow = 'arrow_drop_down';
    }
  }

  switchContacts() {
    if (this.channelsOpen) {
      this.contactsOpen = false;
      this.contactsArrow = 'arrow_right';
    } else {
      this.contactsOpen = true;
      this.contactsArrow = 'arrow_drop_down';
    }
  }

}
