/**
 * Format timestamp into live relative time and calendar date
 */
export function formatDynamicTime(isoDate: string): { relative: string; full: string } {
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return { relative: isoDate, full: isoDate };

    const now = Date.now();
    const diffMs = d.getTime() - now;
    const diffSec = Math.round(diffMs / 1000);
    const absDiffSec = Math.abs(diffSec);

    const full = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (diffSec > 0) {
      // Future due date
      if (diffSec < 3600) return { relative: `Due in ${Math.round(diffSec / 60)}m`, full };
      if (diffSec < 86400) return { relative: `Due in ${Math.round(diffSec / 3600)}h`, full };
      if (diffSec < 86400 * 2) return { relative: "Due Tomorrow", full };
      return { relative: `Due in ${Math.round(diffSec / 86400)}d`, full };
    } else {
      // Past time
      if (absDiffSec < 60) return { relative: "Just now", full };
      if (absDiffSec < 3600) return { relative: `${Math.round(absDiffSec / 60)}m ago`, full };
      if (absDiffSec < 86400) return { relative: `${Math.round(absDiffSec / 3600)}h ago`, full };
      if (absDiffSec < 86400 * 2) return { relative: "Yesterday", full };
      return { relative: `${Math.round(absDiffSec / 86400)}d ago`, full };
    }
  } catch {
    return { relative: isoDate, full: isoDate };
  }
}
