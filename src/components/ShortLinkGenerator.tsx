"use client";

import {
  useState,
  useRef,
  useEffect,
  useActionState,
  startTransition,
} from "react";
import { generateAlias } from "@/actions/generateAlias";
import { createShortLink } from "@/actions/createShortLink";
import { isValidUrl } from "@/utils/isValidUrl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import TurnstileWidget from "./TurnstileWidget";
import Icon, { ICONS } from "./ui/Icon";
import Spinner from "./ui/Spinner";
import AliasTicker from "./short-link/AliasTicker";
import PrimaryButton from "./short-link/PrimaryButton";
import StepLabel from "./short-link/StepLabel";
import SuccessPanel from "./short-link/SuccessPanel";
import Toast, { type ToastData } from "./short-link/Toast";
import { DOMAIN } from "./short-link/constants";

//  "example.com" → "https://example.com"
const withProtocol = (v: string) => {
  const t = v.trim();
  return t && !/^https?:\/\//i.test(t) && isValidUrl(`https://${t}`)
    ? `https://${t}`
    : t;
};

export default function ShortLinkGenerator() {
  const reducedMotion = useReducedMotion();

  // Actions
  const [aliasState, suggestAction, isSuggesting] = useActionState(
    generateAlias,
    { error: false, message: "" },
  );
  const [linkState, linkAction, isLinkPending] = useActionState(
    createShortLink,
    { error: false, message: "" },
  );

  // State
  const [destinationUrl, setDestinationUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [aiSuggested, setAiSuggested] = useState(false);
  const [aliasExistsError, setAliasExistsError] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastData | null>(null);

  // Turnstile tokens
  const [turnstileTokenSuggest, setTurnstileTokenSuggest] = useState<
    string | null
  >(null);
  const [turnstileTokenCustom, setTurnstileTokenCustom] = useState<
    string | null
  >(null);

  // Turnstile widget refs
  const suggestWidgetRef = useRef<string | null>(null);
  const customWidgetRef = useRef<string | null>(null);

  // DOM refs
  const destInputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (t: { error: boolean; message: string }, ms = 3000) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage({ error: t.error, message: t.message, id: Date.now() });
    toastTimer.current = setTimeout(() => setToastMessage(null), ms);
  };

  // Clear any pending toast timer on unmount
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  // Turnstile tokens are single-use: reset the widget (and drop the stale
  // token) after every server round-trip so the next submit gets a fresh one.
  useEffect(() => {
    if (aliasState.message && suggestWidgetRef.current) {
      turnstile.reset(suggestWidgetRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTurnstileTokenSuggest(null);
    }
  }, [aliasState]);

  useEffect(() => {
    if (linkState.message && customWidgetRef.current) {
      turnstile.reset(customWidgetRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTurnstileTokenCustom(null);
    }
  }, [linkState]);

  // Error toasts
  useEffect(() => {
    if (aliasState.error && aliasState.message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      showToast(aliasState);
    }
  }, [aliasState]);

  useEffect(() => {
    if (linkState.error && linkState.message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      showToast(linkState);
      setAliasExistsError(linkState.message === "Alias already exists");
    }
  }, [linkState]);

  // A suggestion arrived: type it into the alias field, where it stays editable
  useEffect(() => {
    if (aliasState.error || !aliasState.message) return;
    const alias = aliasState.message
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setAiSuggested(true);
    setAliasExistsError(false);
    if (reducedMotion) {
      setCustomPath(alias);
      return;
    }
    let i = 0;
    setCustomPath("");
    const t = setInterval(() => {
      i += 1;
      setCustomPath(alias.slice(0, i));
      if (i >= alias.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
    // Only re-run for a new suggestion, not when the motion setting changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aliasState]);

  // Press "/" anywhere to jump to the destination field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(el.tagName)) {
        e.preventDefault();
        destInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast({ error: false, message: "Copied to clipboard" }, 2000);
  };

  const handleSuggest = () => {
    const url = withProtocol(destinationUrl);
    if (url !== destinationUrl) setDestinationUrl(url);

    const fd = new FormData();
    fd.set("destinationUrl", url);
    fd.set("cf-turnstile-response-ai", turnstileTokenSuggest || "");
    if (aiSuggested && customPath) fd.set("previousAlias", customPath);
    startTransition(() => suggestAction(fd));
  };

  const handleCreateAnother = () => {
    window.location.reload();
  };

  const urlValid = isValidUrl(destinationUrl);
  const urlTouched = destinationUrl.length > 0;
  const canSuggest =
    isValidUrl(withProtocol(destinationUrl)) &&
    !!turnstileTokenSuggest &&
    !isSuggesting &&
    !isLinkPending;

  const success = !!linkState.message && !linkState.error ? linkState : null;

  const sparkle = (
    <Icon
      d={ICONS.sparkle}
      className="inline h-3.5 w-3.5 -translate-y-px text-ai"
    />
  );
  const aliasHint = aliasExistsError ? (
    <>
      That name&apos;s taken. Try a variation, or use {sparkle} for a
      suggestion.
    </>
  ) : isSuggesting ? (
    "Reading the page to find a good name…"
  ) : aiSuggested ? (
    <>Suggested from the page. Edit it, or use {sparkle} for another.</>
  ) : (
    <>
      Lowercase letters, numbers and hyphens. Or use {sparkle} to suggest one
      from the page.
    </>
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <Toast toast={toastMessage} />

      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-fg leading-[1.05]">
          Links people
          <br />
          <span className="text-accent-text">actually remember.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-muted">
          Pick your own short name, or let AI read the page and suggest one.
        </p>
        <div className="mt-6 inline-flex items-center rounded-full border border-line bg-surface/80 px-4 py-2 text-sm sm:text-base">
          <AliasTicker />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-line bg-surface/80 shadow-[var(--card-shadow)] backdrop-blur-xl">
        <div className="p-5 sm:p-8">
          {success ? (
            <SuccessPanel
              link={success.message}
              destination={success.destinationUrl}
              onCopy={handleCopyLink}
              onReset={handleCreateAnother}
            />
          ) : (
            <form id="customForm" action={linkAction}>
              {/* Step 1 — destination */}
              <div className="mb-8">
                <StepLabel
                  n={1}
                  htmlFor="destinationUrl"
                  aside={
                    <kbd className="hidden sm:inline-block rounded-md border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-muted">
                      /
                    </kbd>
                  }
                >
                  Where should it go?
                </StepLabel>
                <div
                  className={`flex items-center gap-3 rounded-xl border bg-canvas px-4 transition focus-within:ring-4 ${
                    urlTouched && !urlValid
                      ? "border-danger/50 focus-within:ring-danger/10"
                      : "border-line-strong focus-within:border-accent/60 focus-within:ring-accent/10"
                  }`}
                >
                  <Icon
                    d={ICONS.globe}
                    className="h-4 w-4 shrink-0 text-muted"
                  />
                  <input
                    ref={destInputRef}
                    type="url"
                    id="destinationUrl"
                    name="destinationUrl"
                    required
                    autoComplete="url"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    onBlur={() =>
                      setDestinationUrl(withProtocol(destinationUrl))
                    }
                    placeholder="https://paste-a-long-link.com/…"
                    className="w-full bg-transparent py-3.5 text-base text-fg placeholder:text-muted/60 outline-none"
                  />
                  {urlTouched && (
                    <span
                      className={`animate-pop grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        urlValid
                          ? "bg-accent text-accent-ink"
                          : "bg-danger/20 text-danger"
                      }`}
                      aria-label={urlValid ? "Valid URL" : "Invalid URL"}
                    >
                      <Icon
                        d={urlValid ? ICONS.check : ICONS.x}
                        className="h-3 w-3"
                      />
                    </span>
                  )}
                </div>
              </div>

              {/* Step 2 — alias, typed or suggested */}
              <div className="mb-6">
                <StepLabel n={2} htmlFor="alias">
                  Give it a name
                </StepLabel>
                <div
                  className={`relative flex items-center overflow-hidden rounded-xl border bg-canvas py-1.5 pl-4 pr-1.5 transition focus-within:ring-4 ${
                    aliasExistsError
                      ? "border-danger/60 focus-within:ring-danger/10"
                      : isSuggesting || aiSuggested
                        ? "border-ai/40 focus-within:border-ai/60 focus-within:ring-ai/10"
                        : "border-line-strong focus-within:border-accent/60 focus-within:ring-accent/10"
                  }`}
                >
                  {isSuggesting && (
                    <span
                      aria-hidden
                      className="shimmer pointer-events-none absolute inset-0"
                    />
                  )}
                  <span className="relative select-none font-mono text-sm sm:text-base text-muted">
                    {DOMAIN}/
                  </span>
                  <input
                    type="text"
                    id="alias"
                    name="alias"
                    required
                    pattern="[a-z0-9-]+"
                    placeholder={isSuggesting ? "" : "my-link"}
                    autoComplete="off"
                    spellCheck={false}
                    value={customPath}
                    disabled={isLinkPending || isSuggesting}
                    onChange={(e) => {
                      const sanitized = e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "");
                      setCustomPath(sanitized);
                      setAiSuggested(false);
                      setAliasExistsError(false);
                    }}
                    aria-invalid={aliasExistsError}
                    aria-describedby="alias-hint"
                    className={`relative min-w-0 flex-1 bg-transparent py-2 font-mono text-sm sm:text-base placeholder:text-muted/50 outline-none disabled:opacity-60 ${
                      aiSuggested ? "text-ai" : "text-fg"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleSuggest}
                    disabled={!canSuggest}
                    aria-label="Suggest a name from the page"
                    title={
                      !isValidUrl(withProtocol(destinationUrl))
                        ? "Add a destination first"
                        : !turnstileTokenSuggest && !isSuggesting
                          ? "Verifying you're human…"
                          : "Suggest a name from the page"
                    }
                    className="relative ml-2 flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ai transition hover:bg-ai/10 disabled:cursor-not-allowed disabled:text-muted/60 disabled:hover:bg-transparent cursor-pointer"
                  >
                    {isSuggesting ? (
                      <Spinner />
                    ) : (
                      <Icon d={ICONS.sparkle} className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">Suggest</span>
                  </button>
                </div>
                <p
                  id="alias-hint"
                  aria-live="polite"
                  className={`mt-2 text-xs ${
                    aliasExistsError
                      ? "text-danger"
                      : isSuggesting || aiSuggested
                        ? "text-ai"
                        : "text-muted"
                  }`}
                >
                  {aliasHint}
                </p>
              </div>

              {/* Suggest verification only shows itself if it needs a click */}
              <TurnstileWidget
                sitekey="0x4AAAAAACN75NwiWj2-Vvcv"
                widgetRef={suggestWidgetRef}
                callback={(token) => setTurnstileTokenSuggest(token)}
                container="turnstile-container-ai"
                appearance="interaction-only"
              />

              <div className="space-y-3">
                <TurnstileWidget
                  widgetRef={customWidgetRef}
                  sitekey="0x4AAAAAACNuothYpEfUeJG7"
                  callback={(token) => setTurnstileTokenCustom(token)}
                  container="turnstile-container-custom"
                />
                <input
                  type="hidden"
                  name="cf-turnstile-response-custom"
                  value={turnstileTokenCustom || ""}
                />
                <PrimaryButton
                  pending={isLinkPending}
                  waiting={!turnstileTokenCustom}
                  disabled={
                    isLinkPending || isSuggesting || !turnstileTokenCustom
                  }
                >
                  Shorten it
                </PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
