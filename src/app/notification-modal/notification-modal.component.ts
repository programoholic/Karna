import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  public data: boolean;
  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>, @Inject(MAT_DIALOG_DATA) public datas: boolean) {
    this.data = datas;
  }

  ngOnInit(): void {
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
