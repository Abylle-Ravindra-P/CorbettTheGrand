import { Component, ChangeDetectionStrategy, model} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

interface Room {
  value: string;
  viewValue: string;
}
interface Gst {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-booka-room',
  templateUrl: './booka-room.html',
  styleUrl: './booka-room.css',
  imports: [MatFormFieldModule, MatCardModule, MatDatepickerModule, FormsModule, MatSelectModule, MatInputModule, MatButtonModule, MatExpansionModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookaRoom {
rooms: Room[] = [
    {value: '1-0', viewValue: '1'},
    {value: '2-1', viewValue: '2'},
    {value: '3-2', viewValue: '3'},
  ];
havegst: Gst[] = [
    {value: 'Yes-0', viewValue: 'Yes'},
    {value: 'No-1', viewValue: 'No'},
  ];
  selected = model<Date | null>(null);
}
