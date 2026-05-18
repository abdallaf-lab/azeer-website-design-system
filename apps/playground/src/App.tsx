import * as React from "react";
import { Toaster, TooltipProvider } from "@azeer/ui";
import { ContactsScreen } from "./contacts/ContactsScreen";
import { WhatsAppFlowScreen } from "./whatsapp-flow/WhatsAppFlowScreen";
import { LocaleProvider } from "./i18n";

type Screen = "contacts" | "whatsapp-flow";

/**
 * Single-tree screen router. The Toaster mounts once at App level so
 * navigation between screens doesn't tear down + remount it (would lose any
 * queued toast). Each screen owns its own AppShell + PrimaryRail + sidebar
 * configuration, which lets WhatsApp Flow drop the L2 sidebar entirely
 * while Contacts keeps it.
 */
export function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>("contacts");

  return (
    <LocaleProvider>
      <TooltipProvider>
        <Toaster />
        {currentScreen === "contacts" ? (
          <ContactsScreen
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        ) : (
          <WhatsAppFlowScreen
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}
      </TooltipProvider>
    </LocaleProvider>
  );
}
