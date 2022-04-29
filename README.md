# loglevel-datadog

[![npm](https://img.shields.io/npm/v/loglevel-datadog?style=flat-square)](https://www.npmjs.com/package/loglevel-datadog?activeTab=versions)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/loglevel-datadog?style=flat-square)](https://bundlephobia.com/package/loglevel-datadog)
[![NPM](https://img.shields.io/npm/l/loglevel-datadog?style=flat-square)](https://raw.githubusercontent.com/manbearwiz/loglevel-datadog/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/loglevel-datadog?style=flat-square)](https://www.npmjs.com/package/loglevel-datadog)
[![GitHub issues](https://img.shields.io/github/issues/manbearwiz/loglevel-datadog?style=flat-square)](https://github.com/manbearwiz/loglevel-datadog/issues)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release&style=flat-square)](https://github.com/semantic-release/semantic-release)

Send loglevel logs from the browser to Datadog via the [datadog browser logs SDK](https://github.com/DataDog/browser-sdk/tree/main/packages/logs#browser-log-collection).

`loglevel` + `@datadog/browser-logs`

Note that adding plugins to loglevel [**will show log output line numbers as coming from inside the plugin**](https://github.com/pimterry/loglevel#writing-plugins).

## Installation

```sh
npm install --save loglevel-datadog
```

## Usage

```ts
import log from 'loglevel';
import { loglevelDatadog } from 'loglevel-datadog';

loglevelDatadog(log, {
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sampleRate: 100,
});

log.warn('hello datadog');
```

## Configuration

`loglevelDatadog` uses the same configuration interface as `@datadog/browser-logs`. See the [datadog initialization parameters](https://github.com/DataDog/browser-sdk/tree/main/packages/logs#initialization-parameters) for more details.
