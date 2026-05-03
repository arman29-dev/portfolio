import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\\|[]{}~`";

export default function DecryptedText({
  text = "",
  className = "",
  delay = 0,
  speed = 40,
  once = true,
}) {
  const [display, setDisplay] = useState(() =>
    text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]),
  );
  const revealedRef = useRef(new Array(text.length).fill(false));
  const [, forceUpdate] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    let cancelled = false;
    let revealTimeout = null;

    const scramble = setInterval(() => {
      setDisplay(
        text.split("").map((ch, i) =>
          revealedRef.current[i]
            ? ch
            : CHARS[Math.floor(Math.random() * CHARS.length)],
        ),
      );
    }, 50);

    let idx = 0;
    const reveal = () => {
      if (cancelled) return;
      if (idx >= text.length) { clearInterval(scramble); return; }
      revealedRef.current[idx] = true;
      idx++;
      forceUpdate((n) => n + 1);
      revealTimeout = setTimeout(reveal, speed);
    };

    const delayTimeout = setTimeout(reveal, delay);

    return () => {
      cancelled = true;
      clearInterval(scramble);
      clearTimeout(delayTimeout);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [inView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            color: revealedRef.current[i] ? "inherit" : "rgba(0,242,255,0.45)",
            transition: "color 0.1s",
          }}
        >
          {revealedRef.current[i] ? ch : display[i]}
        </span>
      ))}
    </span>
  );
}
