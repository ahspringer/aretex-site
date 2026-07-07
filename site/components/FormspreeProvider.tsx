// site/components/FormspreeProviders.tsx
"use client";

import { FormspreeProvider } from "@formspree/react";

const PROJECT_ID = "3040592425086091012";

export default function FormspreeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormspreeProvider project={PROJECT_ID}>
      {children}
    </FormspreeProvider>
  );
}