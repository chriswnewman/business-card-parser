import { Injectable } from '@angular/core';
import { ContactInfo } from './contact-info';

/**
 * Provides functionality for parsing OCR'd business card information into a ContactInfo object.
 */
@Injectable({
  providedIn: 'root'
})
export class BusinessCardParser {
  /**
   * parses a document string and returns a ContactInfo object.
   *
   * the parsing implementation makes the following optimistic assumptions about the document data:
   *
   * 1) the document string is newline separated list of information
   *
   * 2) if an email address exists: it is a properly formatted and valid email address
   *
   * 3) the sequence of chars in a person's name is similar to the sequence of chars in their business email.
   * this implementation does not rely on NLP to identify human names.
   *
   * @param document - string to be parsed
   */
  public getContactInfo(document: string): ContactInfo {
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

  /**
   * private helper function that searches each line of info and returns the first email address found.
   * @param infoArr - string array
   * @returns - email address string or null if not found
   */
  private parseEmail(infoArr: string[]) {
    let email = null;
    console.log(email);
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
        // based on assumption #2, use simple email regex
        const match = segment.match(/.+\@.+\..+/);
        if (match && match.length > 0) {
          email = match[0];
          break;
        }
      }
    }
    return email;
  }

  /**
   * private  helper function that searches each line of info and returns the first person name that's
   * closely related to the email address.
   *
   * @param infoArr - string array
   * @param emailAddress email address to compare against
   * @returns person name string or null if not found
   */
  private parseName(infoArr: string[], emailAddress: string) {
    if (!emailAddress) {
      console.error('cant find person name without email address');
      return;
    }
    let name = null;
    const eid = emailAddress.split('@')[0];
    const eidSegments = eid.split('.');
    if (eidSegments.length > 1) {
      name = handleLongEid(infoArr, eidSegments);
    } else {
      name = handleShortEid(infoArr, eid);
    }
    return name;

     /** @ignore inner helper function for handling long eids
      *
      * returns a match if most of the eid segments are found in a line
     */
     function handleLongEid(arr: string[], segments: string[]): string {
      let result = null;
      // check each line
      for (let i = 0; i < arr.length; i++) {
        const line = arr[i];
        // skip email line
        if (line.includes('@')) { continue; }

        let lineMatch = false;
        // check if each segment exists in line
        let segmentMatchCount = 0;
        for (let s = 0; s < segments.length; s++) {
          const segment = segments[s];
          if (line.toLowerCase().includes(segment)) {
            segmentMatchCount++;
          }
          // if last iteration
          // and at least n-1 segments are found in line, lineMatch = true
          // (Name - Chris Newman; Email: chris.w.newman@example.com)
          if ( s === segments.length - 1 && segmentMatchCount >= segments.length - 1) {
            lineMatch = true;
          }
        }
        if (lineMatch) {
          result = line.trim();
          break;
        }
      }
      return result;
    }

    /**
     * @ignore inner helper function for handling short eids
     *
     * simply checks for last name
    */
    function handleShortEid(arr: string[], shortEid: string): string {
      let result = null;
      for (let i = 0; i < arr.length; i++) {
        const line = arr[i];
        // skip email line
        if (line.includes('@')) {
          continue;
        }

        // check if last name exists in line
        const lastName = shortEid.substring(1);
        if (line.toLowerCase().includes(lastName)) {
          result = line.trim();
          break;
        }
      }
      return result;
    }
  }

  /**
   * private helper function that searches each line of info
   * and returns the first phone number found in the string array. skips fax numbers.
   * @param infoArr - string array
   * @returns phone number string or null if not found
   */
  private parsePhoneNumber(infoArr: string[]): string {
    let phoneNumber = null;
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

}
