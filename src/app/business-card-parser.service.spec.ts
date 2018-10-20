import { TestBed } from '@angular/core/testing';
import { BusinessCardParser } from './business-card-parser.service';
import { ContactInfo } from './contact-info';

describe('BusinessCardParser', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
    expect(parser).toBeTruthy();
  });


  describe('should return ContactInfo object', () => {

    it('should correctly handle example 1', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      const ci = parser.getContactInfo(
        `ASYMMETRIK LTD
        Mike Smith
        Senior Software Engineer
        (410)555-1234
        msmith@asymmetrik.com`
      );
      expect(ci).toEqual(jasmine.any(ContactInfo));
      expect(ci).toEqual(new ContactInfo('Mike Smith', '4105551234', 'msmith@asymmetrik.com'));
    });

    it('should correctly handle example 2', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      const ci = parser.getContactInfo(
        `Foobar Technologies
        Analytic Developer
        Lisa Haung
        1234 Sentry Road
        Columbia, MD 12345
        Phone: 410-555-1234
        Fax: 410-555-4321
        lisa.haung@foobartech.com`
      );
      expect(ci).toEqual(jasmine.any(ContactInfo));
      expect(ci).toEqual(new ContactInfo('Lisa Haung', '4105551234', 'lisa.haung@foobartech.com'));
    });

    it('should correctly handle example 3', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      const ci = parser.getContactInfo(
        `Arthur Wilson
        Software Engineer
        Decision & Security Technologies
        ABC Technologies
        123 North 11th Street
        Suite 229
        Arlington, VA 22209
        Tel: +1 (703) 555-1259
        Fax: +1 (703) 555-1200
        awilson@abctech.com`
      );
      expect(ci).toEqual(jasmine.any(ContactInfo));
      expect(ci).toEqual(new ContactInfo('Arthur Wilson', '17035551259', 'awilson@abctech.com'));
    });
  });

  describe('should log error message if data is bad', () => {
    it('should return null if there are less than three lines of input.', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `Arthur Wilson
        Software Engineer`
      )).toBeNull();
    });
  });

});
