"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { generateAlias } from "@/actions/generateAlias";
import { createShortLink } from "@/actions/createShortLink";
import { isValidUrl } from "@/utils/isValidUrl";
import TurnstileWidget from "./TurnstileWidget";
import Icon, { ICONS } from "./ui/Icon";
import Spinner from "./ui/Spinner";
import AliasTicker from "./short-link/AliasTicker";
import PrimaryButton from "./short-link/PrimaryButton";
import StepLabel from "./short-link/StepLabel";
import SuccessPanel from "./short-link/SuccessPanel";
import Toast, { type ToastData } from "./short-link/Toast";
import { DEFAULT_THEMES, DOMAIN } from "./short-link/constants";

export default function ShortLinkGenerator() {
  // Actions
  const [aliasState, formAction, isPending] = useActionState(generateAlias, {
    error: false,
    message: "",
  });
  const [linkState, linkAction, isLinkPending] = useActionState(
    createShortLink,
    { error: false, message: "" },
  );
  const [aiLinkState, aiLinkAction, aiIsLinkPending] = useActionState(
    createShortLink,
    { error: false, message: "" },
  );

  // State
  const [aliasMode, setAliasMode] = useState<"theme" | "custom">("custom");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [customPath, setCustomPath] = useState("");
  const [aliasExistsError, setAliasExistsError] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastData | null>(null);
  const [showAliasResult, setShowAliasResult] = useState<boolean>(false);

  // Turnstile tokens
  const [turnstileTokenTheme, setTurnstileTokenTheme] = useState<string | null>(
    null,
  );
  const [turnstileTokenAlias, setTurnstileTokenAlias] = useState<string | null>(
    null,
  );
  const [turnstileTokenCustom, setTurnstileTokenCustom] = useState<
    string | null
  >(null);

  // Turnstile widget refs
  const themeWidgetRef = useRef<string | null>(null);
  const aliasWidgetRef = useRef<string | null>(null);
  const customWidgetRef = useRef<string | null>(null);

  // DOM refs
  const themeInputRef = useRef<HTMLInputElement>(null);
  const aiFormRef = useRef<HTMLFormElement>(null);
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
    if (aliasState.message && themeWidgetRef.current) {
      turnstile.reset(themeWidgetRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTurnstileTokenTheme(null);
    }
  }, [aliasState]);

  useEffect(() => {
    if (aiLinkState.message && aliasWidgetRef.current) {
      turnstile.reset(aliasWidgetRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTurnstileTokenAlias(null);
    }
  }, [aiLinkState]);

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

  useEffect(() => {
    if (aiLinkState.error && aiLinkState.message) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      showToast(aiLinkState);
    }
  }, [aiLinkState]);

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

  const handleThemeSuggestion = (theme: string) => {
    if (themeInputRef.current && aiFormRef.current) {
      themeInputRef.current.value = theme;
      setShowAliasResult(false);
      aiFormRef.current.requestSubmit();
    }
  };

  const handleRegenerate = () => {
    setShowAliasResult(false);
    aiFormRef.current?.requestSubmit();
  };

  const handleCreateAnother = () => {
    window.location.reload();
  };

  const urlValid = isValidUrl(destinationUrl);
  const urlTouched = destinationUrl.length > 0;
  const generatedAlias =
    !isPending && !aliasState.error ? aliasState.message : "";

  const customSuccess =
    aliasMode === "custom" && !!linkState.message && !linkState.error;
  const aiSuccess =
    showAliasResult && !!aiLinkState.message && !aiLinkState.error;
  const success = customSuccess ? linkState : aiSuccess ? aiLinkState : null;

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
          Pick your own short name, or describe the vibe and let AI come up with
          one.
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
            <>
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
                    form={aliasMode === "custom" ? "customForm" : "aiForm"}
                    name="destinationUrl"
                    required
                    autoComplete="url"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    onBlur={() => {
                      //  "example.com" → "https://example.com"
                      const v = destinationUrl.trim();
                      if (
                        v &&
                        !/^https?:\/\//i.test(v) &&
                        isValidUrl(`https://${v}`)
                      ) {
                        setDestinationUrl(`https://${v}`);
                      }
                    }}
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

              {/* Step 2 — alias */}
              <StepLabel n={2}>Give it a name</StepLabel>

              {/* Mode switch */}
              <div
                role="tablist"
                aria-label="Naming mode"
                className="relative mb-5 grid grid-cols-2 rounded-xl border border-line bg-canvas p-1"
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg transition-transform duration-300 ease-out ${
                    aliasMode === "theme"
                      ? "translate-x-full bg-ai/15 ring-1 ring-ai/40"
                      : "bg-tint-strong ring-1 ring-line-strong"
                  }`}
                />
                <button
                  type="button"
                  role="tab"
                  aria-selected={aliasMode === "custom"}
                  onClick={() => setAliasMode("custom")}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition cursor-pointer ${
                    aliasMode === "custom"
                      ? "text-fg"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  <Icon d={ICONS.pencil} /> I&apos;ll pick it
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={aliasMode === "theme"}
                  onClick={() => setAliasMode("theme")}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition cursor-pointer ${
                    aliasMode === "theme"
                      ? "text-ai"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  <Icon d={ICONS.sparkle} /> Let AI name it
                </button>
              </div>

              {/* ---------------- AI mode ---------------- */}
              {aliasMode === "theme" && (
                <div className="animate-fade-in">
                  <form
                    ref={aiFormRef}
                    action={formAction}
                    className="space-y-4"
                  >
                    <input
                      type="hidden"
                      name="cf-turnstile-response-ai"
                      value={turnstileTokenTheme || ""}
                    />
                    <input
                      type="hidden"
                      name="destinationUrl"
                      value={destinationUrl}
                    />

                    <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-canvas p-1.5 pl-4 transition focus-within:border-ai/60 focus-within:ring-4 focus-within:ring-ai/10">
                      <label htmlFor="customTheme" className="sr-only">
                        Describe the theme of your link
                      </label>
                      <input
                        ref={themeInputRef}
                        defaultValue={aliasState.theme}
                        type="text"
                        id="customTheme"
                        name="theme"
                        required
                        placeholder="What's the link for? e.g. wedding RSVP"
                        className="min-w-0 flex-1 bg-transparent py-2 text-base text-fg placeholder:text-muted/60 outline-none"
                        disabled={isPending}
                      />
                      <button
                        type="submit"
                        disabled={isPending || !turnstileTokenTheme}
                        onClick={() => setShowAliasResult(false)}
                        className="flex shrink-0 items-center gap-2 rounded-lg bg-ai px-4 py-2.5 text-sm font-semibold text-ai-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                      >
                        {isPending ? <Spinner /> : <Icon d={ICONS.sparkle} />}
                        <span className="hidden sm:inline">
                          {isPending ? "Thinking" : "Generate"}
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => handleThemeSuggestion(theme.label)}
                          disabled={isPending || !turnstileTokenTheme}
                          className="rounded-full border border-line bg-tint px-3 py-1.5 text-xs text-muted transition hover:border-ai/50 hover:bg-ai/10 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                        >
                          <span className="mr-1">{theme.emoji}</span>
                          {theme.label}
                        </button>
                      ))}
                    </div>

                    <TurnstileWidget
                      sitekey="0x4AAAAAACN75NwiWj2-Vvcv"
                      widgetRef={themeWidgetRef}
                      callback={(token) => setTurnstileTokenTheme(token)}
                      container="turnstile-container-ai"
                    />

                    {/* Thinking skeleton */}
                    {isPending && (
                      <div className="rounded-2xl border border-ai/20 bg-ai/[0.04] p-5">
                        <div className="mb-3 h-3 w-24 rounded shimmer" />
                        <div className="h-8 w-3/4 rounded-lg shimmer" />
                      </div>
                    )}

                    {/* Generated alias */}
                    {generatedAlias && (
                      <div className="animate-fade-in rounded-2xl border border-ai/30 bg-linear-to-br from-ai/10 to-transparent p-5">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-ai">
                            <Icon d={ICONS.sparkle} className="h-3.5 w-3.5" />
                            AI suggestion
                          </span>
                          <button
                            type="button"
                            onClick={handleRegenerate}
                            disabled={!turnstileTokenTheme}
                            className="flex items-center gap-1.5 text-xs text-muted transition hover:text-fg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Icon d={ICONS.refresh} className="h-3.5 w-3.5" />
                            Try another
                          </button>
                        </div>
                        <p className="break-all font-mono text-xl sm:text-2xl tracking-tight">
                          <span className="text-muted">{DOMAIN}/</span>
                          <span className="text-fg">{generatedAlias}</span>
                        </p>
                      </div>
                    )}
                  </form>

                  {aliasState.message &&
                    !aliasState.error &&
                    !isPending &&
                    (aliasState.message !== aiLinkState.alias ||
                      aiLinkState.error) && (
                      <form
                        id="aiForm"
                        action={aiLinkAction}
                        className="mt-6 space-y-3"
                      >
                        <input
                          type="hidden"
                          name="alias"
                          value={aliasState.message}
                        />
                        <input
                          type="hidden"
                          name="cf-turnstile-response-alias"
                          value={turnstileTokenAlias || ""}
                        />
                        <TurnstileWidget
                          widgetRef={aliasWidgetRef}
                          sitekey="0x4AAAAAACNvMyjAn5o7TUUA"
                          callback={(token) => setTurnstileTokenAlias(token)}
                          container="turnstile-container-alias"
                        />
                        <PrimaryButton
                          pending={aiIsLinkPending}
                          waiting={!turnstileTokenAlias}
                          disabled={!turnstileTokenAlias || aiIsLinkPending}
                          onClick={() => setShowAliasResult(true)}
                        >
                          Use this name
                        </PrimaryButton>
                      </form>
                    )}
                </div>
              )}

              {/* ---------------- Custom mode ---------------- */}
              {aliasMode === "custom" && (
                <form
                  id="customForm"
                  action={linkAction}
                  className="animate-fade-in"
                >
                  <div className="mb-6">
                    <div
                      className={`flex items-center rounded-xl border bg-canvas pl-4 pr-3 transition focus-within:ring-4 ${
                        aliasExistsError
                          ? "border-danger/60 focus-within:ring-danger/10"
                          : "border-line-strong focus-within:border-accent/60 focus-within:ring-accent/10"
                      }`}
                    >
                      <span className="select-none font-mono text-sm sm:text-base text-muted">
                        {DOMAIN}/
                      </span>
                      <label htmlFor="alias" className="sr-only">
                        Short link name
                      </label>
                      <input
                        type="text"
                        id="alias"
                        name="alias"
                        required
                        pattern="[a-z0-9-]+"
                        placeholder="my-link"
                        autoComplete="off"
                        spellCheck={false}
                        value={customPath}
                        disabled={
                          (!!linkState?.message && !linkState?.error) ||
                          isLinkPending
                        }
                        onChange={(e) => {
                          const sanitized = e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          setCustomPath(sanitized);
                          setAliasExistsError(false);
                        }}
                        aria-invalid={aliasExistsError}
                        aria-describedby="alias-hint"
                        className="min-w-0 flex-1 bg-transparent py-3.5 font-mono text-sm sm:text-base text-fg placeholder:text-muted/50 outline-none"
                      />
                      <span className="font-mono text-[11px] tabular-nums text-muted/70">
                        {customPath.length}
                      </span>
                    </div>
                    <p
                      id="alias-hint"
                      className={`mt-2 text-xs ${aliasExistsError ? "text-danger" : "text-muted"}`}
                    >
                      {aliasExistsError
                        ? "That name's taken — try a variation, or let AI suggest one."
                        : "Lowercase letters, numbers and hyphens. Spaces become hyphens."}
                    </p>
                  </div>

                  {(linkState?.error || !linkState?.message) && (
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
                        disabled={isLinkPending || !turnstileTokenCustom}
                      >
                        Shorten it
                      </PrimaryButton>
                    </div>
                  )}
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
