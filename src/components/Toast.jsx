import { useEffect, useState } from "react";
import "./Toast.css";

let toastQueue = [];
let listeners = [];

export function showToast(message, type = "success", icon = null) {
  const id = Date.now();
  const toast = { id, message, type, icon };
  toastQueue = [...toastQueue, toast];
  listeners.forEach((fn) => fn([...toastQueue]));
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    listeners.forEach((fn) => fn([...toastQueue]));
  }, 3200);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (q) => setToasts([...q]);
    listeners.push(listener);
    return () => { listeners = listeners.filter((l) => l !== listener); };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          {t.icon && <span className="toast-icon">{t.icon}</span>}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
