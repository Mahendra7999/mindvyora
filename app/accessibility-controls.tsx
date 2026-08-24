"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";
type TextSize = "small" | "normal" | "large";

export default function AccessibilityControls() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [textSize, setTextSize] = useState<TextSize>("normal");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("mindvyora-theme") as Theme | null) || "dark";
    const savedSize = (localStorage.getItem("mindvyora-text-size") as TextSize | null) || "normal";
    setTheme(savedTheme);
    setTextSize(savedSize);
    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.dataset.fontScale = savedSize;
  }, []);

  function changeTheme(next: Theme) {
    setTheme(next);
    localStorage.setItem("mindvyora-theme", next);
    document.documentElement.dataset.theme = next;
  }

  function changeTextSize(next: TextSize) {
    setTextSize(next);
    localStorage.setItem("mindvyora-text-size", next);
    document.documentElement.dataset.fontScale = next;
  }

  return (
    <div className="accessibility-controls" aria-label="Display settings">
      <button type="button" className={theme === "dark" ? "active" : ""} onClick={() => changeTheme("dark")} aria-label="Dark mode" title="Dark mode">☾</button>
      <button type="button" className={theme === "light" ? "active" : ""} onClick={() => changeTheme("light")} aria-label="Light mode" title="Light mode">☀</button>
      <span className="accessibility-divider" />
      <button type="button" className={textSize === "small" ? "active" : ""} onClick={() => changeTextSize("small")} aria-label="Smaller text" title="Smaller text">A−</button>
      <button type="button" className={textSize === "normal" ? "active" : ""} onClick={() => changeTextSize("normal")} aria-label="Normal text" title="Normal text">A</button>
      <button type="button" className={textSize === "large" ? "active" : ""} onClick={() => changeTextSize("large")} aria-label="Larger text" title="Larger text">A+</button>
    </div>
  );
}
