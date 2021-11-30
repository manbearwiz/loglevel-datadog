import log, { LogLevelNumbers } from 'loglevel';
import {
  datadogLogs,
  LogsInitConfiguration,
  StatusType,
} from '@datadog/browser-logs';

const STATUS_TYPE: Record<LogLevelNumbers, StatusType> = {
  0: 'debug',
  1: 'debug',
  2: 'error',
  3: 'info',
  4: 'warn',
  5: 'debug',
};

export function loglevelDatadog(
  datadogConfiguration: LogsInitConfiguration,
  statusTypesMap = STATUS_TYPE,
) {
  datadogLogs.init(datadogConfiguration);

  const originalFactory = log.methodFactory;
  log.methodFactory = (
    methodName: string,
    level: LogLevelNumbers,
    loggerName: string | symbol,
  ) => {
    const rawMethod = originalFactory(methodName, level, loggerName);

    return (...messages: unknown[]) => {
      messages
        .filter(Boolean)
        .map((m) => (typeof m === 'string' ? m : JSON.stringify(m)))
        .forEach((m) => datadogLogs.logger.log(m, {}, statusTypesMap[level]));

      rawMethod(messages);
    };
  };
  log.setLevel(log.getLevel());
}
