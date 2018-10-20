export class ContactInfo {
  private name: string;
  private phoneNumber: string;
  private emailAddress: string;

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }

  getEmailAddress(): string {
    return this.emailAddress;
  }

  setEmailAddress(emailAddress: string): void {
    this.emailAddress = emailAddress;
  }

  constructor(name: string, phoneNumber: string, emailAddress: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
  }
}
