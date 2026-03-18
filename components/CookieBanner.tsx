"use client";
import { useState, useEffect } from "react";

interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "moarivo_cookie_consent";

export function getConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveConsent(prefs: CookiePreferences) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, timestamp: new Date().toISOString() }));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => { if (!getConsent()) setVisible(true); }, []);
  if (!visible) return null;

  const acceptAll = () => { saveConsent({ necessary: true, analytics: true, marketing: true }); setVisible(false); };
  const acceptNecessary = () => { saveConsent({ necessary: true, analytics: false, marketing: false }); setVisible(false); };
  const saveCustom = () => { saveConsent({ necessary: true, analytics, marketing }); setVisible(false); };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 shadow-2xl"
        style={{ background: "rgba(15,10,30,0.97)", backdropFilter: "blur(20px)" }}>
        {!showDetails ? (
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "rgba(124,58,237,0.2)" }}>🍪</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">MOARIVO utilizza i cookie</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Usiamo cookie tecnici necessari e, con il tuo consenso, cookie analitici.
                  Gestiti da <span className="text-purple-400 font-medium">Bitwear S.r.l.</span> nel rispetto del GDPR.{" "}
                  <a href="/privacy" className="underline text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  {" "}·{" "}
                  <a href="/privacy#cookie" className="underline text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
              <button onClick={() => setShowDetails(true)} className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">Personalizza</button>
              <button onClick={acceptNecessary} className="text-xs text-gray-300 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">Solo necessari</button>
              <button onClick={acceptAll} className="text-xs font-semibold text-white px-5 py-2 rounded-lg"
                style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 0 20px rgba(124,58,237,0.35)" }}>
                Accetta tutti
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Gestisci preferenze cookie</h2>
              <button onClick={() => setShowDetails(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
            </div>
            <div className="space-y-3 mb-5">
              <ToggleRow title="Cookie tecnici necessari" description="Necessari per sessione e autenticazione. Non disabilitabili." checked={true} disabled={true} onChange={() => {}} />
              <ToggleRow title="Cookie analitici" description="Analisi anonima dell'utilizzo del sito. Nessun dato personale con terze parti." checked={analytics} disabled={false} onChange={setAnalytics} />
              <ToggleRow title="Cookie di marketing" description="Contenuti personalizzati sui social. Attualmente non attivi." checked={marketing} disabled={false} onChange={setMarketing} />
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Titolare: <span className="text-gray-400">Bitwear S.r.l. · privacy@moarivo.com</span>
            </p>
            <div className="flex flex-wrap gap-2 justify-end">
              <button onClick={acceptNecessary} className="text-xs text-gray-300 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">Solo necessari</button>
              <button onClick={saveCustom} className="text-xs text-gray-200 px-4 py-2 rounded-lg border border-purple-500/40 hover:border-purple-400">Salva preferenze</button>
              <button onClick={acceptAll} className="text-xs font-semibold text-white px-5 py-2 rounded-lg" style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}>Accetta tutti</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleRow({ title, description, checked, disabled, onChange }: {
  title: string; description: string; checked: boolean; disabled: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
      <div className="flex-1">
        <p className="text-xs font-semibold text-white mb-0.5">{title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
      <button role="switch" aria-checked={checked} disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 mt-0.5 ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        style={{ background: checked ? "linear-gradient(135deg,#7c3aed,#6d28d9)" : "rgba(255,255,255,0.1)" }}>
        <span className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
          style={{ left: checked ? "calc(100% - 18px)" : "2px" }} />
      </button>
    </div>
  );
}
