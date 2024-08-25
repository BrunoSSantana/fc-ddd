import type { EventHandlerInterface } from "@/domain/@shared/event";
import type { CustomerCreatedEvent } from "@/domain/customer/event";

export class ShowSecondConsoleLogWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(_event: CustomerCreatedEvent): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
  }
}
