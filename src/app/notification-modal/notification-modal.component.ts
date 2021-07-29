import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  public error: boolean;
  public message: string;
  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('notifi', data);
    this.error = data.error;
    this.message = data.message;
  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
