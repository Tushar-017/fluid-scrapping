import { intervalToDuration } from "date-fns";

export function DatesToDurationString(
  start?: Date | null | undefined,
  end?: Date | null | undefined,
) {
  if (!start || !end) {
    return null;
  }

  const timeElapsed = end.getTime() - start.getTime();

  if (timeElapsed < 0) {
    return null;
  }

  if (timeElapsed < 1000) {
    return `${timeElapsed} ms`;
  }

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });

  return [
    duration.hours ? `${duration.hours}h` : null,
    duration.minutes ? `${duration.minutes}m` : null,
    duration.seconds ? `${duration.seconds}s` : null,
  ]
    .filter(Boolean)
    .join(" ");
}
