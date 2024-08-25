export class CustomerCreatedEvent<T = any> {
  dataTimeOccurred: Date;
  eventData: T;

  constructor(eventData: T) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
