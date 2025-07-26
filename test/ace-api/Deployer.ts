import { Ensure, equals } from "@serenity-js/assertions";
import { Task } from "@serenity-js/core";
import { LastResponse, PostRequest, Send } from "@serenity-js/rest";

export const Deployer = {
  deployAce: (customer: string) =>
    Task.where(
      `#actor deploys Ace to ${customer}`,
      Send.a(
        PostRequest.to(`/api/licence/${customer}/deploy`).with({
          status: "valid",
        })
      ),
      Ensure.that(LastResponse.status(), equals(200))
    ),
  deactivateAce: (customer: string) =>
    Task.where(
      `#actor deactivates Ace for ${customer}`,
      Send.a(
        PostRequest.to(`/api/licence/${customer}/deactivate`).with({
          status: "expired",
        })
      ),
      Ensure.that(LastResponse.status(), equals(200))
    ),
};
