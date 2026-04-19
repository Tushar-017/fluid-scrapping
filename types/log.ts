export const LogLevels = ["info", "error"] as const;

export type LogLevel = (typeof LogLevels)[number];

export type Log = {
  timestamp: Date;
  level: LogLevel;
  message: string;
};
export type LogFunction = (message: string) => void;

export type LogCollector = {
  getAll(): Log[];
} & {
  [level in LogLevel]: LogFunction;
};
