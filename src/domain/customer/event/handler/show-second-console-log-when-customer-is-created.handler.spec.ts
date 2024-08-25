import { EventDispatcher } from "@/domain/@shared/event";
import { CustomerCreatedEvent } from "@/domain/customer/event";
import { ShowSecondConsoleLogWhenCustomerIsCreatedHandler } from "@/domain/customer/event/handler";
import { describe, it, vi } from "vitest";

describe("ShowFirstConsoleLogWhenCustomerIsCreatedHandler", () => {
  it("should show second console log when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ShowSecondConsoleLogWhenCustomerIsCreatedHandler();
    const spyShowSecondConsoleLog = vi.spyOn(eventHandler, "handle");
    const spyConsoleLog = vi.spyOn(console, "log");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"],
    ).toHaveLength(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]?.at(0),
    ).instanceOf(ShowSecondConsoleLogWhenCustomerIsCreatedHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyShowSecondConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated",
    );
  });
});
