# Consumer Booking — Profile B UI Kit

Tenant-branded booking stepper for patients and customers. 2–5 minute
sessions, comfortable density, `base`/`slow` motion. Light mode only.

## Components
- `BookingHeader.jsx` — tenant logo + name + step progress
- `StepServiceSelect.jsx` — pick a service (cards)
- `StepProviderSelect.jsx` — pick a provider (avatars)
- `StepTimeSlot.jsx` — pick a date + time slot
- `StepDetails.jsx` — contact details form
- `StepConfirm.jsx` — review + confirm
- `SuccessPage.jsx` — confirmation screen
- `AzeerAttribution.jsx` — footer attribution pill

## Screens (via `index.html`)
Full stepper from service → provider → time → details → confirmation,
tenant-branded as "Noor Dental Clinic". Uses `--tenant-primary` which
can be flipped via the brand toggle in the corner.
