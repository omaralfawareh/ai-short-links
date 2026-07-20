export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerTelemetry } = await import("ai");
    const { LaminarAiSdkTelemetry } = await import("@lmnr-ai/lmnr");

    registerTelemetry(
      new LaminarAiSdkTelemetry({
        laminarOptions: { projectApiKey: process.env.LMNR_PROJECT_API_KEY },
      }),
    );
  }
}
