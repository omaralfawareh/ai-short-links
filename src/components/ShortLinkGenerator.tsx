"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { generateAlias } from "../actions/generateAlias";
import { createShortLink } from "../actions/createShortLink";
import TurnstileWidget from "./TurnstileWidget";

const DEFAULT_THEMES = [
  {
    id: "theme1",
    label: "World of Warcraft",
  },
  {
    id: "theme2",
    label: "Innovation Event",
  },
  {
    id: "theme3",
    label: "Cyberpunk City",
  },
  {
    id: "theme4",
    label: "Medical Survey",
  },
];



export default function ShortLinkGenerator() {
  // Actions
  const [aliasState, formAction, isPending] = useActionState(generateAlias, { error: false, message: "" });
  const [linkState, linkAction, isLinkPending] = useActionState(createShortLink, { error: false, message: "" });
  const [aiLinkState, aiLinkAction, aiIsLinkPending] = useActionState(createShortLink, { error: false, message: "" });
  // States
  const [aliasMode, setAliasMode] = useState<"theme" | "custom">("custom");
  const [customPath, setCustomPath] = useState("");
  const [toastMessage, setToastMessage] = useState<{ error: boolean; message: string } | null>(null);
  const [showAliasResult, setShowAliasResult] = useState<boolean>(false);
  // Turnstile tokens
  const [turnstileTokenTheme, setTurnstileTokenTheme] = useState<string | null>(null);
  const [turnstileTokenAlias, setTurnstileTokenAlias] = useState<string | null>(null);
  const [turnstileTokenCustom, setTurnstileTokenCustom] = useState<string | null>(null);
  // Turnstile Widget Refs
  const themeWidgetRef = useRef<string | null>(null);
  const aliasWidgetRef = useRef<string | null>(null);
  const customWidgetRef = useRef<string | null>(null);
  // Refs
  const themeInputRef = useRef<HTMLInputElement>(null);
  const aiFormRef = useRef<HTMLFormElement>(null);



  useEffect(() => {
    // Reset token if success or error
    if (aliasState.message && themeWidgetRef.current) {
      console.log("resetting theme widget", themeWidgetRef.current);
      turnstile.reset(themeWidgetRef.current);
    }
  }, [aliasState]);

  useEffect(() => {
    if (aiLinkState.message && aliasWidgetRef.current) {
      console.log("resetting alias widget", aliasWidgetRef.current);
      turnstile.reset(aliasWidgetRef.current);
    }
  }, [aiLinkState]);

  useEffect(() => {
    if (linkState.message && customWidgetRef.current) {
      console.log("resetting custom widget", customWidgetRef.current);
      turnstile.reset(customWidgetRef.current);
    }
  }, [linkState]);

  useEffect(() => {
    if (aliasState.error && aliasState.message) {
      // eslint-disable-next-line
      setToastMessage(aliasState);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [aliasState]);

  useEffect(() => {
    if (linkState.error && linkState.message) {
      // eslint-disable-next-line
      setToastMessage(linkState);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [linkState]);

  useEffect(() => {
    if (aiLinkState.error && aiLinkState.message) {
      // eslint-disable-next-line
      setToastMessage(aiLinkState);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [aiLinkState]);

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage({ error: false, message: "Copied to clipboard" });
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleThemeSuggestion = (theme: string) => {
    if (themeInputRef.current && aiFormRef.current) {
      themeInputRef.current.value = theme;
      aiFormRef.current.requestSubmit();
    }
  };

  const handleCreateAnother = () => {
    window.location.reload();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-5 sm:right-auto z-50 animate-fade-in">
          <div className={`glass px-4 py-3 sm:px-6 rounded-xl shadow-lg flex items-center gap-2 ${toastMessage.error
            ? "border-red-500/50 bg-red-500/10"
            : "border-emerald-500/50 bg-emerald-500/10"
            }`}>
            {toastMessage.error ? (
              <svg className="w-5 h-5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className={`font-medium text-sm sm:text-base ${toastMessage.error ? "text-red-200" : "text-emerald-200"}`}>
              {toastMessage.message}
            </span>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden glow-primary">
        <div className="p-5 sm:p-8">

          {/* Destination URL Input */}
          <div className="mb-6 p-4 sm:p-5 glass rounded-xl">
            <label
              htmlFor="destinationUrl"
              className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Destination URL
            </label>
            <input
              type="url"
              id="destinationUrl"
              form={aliasMode === "custom" ? "customForm" : "aiForm"}
              name="destinationUrl"
              required
              defaultValue={linkState.destinationUrl || aiLinkState.destinationUrl}
              placeholder="https://example.com"
              className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition text-foreground placeholder-muted text-sm sm:text-base"
            />
          </div>

          {aliasMode === "theme" && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Link Generator
                </span>
                <button
                  type="button"
                  onClick={() => setAliasMode("custom")}
                  className="text-sm text-muted hover:text-foreground font-medium transition text-left sm:text-right cursor-pointer"
                >
                  Use Custom Name
                </button>
              </div>

              <form
                ref={aiFormRef}
                action={formAction}
                className="space-y-4"
              >
                <input type="hidden" name="cf-turnstile-response-ai" value={turnstileTokenTheme || ""} />
                <TurnstileWidget sitekey="0x4AAAAAACN75NwiWj2-Vvcv" widgetRef={themeWidgetRef} callback={(token) => setTurnstileTokenTheme(token)} container="turnstile-container-ai" />

                <div>
                  <label
                    htmlFor="customTheme"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Describe the theme of your link
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input
                      ref={themeInputRef}
                      defaultValue={aliasState.theme}
                      type="text"
                      id="customTheme"
                      name="theme"
                      required
                      placeholder="e.g., ocean waves, vintage retro..."
                      className="flex-1 px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition text-foreground placeholder-muted text-sm sm:text-base"
                      disabled={isPending}
                    />
                    <button
                      type="submit"
                      disabled={isPending || !turnstileTokenTheme}
                      onClick={() => setShowAliasResult(false)}
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg whitespace-nowrap"
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Generating
                        </span>
                      ) : (
                        "Generate"
                      )}
                    </button>
                  </div>
                </div>



                {/* Theme Suggestions */}
                {(
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Or try a suggestion:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => handleThemeSuggestion(theme.label)}
                          disabled={isPending || !turnstileTokenTheme}
                          className="px-3 py-1.5 text-sm rounded-full glass-button text-muted hover:text-foreground hover:bg-white/15 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer capitalize"
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}


                {/* Generated Alias */}
                {!isPending && aliasState.message && !aliasState.error && (
                  <div className="p-4 glass rounded-xl border-emerald-500/30 bg-emerald-500/10">
                    <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium text-emerald-300">Generated Successfully</span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg font-mono font-semibold text-foreground truncate">
                      {aliasState.message}
                    </p>
                  </div>
                )}
              </form>

              {aliasState.message && !aliasState.error && !isPending && (aliasState.message !== aiLinkState.alias || aiLinkState.error) && (
                <form id="aiForm" action={aiLinkAction} className="mt-6">
                  <input type="hidden" name="alias" value={aliasState.message} />
                  <input type="hidden" name="cf-turnstile-response-alias" value={turnstileTokenAlias || ""} />
                  <TurnstileWidget widgetRef={aliasWidgetRef} sitekey="0x4AAAAAACNvMyjAn5o7TUUA" callback={(token) => setTurnstileTokenAlias(token)} container="turnstile-container-alias" />

                  <button
                    type="submit"
                    disabled={!turnstileTokenAlias}
                    onClick={() => setShowAliasResult(true)}
                    className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                  >
                    {aiIsLinkPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Link
                      </span>
                    ) : (
                      <span>Create Short Link</span>
                    )}
                  </button>
                </form>
              )}

              {showAliasResult && aiLinkState.message && !aiLinkState.error && (
                <div className="space-y-4 mt-6">
                  <div className="p-4 sm:p-5 glass rounded-xl">
                    <p className="text-sm font-medium text-muted mb-3">
                      Your Short Link
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={aiLinkState.message}
                        readOnly
                        className="flex-1 px-4 py-3 glass-input rounded-xl font-mono text-foreground text-sm sm:text-base truncate"
                      />
                      <button
                        onClick={() => handleCopyLink(aiLinkState.message)}
                        className="px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition shadow-md whitespace-nowrap cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateAnother}
                    className="w-full py-3.5 glass-button hover:bg-white/15 text-foreground rounded-xl font-semibold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Another Link
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Custom Link */}
          {aliasMode === "custom" && (
            <form id="customForm" action={linkAction}>
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                  <label
                    htmlFor="alias"
                    className="block text-sm font-medium text-foreground"
                  >
                    Link Preview
                  </label>
                  <button
                    type="button"
                    onClick={() => setAliasMode("theme")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl font-semibold transition shadow-lg text-xs sm:text-sm cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate with AI
                  </button>
                </div>

                {/* Live Preview */}
                <div className="mt-3 px-4 py-3 glass rounded-xl mb-3 overflow-x-auto">
                  <p className="text-xs sm:text-sm text-muted font-mono whitespace-nowrap">
                    {"https://gotolnk.net/"}
                    <span className="text-foreground font-semibold">
                      {customPath || "my-path"}
                    </span>
                  </p>
                </div>

                <input
                  type="text"
                  id="alias"
                  name="alias"
                  required
                  pattern="[a-z0-9-]+"
                  placeholder="my-path"
                  value={customPath}
                  disabled={!!linkState?.message && !linkState?.error || isLinkPending}
                  onChange={(e) => {
                    const sanitized = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "");
                    setCustomPath(sanitized);
                  }}
                  className="w-full px-4 py-3 glass-input rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition text-foreground placeholder-muted font-mono text-sm sm:text-base"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Only lowercase letters, numbers, and hyphens allowed
                </p>
              </div>


              {/* Create Short Link Button */}
              {(linkState?.error || !linkState?.message) && (
                <>
                  <TurnstileWidget widgetRef={customWidgetRef} sitekey="0x4AAAAAACNuothYpEfUeJG7" callback={(token) => setTurnstileTokenCustom(token)} container="turnstile-container-alias" />
                  <input type="hidden" name="cf-turnstile-response-custom" value={turnstileTokenCustom || ""} />

                  <button
                    type="submit"
                    disabled={isLinkPending}
                    className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                  >
                    {isLinkPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Link
                      </span>
                    ) : (
                      <span>Create Short Link</span>
                    )}
                  </button>
                </>
              )}

            </form>
          )}

          {/* Generated Short Link Display */}
          {aliasMode === "custom" && linkState.message && !linkState.error && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 glass rounded-xl">
                <p className="text-sm font-medium text-muted mb-3">
                  Your Short Link
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={linkState.message}
                    readOnly
                    className="flex-1 px-4 py-3 glass-input rounded-xl font-mono text-foreground text-sm sm:text-base truncate"
                  />
                  <button
                    onClick={() => handleCopyLink(linkState.message)}
                    className="px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition shadow-md whitespace-nowrap cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>


              <button
                onClick={handleCreateAnother}
                className="w-full py-3.5 glass-button hover:bg-white/15 text-foreground rounded-xl font-semibold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Another Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
