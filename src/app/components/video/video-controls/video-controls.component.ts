import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {BaseSettingsComponent} from '../../../modules/settings/settings.component';
import {MatTooltip} from '@angular/material/tooltip';
import {AsyncPipe} from '@angular/common';
import {IonFab, IonFabButton, IonIcon} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {videocamOffOutline, videocamOutline} from 'ionicons/icons';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss'],
  standalone: true,
  imports: [MatTooltip, AsyncPipe, IonFab, IonFabButton, IonIcon],
})
export class VideoControlsComponent extends BaseSettingsComponent {
  constructor(store: Store) {
    super(store);

    addIcons({videocamOutline, videocamOffOutline});
  }
}
