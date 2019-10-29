import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {

  @Output() output = new EventEmitter<File>();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(files: FileList) {
    if (files.length !== 1) {
      alert('Must choose exactly one file!');
      return;
    }
    console.log(files);
    this.output.emit(files[0]);
  }
}
