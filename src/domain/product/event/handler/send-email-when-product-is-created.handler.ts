import type { EventHandlerInterface } from "@/domain/@shared/event";
import type { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to .....`);
  }
}
