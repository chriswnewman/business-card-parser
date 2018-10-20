import { Component, OnInit } from '@angular/core';
import { BusinessCardParser } from '../business-card-parser.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContactInfo } from '../contact-info';

/** DemoComponent shows off the functionality of the BusinessCardParser */
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  /** debounce time for textarea */
  private DEBOUNCE_TIME = 200;

  /** ContactInfo object that gets displayed in the view */
  public output: ContactInfo;

  /** form control reference */
  public textarea: FormControl = new FormControl();

  /** constructor */
  constructor(private parser: BusinessCardParser) { }

  /**
   * listen for input value changes and call BusinessCardParser.getContactInfo
   */
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
