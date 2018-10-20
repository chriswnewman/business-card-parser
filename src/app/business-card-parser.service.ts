import { Injectable } from '@angular/core';
import { ContactInfo } from './contact-info';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardParser {
  getContactInfo(document: string): ContactInfo {
    const infoArr = document.split('\n');
    let name, phoneNumber, email;

    // return null if there isn't enough information
    if (infoArr.length < 3) {
      console.error(
        'cant create ContactInfo object from less than three lines of input'
      );
      return null;
    }

    email = this.parseEmail(infoArr);
    name = this.parseName(infoArr, email);
    phoneNumber = this.parsePhoneNumber(infoArr);

    return new ContactInfo(name, phoneNumber, email);
  }

  // TODO: find name that has similar content to email address
  parseName(infoArr: string[], emailAddress: string) {
    if (!emailAddress) {
      console.error('cant find person name without email address');
      return;
     }
    return 'name';
  }

  parsePhoneNumber(infoArr: string[]): string {
    let phoneNumber;
    for (let i = 0; i < infoArr.length; i++) {
      let line = infoArr[i];
      line = line.toLowerCase();

      // skip fax numbers
      const faxMatch = line.match(/fax/g);
      if (faxMatch && faxMatch.length > 0) {
        continue;
      }

      // remove whitespaces, parens, '+' and '-'
      line = line.replace(/[\s'()\+-]/g, '');

      // match phone number (sequence of at least 10 numerics)
      const match = line.match(/[0-9]{10,}/g);
      if (match && match.length > 0) {
        phoneNumber = match[0];
        break;
      }
    }
    return phoneNumber;
  }

  parseEmail(infoArr: string[]) {
    let email;
    for (let i = 0; i < infoArr.length; i++) {
      let line = infoArr[i];
      // if line doesn't contain '@', skip to next line
      if (!line.includes('@')) {
        continue;
      }

      // split line into segments and check each segment for an email address
      line = line.toLowerCase();
      const segments = line.split(' ');

      for (let j = 0; j < segments.length; j++) {
        const segment = segments[j];
        // simple email regex
        const match = segment.match(/.+\@.+\..+/);
        if (match && match.length > 0) {
          email = match[0];
          break;
        }
      }
    }
    return email;
  }
}
