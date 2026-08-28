// Scholar's Ledger context controls: three-dot triggers resolve to a compact, dismissible record-action menu.
import { Ellipsis } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ActionMenu({ label = "More actions", items = [] }) {
  const [open, setOpen] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    function close(event) {
      if (menu.current && !menu.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);


  return (
    <div className="context-menu" ref={menu}>
      <button
        className="row-more"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        <Ellipsis size={18} />
      </button>
      {/* TODO: test if works or now */}
      {open ? (
        <div className="context-menu-list" role="menu">
          {items.map(function handleItems(item) {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                role="menuitem"
                className={item.tone === "danger" ? "danger" : ""}
                disabled={item.disabled}
                onClick={() => {
                  setOpen(false);
                  item.onSelect?.();
                }}
              >
                {Icon ? <Icon size={15} /> : null}
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
