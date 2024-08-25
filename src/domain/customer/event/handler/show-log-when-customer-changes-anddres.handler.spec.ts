import { EventDispatcher } from "@/domain/@shared/event";
import { addressBuilder, customerBuilder } from "../../data_builder/customer";
import { CustomerChangedAddressEvent } from "../customer-changed-address.event";
import { ShowLogWhenCustomerChangesAddressHandler } from "./show-log-when-customer-changes-anddres.handler";

describe("ShowLogWhenCustomerChangesAddressHandler", () => {
  it("should show log when customer changes address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowLogWhenCustomerChangesAddressHandler();
    const spyShowLog = vi.spyOn(eventHandler, "handle");
    const spyConsoleLog = vi.spyOn(console, "log");
    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"],
    ).toHaveLength(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]?.at(0),
    ).toBeInstanceOf(ShowLogWhenCustomerChangesAddressHandler);

    const customer = customerBuilder.build();
    const address = addressBuilder.build();
    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      address,
      customerId: customer.id,
      customerName: customer.name,
    });

    const addressLine = `${address.street}, ${address.number}, ${address.city}, cep: ${address.zip}`;
    eventDispatcher.notify(customerChangedAddressEvent);
    expect(spyShowLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${addressLine}`,
    );
  });
});
