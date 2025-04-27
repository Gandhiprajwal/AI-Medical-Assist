const { nodeProfilingIntegration } = require("@sentry/profiling-node");
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://3df475ba7dd4e58ffa1a039ef4bfc085@o4509226312663040.ingest.us.sentry.io/4509226315939840",
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing is not required for profiling to work
  // but for the best experience we recommend enabling it
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

Sentry.profiler.startProfiler();
// Code executed between these two calls will be profiled
Sentry.profiler.stopProfiler();