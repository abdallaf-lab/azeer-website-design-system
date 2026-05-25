import * as React from "react";
import { Check, Minus } from "lucide-react";
import { Icon } from "@azeer/ui";
import { Container, Section, SectionHeading, cn, type SectionTone } from "../lib";

export interface CompareColumn {
  name: string;
  /** Visually emphasise this plan's column. */
  highlight?: boolean;
}

export interface CompareRow {
  feature: string;
  /**
   * One cell per column (same order/length as `columns`):
   *   `true`  → included (check)
   *   `false` → not included (dash)
   *   string/number/node → rendered as-is
   */
  values: (boolean | React.ReactNode)[];
}

export interface CompareGroup {
  /** Optional group heading row above its rows. */
  label?: string;
  rows: CompareRow[];
}

export interface CompareTableProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Plan columns (the leading feature column is implicit). */
  columns: CompareColumn[];
  groups: CompareGroup[];
  tone?: SectionTone;
  className?: string;
}

function Cell({ value }: { value: boolean | React.ReactNode }) {
  if (value === true) {
    return (
      <Icon
        icon={Check}
        size={20}
        aria-label="Included"
        className="mx-auto text-accent-text"
      />
    );
  }
  if (value === false) {
    return (
      <Icon
        icon={Minus}
        size={20}
        aria-label="Not included"
        className="mx-auto text-fg-disabled"
      />
    );
  }
  return <span className="text-body-sm text-fg-default">{value}</span>;
}

/**
 * CompareTable — plan/feature comparison matrix. Booleans render as check/dash
 * with accessible labels; strings render verbatim. Scrolls horizontally on
 * narrow viewports. Presentational → Server Component.
 */
export function CompareTable({
  eyebrow,
  title,
  description,
  columns,
  groups,
  tone = "canvas",
  className,
}: CompareTableProps) {
  return (
    <Section tone={tone} className={className}>
      <Container className="flex flex-col gap-10">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            className="mx-auto"
          />
        ) : null}

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-2xl border-collapse">
            <caption className="sr-only">Plan comparison</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-1/3 p-4 text-start text-label-sm text-fg-muted"
                />
                {columns.map((col) => (
                  <th
                    key={col.name}
                    scope="col"
                    className={cn(
                      "p-4 text-center text-label-md text-fg-default",
                      col.highlight && "rounded-t-lg bg-accent-bg-subtle text-accent-text",
                    )}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group, gi) => (
                <React.Fragment key={group.label ?? `group-${gi}`}>
                  {group.label ? (
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={columns.length + 1}
                        className="border-b border-border-divider px-4 pt-8 pb-2 text-start text-label-xs text-fg-subtle"
                      >
                        {group.label}
                      </th>
                    </tr>
                  ) : null}
                  {group.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-border-divider">
                      <th
                        scope="row"
                        className="p-4 text-start text-body-sm font-normal text-fg-default"
                      >
                        {row.feature}
                      </th>
                      {columns.map((col, ci) => (
                        <td
                          key={col.name}
                          className={cn(
                            "p-4 text-center align-middle",
                            col.highlight && "bg-accent-bg-subtle",
                          )}
                        >
                          <Cell value={row.values[ci]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
