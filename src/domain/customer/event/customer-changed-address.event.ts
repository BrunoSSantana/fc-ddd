import type { EventInterface } from "@/domain/@shared/event";
import type { TAddress } from "../value-object/address";

export type CustomerChangedAddressEventData = {
  customerId: string;
  customerName: string;

  address: TAddress;
};

export class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerChangedAddressEventData;

  constructor(eventData: CustomerChangedAddressEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
