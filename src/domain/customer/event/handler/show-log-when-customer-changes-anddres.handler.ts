import type { EventHandlerInterface } from "@/domain/@shared/event";
import type { CustomerChangedAddressEvent } from "../customer-changed-address.event";

export class ShowLogWhenCustomerChangesAddressHandler
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    const { address, customerId, customerName } = event.eventData;
    const addressLine = `${address.street}, ${address.number}, ${address.city}, cep: ${address.zip}`;
    console.log(
      `Endereço do cliente: ${customerId}, ${customerName} alterado para: ${addressLine}`,
    );
  }
}
