import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { FirestoreService } from '../../services/firestore.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-workspace-content',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTreeModule, NgClass],
  templateUrl: './workspace-content.component.html',
  styleUrl: './workspace-content.component.scss'
})
export class WorkspaceContentComponent {
  firestore = inject(FirestoreService);

  channelsOpen: boolean = false;
  channelsArrow: string = 'arrow_right';
  contactsOpen: boolean = false;
  contactsArrow: string = 'arrow_right';

  activeChannel: number | null = null;
  activeUser: number | null = null;

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

  chnageActiveChannel(i: number) {
    if (this.activeChannel === i) {
      this.activeChannel = null;
    } else {
      this.activeChannel = i;
    }
  }

  chnageActiveUser(i: number) {
    if (this.activeUser === i) {
      this.activeUser = null;
    } else {
      this.activeUser = i;
    }
  }

}
