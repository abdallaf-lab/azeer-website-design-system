import * as React from "react";
import {
  Archive,
  Ban,
  Hash,
  HelpCircle,
  Home,
  Inbox,
  Languages,
  Megaphone,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
  UserCheck,
} from "lucide-react";
import {
  AppShell,
  Avatar,
  Banner,
  Button,
  HelpBubble,
  PrimaryRail,
  PrimaryRailItem,
  Sidebar,
  SidebarItem,
  toast,
  usePrimaryRail,
} from "@azeer/ui";
import { MOCK_CONTACTS, MOCK_SEGMENTS, type Segment, type StatusView, computeStatusCounts } from "./data";
import { ContactsListView } from "./ContactsListView";
import { SegmentsView } from "./SegmentsView";
import { ImportView } from "./ImportView";
import { useLocale } from "../i18n";

type ContactsView = "list" | "segments" | "import";

interface ContactsScreenProps {
  currentScreen: "contacts" | "whatsapp-flow";
  onNavigate: (s: "contacts" | "whatsapp-flow") => void;
}

export function ContactsScreen({ currentScreen, onNavigate }: ContactsScreenProps) {
  const { t } = useLocale();
  const [view, setView] = React.useState<ContactsView>("list");
  const [statusView, setStatusView] = React.useState<StatusView>("all");
  const [activeSegment, setActiveSegment] = React.useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = React.useState(false);
  const [segments, setSegments] = React.useState<Segment[]>(() => MOCK_SEGMENTS);

  const counts = React.useMemo(() => computeStatusCounts(MOCK_CONTACTS), []);

  const onCreateSegment = (s: Segment) => setSegments((prev) => [...prev, s]);
  const onDeleteSegment = (id: string) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
    if (activeSegment === id) setActiveSegment(null);
  };
  const onApplySegment = (id: string) => {
    setActiveSegment(id);
    setView("list");
  };

  const onStatusChange = (next: StatusView) => {
    setStatusView(next);
    setActiveSegment(null);
    setView("list");
  };
  const onSegmentChange = (id: string | null) => {
    setActiveSegment(id);
    if (id !== null) setView("list");
  };

  const navTo = (key: "home" | "inbox" | "aiAgent" | "broadcast" | "ecommerce" | "settings" | "profile") => {
    const labelKey = key === "profile" ? "toast.profile" : (`rail.${key}` as const);
    const bodyKey = key === "profile" ? "toast.profile.body" : "toast.nav.other";
    toast.info(t(labelKey), { description: t(bodyKey) });
  };

  return (
    <>
      {/* Toaster moved to App.tsx — singleton across screen routing. */}
      <AppShell
        primaryRail={
          <PrimaryRail
            logo={
              <img
                src="/azeer-brand.svg"
                alt="Azeer"
                width={28}
                height={28}
                className="h-7 w-7 shrink-0"
              />
            }
            footer={<RailFooter onNavigate={navTo} />}
          >
            <PrimaryRailItem icon={Home}      label={t("rail.home")}      onClick={() => navTo("home")} />
            <PrimaryRailItem icon={Inbox}     label={t("rail.inbox")}     onClick={() => navTo("inbox")} badge={12} />
            <PrimaryRailItem icon={Sparkles}  label={t("rail.aiAgent")}   onClick={() => navTo("aiAgent")} />
            <PrimaryRailItem icon={Users}     label={t("rail.contacts")}  active={currentScreen === "contacts"} onClick={() => onNavigate("contacts")} />
            <PrimaryRailItem icon={Megaphone} label={t("rail.broadcast")} onClick={() => navTo("broadcast")} />
            <PrimaryRailItem icon={ShoppingBag} label={t("rail.ecommerce")} active={currentScreen === "whatsapp-flow"} onClick={() => onNavigate("whatsapp-flow")} />
          </PrimaryRail>
        }
        sidebar={
          <Sidebar>
            <div className="px-2 pt-1 text-label-xs uppercase tracking-wide text-fg-muted">
              {t("sidebar.views")}
            </div>
            <SidebarItem
              icon={Users}
              label={t("sidebar.allContacts")}
              active={view === "list" && statusView === "all" && !activeSegment}
              onClick={() => onStatusChange("all")}
              trailing={<span className="text-body-xs tabular-nums text-fg-muted">{counts.total}</span>}
            />
            <SidebarItem
              icon={UserCheck}
              label={t("sidebar.active")}
              active={view === "list" && statusView === "active" && !activeSegment}
              onClick={() => onStatusChange("active")}
              trailing={<span className="text-body-xs tabular-nums text-fg-muted">{counts.active}</span>}
            />
            <SidebarItem
              icon={Archive}
              label={t("sidebar.archived")}
              active={view === "list" && statusView === "archived" && !activeSegment}
              onClick={() => onStatusChange("archived")}
              trailing={<span className="text-body-xs tabular-nums text-fg-muted">{counts.archived}</span>}
            />
            <SidebarItem
              icon={Ban}
              label={t("sidebar.blocked")}
              active={view === "list" && statusView === "blocked" && !activeSegment}
              onClick={() => onStatusChange("blocked")}
              trailing={<span className="text-body-xs tabular-nums text-fg-muted">{counts.blocked}</span>}
            />

            <div className="px-2 pt-3 text-label-xs uppercase tracking-wide text-fg-muted">
              {t("sidebar.segments")}
            </div>
            {segments.map((s) => (
              <SidebarItem
                key={s.id}
                icon={Hash}
                label={s.name}
                active={view === "list" && activeSegment === s.id}
                onClick={() => onSegmentChange(activeSegment === s.id ? null : s.id)}
                trailing={
                  <span className="text-body-xs tabular-nums text-fg-muted">
                    {s.contactCount.toLocaleString()}
                  </span>
                }
              />
            ))}
          </Sidebar>
        }
        banner={
          bannerDismissed ? undefined : (
            <Banner
              intent="accent"
              title={t("banner.plan.title", { total: counts.total })}
              action={
                <Button
                  size="sm"
                  onClick={() => toast.info(t("toast.upgrade"), { description: t("toast.upgrade.body") })}
                >
                  {t("banner.upgrade")}
                </Button>
              }
              dismissible
              onDismiss={() => setBannerDismissed(true)}
            >
              {t("banner.plan.body")}
            </Banner>
          )
        }
        helpBubble={
          <HelpBubble icon={HelpCircle} aria-label={t("help.title")}>
            <div className="flex flex-col gap-2">
              <h3 className="text-heading-sm text-fg-default m-0">{t("help.title")}</h3>
              <p className="text-body-md text-fg-muted m-0">{t("help.body")}</p>
              <Button size="sm">{t("help.chat")}</Button>
            </div>
          </HelpBubble>
        }
      >
        {view === "list" ? (
          <ContactsListView
            statusView={statusView}
            activeSegment={activeSegment}
            segments={segments}
            counts={counts}
            onStatusChange={onStatusChange}
            onSegmentChange={onSegmentChange}
            onGoToSegments={() => setView("segments")}
            onGoToImport={() => setView("import")}
          />
        ) : view === "segments" ? (
          <SegmentsView
            onBack={() => setView("list")}
            segments={segments}
            onCreate={onCreateSegment}
            onDelete={onDeleteSegment}
            onApply={onApplySegment}
          />
        ) : (
          <ImportView onBack={() => setView("list")} />
        )}
      </AppShell>
    </>
  );
}

/* ─────── Rail-footer button helper ─────────────────────────────────────
 *  Same class skeleton for the language switcher and the avatar button —
 *  matches the height of PrimaryRailItem (h-ctrl-md) so the rail's vertical
 *  rhythm stays uniform. Compact mode just centers the icon. */
function cnRailFooterBtn(collapsed: boolean): string {
  return [
    "inline-flex items-center gap-3 h-ctrl-md rounded-md cursor-pointer",
    "hover:bg-state-hover transition-colors duration-fast ease-standard",
    collapsed ? "justify-center w-ctrl-md px-0" : "px-3",
  ].join(" ");
}

/* ─────── Rail footer ───────────────────────────────────────────────────
 *  Lives inside `PrimaryRail`'s footer slot, so it can read the live
 *  `collapsed` state from `usePrimaryRail()` and swap between compact
 *  (icon-only) and expanded (full label) presentations as the rail
 *  auto-collapses on hover-out. The collapse-toggle button moved to the
 *  rail's top-right pin affordance — kept here are: Settings, language
 *  switcher, profile avatar. */
function RailFooter({
  onNavigate,
}: {
  onNavigate: (key: "home" | "inbox" | "aiAgent" | "broadcast" | "ecommerce" | "settings" | "profile") => void;
}) {
  const { t, locale, setLocale } = useLocale();
  const { collapsed } = usePrimaryRail();
  return (
    <>
      <PrimaryRailItem icon={Settings} label={t("rail.settings")} onClick={() => onNavigate("settings")} />

      {/* Language switcher — regular rail-tab pattern. Label shows the
       *  language you'd switch TO, so the click action is self-evident in
       *  both locales: in LTR (Eng) → label is "العربية"; in RTL (Ar) →
       *  label is "English". Collapsed: icon only with `title` tooltip. */}
      <PrimaryRailItem
        icon={Languages}
        label={locale === "en" ? "العربية" : "English"}
        onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      />

      {/* Avatar trims to icon-only when collapsed. */}
      <button
        type="button"
        onClick={() => onNavigate("profile")}
        className={cnRailFooterBtn(collapsed)}
        aria-label={collapsed ? "Sara Khan" : undefined}
      >
        <Avatar size="sm" alt="Sara Khan" name="Sara Khan" presence="online" />
        {!collapsed ? (
          <span className="flex-1 text-start truncate text-body-md text-fg-default">
            Sara Khan
          </span>
        ) : null}
      </button>
    </>
  );
}
