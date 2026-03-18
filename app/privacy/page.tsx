import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Policy — MOARIVO",
  description:
    "Informativa sul trattamento dei dati personali e policy sui cookie di MOARIVO, servizio di Bitwear S.r.l.",
};

const SECTIONS = [
  {
    id: "titolare",
    number: "1",
    title: "Titolare del Trattamento",
    content: (
      <>
        <p>
          Il titolare del trattamento dei dati personali raccolti tramite il
          servizio <strong>MOARIVO</strong> è:
        </p>
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-sm">
          <p className="font-semibold text-white">Bitwear S.r.l.</p>
          <p>P.IVA: 02480770227</p>
          <p>Sede legale: Via degli Alpini 7, 38027 Malè (TN)</p>
          <p>
            Contatto privacy:{" "}
            <a href="mailto:privacy@moarivo.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              privacy@moarivo.com
            </a>
          </p>
        </div>
        <p className="mt-3">
          Per qualsiasi richiesta relativa al trattamento dei dati personali è
          possibile contattarci all&apos;indirizzo e-mail sopra indicato.
        </p>
      </>
    ),
  },
  {
    id: "natura",
    number: "2",
    title: "Natura del Prodotto e Disclaimer Generale",
    content: (
      <>
        <p>
          MOARIVO è un software SaaS (Software as a Service) in fase beta,
          sviluppato da Bitwear S.r.l., destinato a consulenti e freelance per
          la gestione delle relazioni commerciali con supporto di intelligenza
          artificiale. Il servizio guida l&apos;utente attraverso una
          metodologia proprietaria in 7 fasi: Meet, Profiling, Attending,
          Checklisting, Outcomes, Quantifying, Follow Up/Recall.
        </p>
        <p className="mt-3">
          Il servizio è fornito nello stato in cui si trova (&quot;così
          com&apos;è&quot; e &quot;come disponibile&quot;) e, trattandosi di
          prodotto in fase beta, può contenere errori, malfunzionamenti,
          funzionalità incomplete o risultati non definitivi.
        </p>
        <h3 className="mt-6 mb-3 text-base font-semibold text-white">2.1 Assenza di Garanzie</h3>
        <p className="mb-3">Nei limiti massimi consentiti dalla legge, Bitwear S.r.l. non presta garanzie in ordine a:</p>
        <ul className="space-y-1.5">
          {[
            "funzionalità, continuità o assenza di interruzioni del servizio",
            "corretto funzionamento in ogni ambiente, dispositivo o sistema operativo",
            "accuratezza, completezza o affidabilità dei risultati prodotti",
            "assenza di errori, omissioni o vizi nel software",
            "disponibilità del servizio AI, soggetta alla disponibilità dei provider terzi (Anthropic, PBC)",
            "idoneità del servizio ad uno scopo particolare dell'utente",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-6 mb-3 text-base font-semibold text-white">2.2 Limitazione di Responsabilità</h3>
        <p className="mb-3">Bitwear S.r.l. non si assume alcuna responsabilità per danni derivanti da:</p>
        <ul className="space-y-1.5">
          {[
            "uso o impossibilità di usare il servizio MOARIVO",
            "errori, omissioni, ritardi o perdite di dati",
            "malfunzionamenti tecnici, bug o interruzioni del servizio",
            "decisioni commerciali prese sulla base delle analisi o proposte generate dall'AI di MOARIVO",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">La presente clausola non esclude la responsabilità nei casi in cui tale esclusione non sia consentita dalla legge.</p>
      </>
    ),
  },
  {
    id: "copyright",
    number: "3",
    title: "Proprietà Intellettuale e Copyright",
    content: (
      <>
        <p>
          MOARIVO, il brand, la metodologia proprietaria in 7 fasi, il software,
          il codice sorgente, le interfacce e tutti i contenuti del servizio sono
          di proprietà esclusiva di <strong className="text-white">Bitwear S.r.l.</strong>,
          P.IVA 02480770227, con sede in Via degli Alpini 7, 38027 Malè (TN).
        </p>
        <p className="mt-3">
          Tutti i diritti sono riservati. È vietata la copia, la riproduzione,
          la distribuzione o la modifica senza il previo consenso scritto di Bitwear S.r.l.
        </p>
      </>
    ),
  },
  {
    id: "gdpr",
    number: "4",
    title: "Trattamento dei Dati Personali (GDPR Reg. UE 679/2016)",
    content: (
      <>
        <h3 className="mb-3 text-base font-semibold text-white">4.1 Dati Raccolti</h3>
        <ul className="space-y-1.5 mb-4">
          {[
            "Dati di registrazione e wait-list: indirizzo e-mail, nome (facoltativi), referral code",
            "Dati di utilizzo del servizio: log di accesso, funzionalità utilizzate, preferenze",
            "Dati inseriti dall'utente nel CRM: contatti commerciali, note di riunioni, informazioni su aziende e interlocutori",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span><span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mb-4">Con riferimento ai dati inseriti nel CRM, l&apos;utente agisce in qualità di titolare autonomo del trattamento. MOARIVO agisce in qualità di responsabile del trattamento per conto dell&apos;utente.</p>

        <h3 className="mb-3 text-base font-semibold text-white">4.2 Finalità del Trattamento</h3>
        <ul className="space-y-1.5 mb-4">
          {[
            "Gestione della wait-list e comunicazioni pre-lancio (base giuridica: consenso)",
            "Erogazione del servizio MOARIVO (base giuridica: esecuzione del contratto)",
            "Miglioramento del servizio e delle funzionalità AI (base giuridica: legittimo interesse)",
            "Adempimento di obblighi di legge (base giuridica: obbligo legale)",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span><span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="mb-3 text-base font-semibold text-white">4.3 Sub-Processor</h3>
        <div className="grid gap-2 mb-4">
          {[
            { name: "Supabase Inc.", role: "database e autenticazione (server in Unione Europea)" },
            { name: "Vercel Inc.", role: "hosting e infrastruttura applicativa" },
            { name: "Resend Inc.", role: "invio e-mail transazionali e di servizio" },
            { name: "Anthropic, PBC", role: "elaborazione AI dei dati inseriti dall'utente" },
          ].map((sp) => (
            <div key={sp.name} className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
              <span className="font-semibold text-violet-300 flex-shrink-0 w-32">{sp.name}</span>
              <span className="text-gray-300">{sp.role}</span>
            </div>
          ))}
        </div>
        <p className="mb-4">I dati inseriti possono essere trasmessi ad Anthropic, PBC per l&apos;elaborazione AI, nel rispetto della loro Privacy Policy (anthropic.com/privacy).</p>

        <h3 className="mb-3 text-base font-semibold text-white">4.4 Conservazione dei Dati</h3>
        <ul className="space-y-1.5 mb-4">
          {[
            "Dati wait-list: fino alla revoca del consenso o chiusura del servizio",
            "Dati account utente: durata del contratto + 12 mesi",
            "Dati di log: massimo 90 giorni",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span><span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="mb-3 text-base font-semibold text-white">4.5 Diritti dell&apos;Interessato</h3>
        <p className="mb-3">In conformità agli articoli 15-22 del GDPR, l&apos;utente ha il diritto di accedere, rettificare, cancellare, limitare, portare e opporsi al trattamento dei propri dati.</p>
        <p>
          Contatto:{" "}
          <a href="mailto:privacy@moarivo.com" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">
            privacy@moarivo.com
          </a>
          {" "}· Reclami:{" "}
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 transition-colors">
            www.garanteprivacy.it
          </a>
        </p>
      </>
    ),
  },
  {
    id: "cookie",
    number: "5",
    title: "Cookie e Tecnologie di Tracciamento",
    content: (
      <>
        <p>MOARIVO utilizza cookie tecnici strettamente necessari al funzionamento del servizio. Non vengono utilizzati cookie di profilazione senza il previo consenso esplicito dell&apos;utente.</p>
        <div className="mt-4 grid gap-2">
          {[
            { type: "Cookie tecnici necessari", desc: "Sessione, autenticazione, sicurezza. Sempre attivi, non disabilitabili.", always: true },
            { type: "Cookie analitici", desc: "Analisi anonima dell'utilizzo per migliorare il servizio. Richiedono consenso.", always: false },
            { type: "Cookie di marketing", desc: "Contenuti personalizzati su piattaforme social. Richiedono consenso.", always: false },
          ].map((c) => (
            <div key={c.type} className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{c.type}</span>
                {c.always && <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">Sempre attivi</span>}
              </div>
              <p className="text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "ai",
    number: "6",
    title: "Utilizzo dell'Intelligenza Artificiale",
    content: (
      <>
        <p>MOARIVO integra modelli AI di terze parti (Anthropic, PBC — modelli Claude) per generare analisi, suggerimenti strategici, matching score e bozze di proposte commerciali.</p>
        <ul className="space-y-1.5 mt-3">
          {[
            "I contenuti generati dall'AI possono contenere imprecisioni o informazioni incomplete",
            "Bitwear S.r.l. non garantisce l'accuratezza dei contenuti prodotti dai modelli AI",
            "L'AI di MOARIVO è conforme ai requisiti di trasparenza previsti dall'AI Act UE",
            "I dati inseriti possono essere elaborati da Anthropic nel rispetto della loro Privacy Policy",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span><span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "responsabilita",
    number: "7",
    title: "Responsabilità dell'Utente",
    content: (
      <>
        <p>Le analisi e le proposte generate da MOARIVO hanno scopo di supporto e non costituiscono consulenza legale, contrattuale o commerciale vincolante. L&apos;utente è l&apos;unico responsabile delle proprie decisioni di business.</p>
      </>
    ),
  },
  {
    id: "modifiche",
    number: "8",
    title: "Modifiche alla presente Informativa",
    content: (
      <>
        <p>Bitwear S.r.l. si riserva il diritto di aggiornare questa Privacy Policy. Le modifiche sostanziali saranno comunicate via e-mail con almeno 14 giorni di preavviso. La versione aggiornata sarà sempre disponibile su <span className="text-violet-400">moarivo.com/privacy</span>.</p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#070711] text-gray-300">
      <div className="border-b border-white/5 bg-gradient-to-b from-violet-950/20 to-transparent">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <Link href="/" className="inline-block text-2xl font-black tracking-tight text-white mb-8">MOARIVO</Link>
          <h1 className="text-3xl font-bold text-white mb-3">Privacy Policy & Disclaimer</h1>
          <p className="text-gray-400 text-sm">Versione 1.0 — Marzo 2026 · Bitwear S.r.l.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="text-xs text-gray-500 hover:text-violet-400 transition-colors px-3 py-1 rounded-full border border-white/10 hover:border-violet-500/40">
                {s.number}. {s.title.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-violet-500 font-mono text-sm font-bold">{section.number}.</span>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <div className="text-sm leading-relaxed text-gray-400">{section.content}</div>
              <div className="mt-8 h-px bg-white/5" />
            </section>
          ))}
          <section id="accettazione" className="scroll-mt-8">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-violet-500 font-mono text-sm font-bold">9.</span>
              <h2 className="text-xl font-bold text-white">Accettazione</h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">Utilizzando MOARIVO o iscrivendosi alla wait-list, l&apos;utente dichiara di aver letto e accettato la presente Privacy Policy.</p>
            <div className="space-y-3">
              {[
                "Dichiaro di aver letto e accettato la Privacy Policy e il Disclaimer di MOARIVO",
                "Acconsento al trattamento dei miei dati per le finalità descritte (wait-list / comunicazioni di prodotto)",
                "Acconsento alla trasmissione dei dati inseriti nel CRM ai modelli AI di Anthropic",
              ].map((label) => (
                <div key={label} className="flex gap-3 p-3 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-400">
                  <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded border border-white/20" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600 space-y-1">
          <p className="font-medium text-gray-500">Bitwear S.r.l. · P.IVA 02480770227</p>
          <p>Via degli Alpini 7, 38027 Malè (TN)</p>
          <a href="mailto:privacy@moarivo.com" className="text-violet-500 hover:text-violet-400 transition-colors">privacy@moarivo.com</a>
        </div>
      </div>
    </main>
  );
}
