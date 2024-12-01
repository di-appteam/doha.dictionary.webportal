import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../app-shared/services/participant.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../app-shared/shared-sections/alert/alert.component';
import { AdminContainerComponent } from '../../app-shared/components/admin-container/admin-container.component';
import { ParticipantsService } from '../../../app-shared/services/participants.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ParticipantEditDialogComponent } from '../../app-shared/components/participant-edit-dialog/participant-edit-dialog.component';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../../app-shared/security/requests/http.service';
import { SharedService } from '../../../app-shared/services/shared.service';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, AlertComponent,AdminContainerComponent
    , RouterModule,DragDropModule ,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,],
  templateUrl: './participant-list.component.html',
  styleUrl: './participant-list.component.scss',
  providers:[ParticipantsService,HttpService,SharedService,HttpClient]
})
export class ParticipantListComponent implements OnInit {
  groups: any[] = [];
  filteredGroups: any[] = [];
  participants: any[] = [];
  selectedGroupId: number | null = null;

  constructor(
    private participantService: ParticipantsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Fetch participant groups on component load
    this.participantService.GetGroups().subscribe((data) => {

      this.groups = data;
      this.selectedGroupId = this.groups[0].groupid;
      this.onGroupChange(this.selectedGroupId??1);
      // Filter only active groups with `datadisplay` value 1
      this.filteredGroups = this.groups.filter(
        (group) => group.isactive
      );
    });
  }

  onGroupChange(groupId: number): void {
    this.selectedGroupId = groupId;

    // Fetch participants by group
    this.participantService.GetParticipantsByGroup(groupId).subscribe((data) => {
      this.participants = data;
    });
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.participants, event.previousIndex, event.currentIndex);

    // TODO: Send updated order to the server
    console.log('Updated order:', this.participants);
  }

  editParticipant(participant: any): void {
    const dialogRef = this.dialog.open(ParticipantEditDialogComponent, {
      data: {participant:participant,groups:this.groups},
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((updatedParticipant) => {
      if (updatedParticipant) {
        // Update the participant in the list
        const index = this.participants.findIndex(
          (p) => p.participantid === updatedParticipant.participantid
        );
        if (index !== -1) {
          this.participants[index] = updatedParticipant;
        }
      }
    });
  }
}
