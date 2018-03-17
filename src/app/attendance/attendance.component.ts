import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  pageTitle: string = 'Attendance';
  constructor() { }

  ngOnInit() {
  }

}
