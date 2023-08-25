import { createActionGroup, props } from "@ngrx/store";
import { User } from "../../features/dashboard/pages/users/models/user.model";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'set auth user': props<{ payload: User | null }>()
  }
})
