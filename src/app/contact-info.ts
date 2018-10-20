/**
 * Represents contact information for an individual.
 */
export class ContactInfo {
  /** @ignore private inner variable for name */
  private name: string;

  /** @ignore private inner variable for phone number */
  private phoneNumber: string;

  /** @ignore private inner variable for email address */
  private emailAddress: string;

  /**
   * gets the name
   * @returns the name of the contact information object
   */
  public getName(): string {
    return this.name;
  }

  /**
   * sets the name
   * @param name - person name string of the contact information object
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * gets the phone number
   * @returns the phone number string of the contact information object
   */
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  /**
   * sets the phone number
   * @param phoneNumber - phone number string
   */
  setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }

  /**
   * gets the email address
   * @returns emailAddress: string
   */
  public getEmailAddress(): string {
    return this.emailAddress;
  }

  /**
   * sets the email address
   * @param emailAddress - email address string
   */
  public setEmailAddress(emailAddress: string): void {
    this.emailAddress = emailAddress;
  }

  /**
   * constructor
   * @param name - person name string
   * @param phoneNumber - phone number string
   * @param emailAddress - email address string
   */
  constructor(name: string, phoneNumber: string, emailAddress: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
  }
}
