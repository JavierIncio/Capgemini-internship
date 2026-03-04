import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-confirmation',
  imports: [MatButtonModule],
  templateUrl: './dialog-confirmation.html',
  styleUrl: './dialog-confirmation.scss',
})
export class DialogConfirmation {
  title: string;
  description: string;

  public data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<DialogConfirmation>);

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
  }

  onClose(value = false) {
    this.dialogRef.close(value);
  }
}
