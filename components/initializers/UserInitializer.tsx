import { useEffect } from "react";

import { useAuth } from "@services/AuthService";

/** Initialize the auth store */
const UserInitializer = (): JSX.Element => {
  const hydrateAuth = useAuth((state) => state.hydrate);
  useEffect(() => {
    hydrateAuth();
  });
  return null;
};

export default UserInitializer;
