import { TestBed } from '@angular/core/testing';

import { BusinessCardParser } from './business-card-parser.service';

describe('BusinessCardParser', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
    expect(parser).toBeTruthy();
  });

  describe('should be able to find email address', () => {

    it('should correctly handle example 1', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `ASYMMETRIK LTD
        Mike Smith
        Senior Software Engineer
        (410)555-1234
        msmith@asymmetrik.com`
      ).getEmailAddress()).toEqual('msmith@asymmetrik.com');
    });

    it('should correctly handle example 2', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `Foobar Technologies
        Analytic Developer
        Lisa Haung
        1234 Sentry Road
        Columbia, MD 12345
        Phone: 410-555-1234
        Fax: 410-555-4321
        lisa.haung@foobartech.com`
      ).getEmailAddress()).toEqual('lisa.haung@foobartech.com');
    });

    it('should correctly handle example 3', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
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
      ).getEmailAddress()).toEqual('awilson@abctech.com');
    });
  });

  describe('should be able to find phone number', () => {
    it('should correctly handle example 1', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `ASYMMETRIK LTD
        Mike Smith
        Senior Software Engineer
        (410)555-1234
        msmith@asymmetrik.com`
      ).getPhoneNumber()).toEqual('4105551234');
    });

    it('should correctly handle example 2', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `Foobar Technologies
        Analytic Developer
        Lisa Haung
        1234 Sentry Road
        Columbia, MD 12345
        Phone: 410-555-1234
        Fax: 410-555-4321
        lisa.haung@foobartech.com`
      ).getPhoneNumber()).toEqual('4105551234');
    });

    it('should correctly handle example 3', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
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
      ).getPhoneNumber()).toEqual('17035551259');
    });
  });

  describe('should be able to find person\'s name', () => {
    it('should correctly handle example 1', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `ASYMMETRIK LTD
        Mike Smith
        Senior Software Engineer
        (410)555-1234
        msmith@asymmetrik.com`
      ).getName()).toEqual('Mike Smith');
    });

    it('should correctly handle example 2', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
        `Foobar Technologies
        Analytic Developer
        Lisa Haung
        1234 Sentry Road
        Columbia, MD 12345
        Phone: 410-555-1234
        Fax: 410-555-4321
        lisa.haung@foobartech.com`
      ).getName()).toEqual('Lisa Haung');
    });

    it('should correctly handle example 3', () => {
      const parser: BusinessCardParser = TestBed.get(BusinessCardParser);
      expect(parser.getContactInfo(
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
      ).getName()).toEqual('Arthur Wilson');
    });
  });

});
