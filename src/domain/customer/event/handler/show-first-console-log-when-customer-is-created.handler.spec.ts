import { EventDispatcher } from "@/domain/@shared/event";
import { CustomerCreatedEvent } from "@/domain/customer/event";
import { ShowFirstConsoleLogWhenCustomerIsCreatedHandler } from "@/domain/customer/event/handler";
import { describe, it, vi } from "vitest";

describe("ShowFirstConsoleLogWhenCustomerIsCreatedHandler", () => {
  it("should show first console log when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowFirstConsoleLogWhenCustomerIsCreatedHandler();
    const spyShowFirstConsoleLog = vi.spyOn(eventHandler, "handle");
    const spyConsoleLog = vi.spyOn(console, "log");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"],
    ).toHaveLength(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.at(0),
    ).instanceOf(ShowFirstConsoleLogWhenCustomerIsCreatedHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyShowFirstConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated",
    );
  });
});
