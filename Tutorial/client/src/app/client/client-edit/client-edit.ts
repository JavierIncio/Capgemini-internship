import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../model/client.class';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client-service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-client-edit',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './client-edit.html',
  styleUrl: './client-edit.scss',
})
export class ClientEdit implements OnInit {
  client: Client;

  public data = inject(MAT_DIALOG_DATA) as { client: Client };
  public dialogRef = inject(MatDialogRef<ClientEdit>);
  public clientService = inject(ClientService);

  ngOnInit(): void {
    this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();
  }

  onSave() {
    this.clientService.saveClient(this.client).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
