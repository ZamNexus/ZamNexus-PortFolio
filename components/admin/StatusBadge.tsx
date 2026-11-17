import type { EffectiveStatus } from "@/lib/cms/types";

const LABEL: Record<EffectiveStatus, string> = {
  published: "Published",
  draft: "Draft",
  unpublished: "Unpublished",
  scheduled: "Scheduled",
};

export default function StatusBadge({ status }: { status: EffectiveStatus }) {
  return <span className={`adm-badge adm-badge--${status}`}>{LABEL[status]}</span>;
}
