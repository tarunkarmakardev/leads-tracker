import React from "react";
import { useHasMounted } from "./hooks";

export default function ClientOnly({ children }: React.PropsWithChildren) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return <>{children}</>;
}
