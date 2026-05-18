import * as React from "react";

/**
 * Portal container override for primitives that portal to body by default.
 *
 * Used to portal Radix Select / Popover / DropdownMenu content INSIDE the
 * current Dialog/Sheet rather than at `<body>`. Radix Dialog's focus-trap
 * treats body-portaled content as "outside" and intercepts the trigger's
 * pointer event, which prevents the dropdown from opening. Portaling into
 * the modal's own DOM puts the dropdown back inside the trap. See:
 *   https://github.com/radix-ui/primitives/issues/3344
 */
const PortalContainerContext = React.createContext<HTMLElement | null>(null);

export function PortalContainerProvider({
  value,
  children,
}: {
  value: HTMLElement | null;
  children: React.ReactNode;
}) {
  return (
    <PortalContainerContext.Provider value={value}>
      {children}
    </PortalContainerContext.Provider>
  );
}

export function usePortalContainer(): HTMLElement | null {
  return React.useContext(PortalContainerContext);
}
