import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export function AvatarDropdown({
  avatarSrc,
  name,
  bio,
  items,
  className = "",
}: AvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>(
    []
  );

  const close = () => {
    setOpen(false);
    setHighlightedIndex(-1);
    buttonRef.current?.focus();
  };
  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      if (!next) setHighlightedIndex(-1);
      return next;
    });
  };

  // クリック外で閉じる
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        buttonRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // メニュー内キーボード操作
  const onMenuKeyDown = (e: KeyboardEvent) => {
    const enabledIndexes = items
      .map((it, idx) => (it.disabled ? -1 : idx))
      .filter((i) => i !== -1) as number[];
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (enabledIndexes.length === 0) return;
      const next =
        highlightedIndex === -1
          ? enabledIndexes[0]
          : enabledIndexes.find((i) => i > highlightedIndex) ??
            enabledIndexes[0];
      setHighlightedIndex(next);
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (enabledIndexes.length === 0) return;
      const reversed = [...enabledIndexes].reverse();
      const prev =
        highlightedIndex === -1
          ? reversed[0]
          : reversed.find((i) => i < highlightedIndex) ?? reversed[0];
      setHighlightedIndex(prev);
      itemRefs.current[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (highlightedIndex !== -1 && !items[highlightedIndex].disabled) {
        items[highlightedIndex].onClick();
        close();
      }
    }
  };

  // ボタンで開く・初期ハイライト
  const onButtonKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      const firstEnabled = items.findIndex((it) => !it.disabled);
      if (firstEnabled !== -1) {
        setHighlightedIndex(firstEnabled);
        setTimeout(() => {
          itemRefs.current[firstEnabled]?.focus();
        }, 0);
      }
    }
  };

  return (
    <div className={`relative inline-block ${className}`} aria-haspopup="true">
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-expanded={open}
        aria-label="ユーザーメニュー"
        className="flex items-center focus:outline-none"
        onKeyDown={onButtonKeyDown}
        type="button"
      >
        <img
          src={avatarSrc}
          alt="ユーザーのアバター"
          className="w-16 h-16 rounded-full border-2 border-gray-300 cursor-pointer"
        />
      </button>

      <ul
        ref={panelRef}
        role="menu"
        aria-label="メニュー"
        onKeyDown={onMenuKeyDown}
        className={`${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        } origin-top-right absolute top-full right-0 mt-2 w-52 bg-white border border-gray-300 rounded shadow-md z-10 transition-all duration-150 ease-out`}
      >
        <div>
          <div className="flex items-center justify-between w-full px-4 pt-2 text-2xl text-left">
            {name}
          </div>
          <div className="flex items-center justify-between w-full px-4 pb-2 text-sm text-left border-b border-b-gray-300">
            {bio}
          </div>
        </div>
        {items.map((it, idx) => {
          const isHighlighted = highlightedIndex === idx;
          const baseClasses = [
            "flex items-center justify-between w-full px-4 py-2 text-sm text-left",
            it.disabled ? "cursor-not-allowed text-gray-400" : "",
            isHighlighted ? "bg-gray-100" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const mouseHandlers = {
            onMouseEnter: () => {
              if (!it.disabled) setHighlightedIndex(idx);
            },
            onMouseLeave: () => {
              setHighlightedIndex(-1);
            },
          };

          if ("href" in it) {
            // LinkItem
            return (
              <a
                key={idx}
                href={it.href}
                role="menuitem"
                aria-disabled={it.disabled || undefined}
                aria-selected={isHighlighted}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={baseClasses + " hover:bg-gray-100"}
                tabIndex={it.disabled ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  if (it.disabled) return;
                  it.onClick();
                  close();
                }}
                {...mouseHandlers}
              >
                <div className="flex items-center gap-2">
                  {it.icon && <span className="shrink-0">{it.icon}</span>}
                  <span>{it.label}</span>
                </div>
              </a>
            );
          } else {
            // ButtonItem
            return (
              <button
                key={idx}
                type="button"
                role="menuitem"
                disabled={it.disabled}
                aria-selected={isHighlighted}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className={
                  baseClasses + " hover:bg-gray-100 focus-visible:outline-none"
                }
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  if (it.disabled) return;
                  it.onClick();
                  close();
                }}
                {...mouseHandlers}
              >
                <div className="flex items-center gap-2">
                  {it.icon && <span className="shrink-0">{it.icon}</span>}
                  <span>{it.label}</span>
                </div>
              </button>
            );
          }
        })}
      </ul>
    </div>
  );
}
