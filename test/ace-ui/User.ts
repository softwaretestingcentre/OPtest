import { Task } from "@serenity-js/core";
import { Navigate } from "@serenity-js/web";

export const User = {
    login: () =>
        Task.where(`#actor logs in`,
            Navigate.to('/landing.html'),
        ),
}

