"use client";

import { useState, useRef } from "react";
import { generateAlias, createShortLink } from "../actions/generateAlias";
import { useActionState } from "react";

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
  const [aliasState, formAction, isPending] = useActionState(generateAlias, { error: false, message: "" });
  const [linkState, linkAction, isLinkPending] = useActionState(createShortLink, { error: false, message: "" });
  const [aiLinkState, aiLinkAction, aiIsLinkPending] = useActionState(createShortLink, { error: false, message: "" });

  const [aliasMode, setAliasMode] = useState<"theme" | "custom">("custom");
  const [customPath, setCustomPath] = useState("");
  const [showToast, setShowToast] = useState(false);
  const themeInputRef = useRef<HTMLInputElement>(null);
  const aiFormRef = useRef<HTMLFormElement>(null);

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleThemeSuggestion = (theme: string) => {
    if (themeInputRef.current && aiFormRef.current) {
      themeInputRef.current.value = theme;
      aiFormRef.current.requestSubmit();
    }
  };

  const handleCreateAnother = () => {
    // Reset the page to allow creating another link
    window.location.reload();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-5 sm:right-auto z-50 animate-fade-in">
          <div className="bg-slate-900 text-white px-4 py-3 sm:px-6 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2">
            <span className="font-medium text-sm sm:text-base">Copied to clipboard</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
        Short Link Generator
      </h1>
      <p className="text-slate-400 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        Create custom short links with AI-powered generation
      </p>
      <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 sm:p-8 bg-slate-800">
          {/* Destination URL Input - ALWAYS VISIBLE */}
          <div className="mb-6 p-3 sm:p-4 bg-slate-700 rounded-lg border border-slate-600 shadow-sm">
            <label
              htmlFor="destinationUrl"
              className="block text-sm font-semibold text-slate-200 mb-2"
            >
              🔗 Destination URL
            </label>
            <input
              type="url"
              id="destinationUrl"
              form={aliasMode === "custom" ? "customForm" : "aiForm"}
              name="destinationUrl"
              required
              defaultValue={linkState.destinationUrl || aiLinkState.destinationUrl}
              placeholder="https://example.com"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition text-slate-900 placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Theme-based Link Generation - Integrated Form */}
          {aliasMode === "theme" && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <span className="block text-sm font-medium text-slate-200">
                  ✨ AI Link Generator
                </span>
                <button
                  type="button"
                  onClick={() => setAliasMode("custom")}
                  className="text-sm text-slate-400 hover:text-slate-200 font-medium transition text-left sm:text-right"
                >
                  ← Use Custom Name
                </button>
              </div>

              <form
                ref={aiFormRef}
                action={formAction}
                className="space-y-4"
              >
                {/* Custom Theme Input */}
                <div>
                  <label
                    htmlFor="customTheme"
                    className="block text-sm font-medium text-slate-200 mb-2"
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
                      className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition text-slate-900 placeholder-gray-400 shadow-sm text-sm sm:text-base"
                      disabled={isPending}
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-6 py-2.5 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
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

                {/* Generated Alias Display - Integrated within form */}
                {!isPending && aliasState.message && !aliasState.error && (
                  <div className="p-3 sm:p-4 bg-linear-to-r from-green-900/20 to-emerald-900/20 border border-green-600 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium text-green-300">Generated Successfully</span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg font-mono font-semibold text-green-300 truncate">
                      {typeof window !== "undefined" ? window.location.origin : ""}
                      /<span className="text-white">{aliasState.message}</span>
                    </p>
                  </div>
                )}

                {/* Error Display */}
                {aliasState.error && aliasState.message && (
                  <div className="space-y-3">
                    <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-sm text-red-400">{aliasState.message}</p>
                      </div>
                      <button
                        onClick={handleCreateAnother}
                        className="w-full py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Theme Suggestions */}
                {!aliasState.message && (
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-2">
                      Or try a suggestion:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => handleThemeSuggestion(theme.label)}
                          disabled={isPending}
                          className="px-3 py-1.5 text-sm rounded-full border border-slate-500 bg-slate-600 text-slate-200 hover:border-white hover:bg-slate-500 hover:text-white transition disabled:opacity-50 shadow-sm capitalize"
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </form>

              {aliasState.message && !aiLinkState.message && !aiLinkState.error && !aliasState.error && (
                <form id="aiForm" action={aiLinkAction} className="mt-6">
                  <input type="hidden" name="alias" value={aliasState.message} />
                  <button
                    type="submit"
                    disabled={aiIsLinkPending}
                    className="flex items-center justify-center w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {aiIsLinkPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generating
                      </span>
                    ) : (
                      <span>Generate Short Link</span>
                    )}
                  </button>
                </form>
              )}

              {/* AI Link Generation Error Display */}
              {aiLinkState.error && aiLinkState.message && (
                <div className="space-y-3 mt-6">
                  <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-sm text-red-400">{aiLinkState.message}</p>
                    </div>
                    <button
                      onClick={handleCreateAnother}
                      className="w-full py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* AI Generated Short Link Display */}
              {aiLinkState.message && !aiLinkState.error && (
                <div className="space-y-4 mt-6">
                  <div className="p-4 sm:p-5 bg-slate-700 border border-slate-600 rounded-lg shadow-md">
                    <p className="text-sm font-medium text-slate-200 mb-3">
                      Your Short Link
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                      <input
                        type="text"
                        value={aiLinkState.message}
                        readOnly
                        className="flex-1 px-3 sm:px-4 py-2.5 bg-white border border-slate-300 rounded-lg font-mono text-slate-900 shadow-sm text-sm sm:text-base truncate"
                      />
                      <button
                        onClick={() => handleCopyLink(aiLinkState.message)}
                        className="px-4 sm:px-5 py-2.5 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition shadow-md whitespace-nowrap"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* Create Another Link Button */}
                  <button
                    onClick={handleCreateAnother}
                    className="w-full py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition shadow-lg flex items-center justify-center gap-2"
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

          {/* Main Form - Only shown when ready to create link */}
          {aliasMode === "custom" && (
            <form id="customForm" action={linkAction}>
              {/* Custom Link Input */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
                  <label
                    htmlFor="alias"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Link Preview
                  </label>
                  <button
                    type="button"
                    onClick={() => setAliasMode("theme")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition shadow-lg text-xs sm:text-sm"
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
                <div className="mt-3 px-3 sm:px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg mb-2 overflow-x-auto">
                  <p className="text-xs sm:text-sm text-slate-300 font-mono whitespace-nowrap">
                    {"localhost:3000"}
                    <span className="text-white font-semibold">
                      /{customPath || "my-path"}
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
                  onChange={(e) => {
                    const sanitized = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "");
                    setCustomPath(sanitized);
                  }}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none transition text-slate-900 placeholder-gray-400 font-mono shadow-sm text-sm sm:text-base"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Only lowercase letters, numbers, and hyphens allowed
                </p>
              </div>



              {/* Create Short Link Button */}
              {!linkState.message && !linkState.error && (
                <button
                  type="submit"
                  disabled={isLinkPending}
                  className="flex items-center justify-center w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLinkPending ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating
                    </span>
                  ) : (
                    <span>Generate Short Link</span>
                  )}
                </button>
              )}
            </form>
          )}

          {/* Custom Link Generation Error Display */}
          {aliasMode === "custom" && linkState.error && linkState.message && (
            <div className="space-y-3">
              <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-sm text-red-400">{linkState.message}</p>
                </div>
                <button
                  onClick={handleCreateAnother}
                  className="w-full py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Generated Short Link Display */}
          {aliasMode === "custom" && linkState.message && !linkState.error && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 bg-slate-700 border border-slate-600 rounded-lg shadow-md">
                <p className="text-sm font-medium text-slate-200 mb-3">
                  Your Short Link
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    value={linkState.message}
                    readOnly
                    className="flex-1 px-3 sm:px-4 py-2.5 bg-white border border-slate-300 rounded-lg font-mono text-slate-900 shadow-sm text-sm sm:text-base truncate"
                  />
                  <button
                    onClick={() => handleCopyLink(linkState.message)}
                    className="px-4 sm:px-5 py-2.5 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition shadow-md whitespace-nowrap"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Create Another Link Button */}
              <button
                onClick={handleCreateAnother}
                className="w-full py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold transition shadow-lg flex items-center justify-center gap-2"
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
