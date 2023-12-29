import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";
import { FileValidators } from "ngx-file-drag-drop";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  fileControl = new FormControl(
    [],
    [FileValidators.required,
    FileValidators.maxFileCount(2)]
  );

  @Output() fileUploadedChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(file: File[]) {
    this.fileUploadedChanged.emit(file);
  }

}
