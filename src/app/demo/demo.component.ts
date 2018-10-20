import { Component, OnInit } from '@angular/core';
import { BusinessCardParser } from '../business-card-parser.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContactInfo } from '../contact-info';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  private DEBOUNCE_TIME = 500;
  public output: ContactInfo;
  public textarea: FormControl = new FormControl();

  constructor(private parser: BusinessCardParser) { }

  ngOnInit() {
    this.textarea.valueChanges
      .pipe(
        debounceTime(this.DEBOUNCE_TIME),
        distinctUntilChanged()
      )
      .subscribe(document => {
        this.output = this.parser.getContactInfo(document);
      });
  }
}
