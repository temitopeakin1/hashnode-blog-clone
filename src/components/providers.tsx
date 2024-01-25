import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

// using typescript
export default function Providers({children}: {children: ReactNode}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
