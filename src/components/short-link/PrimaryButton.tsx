import type { ReactNode } from "react";
import Icon, { ICONS } from "@/components/ui/Icon";
import Spinner from "@/components/ui/Spinner";

export default function PrimaryButton({
  pending,
  disabled,
  waiting,
  onClick,
  children,
}: {
  pending: boolean;
  disabled: boolean;
  waiting?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent py-3.5 font-semibold text-accent-ink shadow-[0_8px_30px_-8px_var(--accent)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none cursor-pointer"
    >
      {pending ? (
        <>
          <Spinner /> Creating your link…
        </>
      ) : waiting ? (
        <>
          <Spinner /> Verifying you&apos;re human…
        </>
      ) : (
        <>
          {children}
          <Icon
            d={ICONS.arrow}
            className="h-4 w-4 transition group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}
