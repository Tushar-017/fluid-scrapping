import {
  Log,
  LogCollector,
  LogFunction,
  LogLevel,
  LogLevels,
} from "@/types/log";

export function createLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunctions = {} as Record<LogLevel, LogFunction>;
  LogLevels.forEach(
    (level) =>
      (logFunctions[level] = (message: string) => {
        logs.push({
          timestamp: new Date(),
          level,
          message,
        });
      }),
  );
  return {
    getAll,
    ...logFunctions,
  };
}
