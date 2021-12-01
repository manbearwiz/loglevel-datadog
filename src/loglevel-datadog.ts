import { LogLevelNumbers, RootLogger } from 'loglevel';
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
  logger: RootLogger,
  datadogConfiguration: LogsInitConfiguration,
  statusTypesMap = STATUS_TYPE,
) {
  datadogLogs.init(datadogConfiguration);

  const { methodFactory } = logger;
  logger.methodFactory = (
    methodName: string,
    level: LogLevelNumbers,
    loggerName: string | symbol,
  ) => {
    const rawMethod = methodFactory(methodName, level, loggerName);

    return (...messages: unknown[]) => {
      const message = messages
        .map((m) => (typeof m === 'string' ? m : JSON.stringify(m)))
        .join(' ');

      datadogLogs.logger.log(message, {}, statusTypesMap[level]);

      // TODO: Remove this line from traces
      rawMethod(...messages);
    };
  };
  logger.setLevel(logger.getLevel());
}
