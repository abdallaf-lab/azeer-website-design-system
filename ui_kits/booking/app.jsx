/* global React */
const { useState, useEffect } = React;

const TENANT = {
  name: "Noor Dental Clinic",
  tagline: "Book your visit in under 2 minutes",
  initials: "N",
};

const SERVICES = [
  { id: "cleaning",  icon: "sparkles",  title: "Dental cleaning",     desc: "Hygienist · polish + scale", duration: "45 min", price: "220 SAR" },
  { id: "checkup",   icon: "stethoscope", title: "General check-up",  desc: "Dentist consultation + X-ray", duration: "30 min", price: "150 SAR" },
  { id: "whitening", icon: "smile",     title: "Teeth whitening",     desc: "In-chair professional whitening", duration: "60 min", price: "900 SAR" },
  { id: "emergency", icon: "zap",       title: "Emergency visit",     desc: "Same-day pain or injury",       duration: "30 min", price: "From 180" },
];

const PROVIDERS = [
  { id: "yusra",  name: "Dr Yusra Al-Harbi", initials: "YA", role: "Senior dentist" },
  { id: "khaled", name: "Dr Khaled Nasser",  initials: "KN", role: "Orthodontist" },
  { id: "reem",   name: "Dr Reem Al-Oteibi", initials: "RO", role: "Hygienist" },
  { id: "any",    name: "First available",   initials: "✦",  role: "Fastest booking" },
];

const DATES = [
  { id: "mon", dow: "Mon", day: 13, mon: "May" },
  { id: "tue", dow: "Tue", day: 14, mon: "May" },
  { id: "wed", dow: "Wed", day: 15, mon: "May" },
  { id: "thu", dow: "Thu", day: 16, mon: "May" },
  { id: "fri", dow: "Fri", day: 17, mon: "May" },
  { id: "sat", dow: "Sat", day: 18, mon: "May" },
  { id: "sun", dow: "Sun", day: 19, mon: "May" },
];
const SLOTS = ["09:00","09:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30"];
const TAKEN = ["10:00","13:30","15:00"];

const BRANDS = [
  { id: "noor",   color: "#7C64FE", name: "Noor (Azeer default)" },
  { id: "salla",  color: "#0C8F6C", name: "Atlas Shop (green)" },
  { id: "atlas",  color: "#D97706", name: "Atlas (amber)" },
];

function Header({ step, tenant }) {
  return (
    <header className="bk-header">
      <div className="bk-header-top">
        <div className="bk-tenant-logo">{tenant.initials}</div>
        <div className="bk-tenant-meta">
          <div className="bk-tenant-name">{tenant.name}</div>
          <div className="bk-tenant-tagline">{tenant.tagline}</div>
        </div>
      </div>
      <div className="bk-steps">
        {[0,1,2,3].map(i => (
          <div key={i} className={`bk-step ${step>i?"done":""} ${step===i?"current":""}`}/>
        ))}
      </div>
      <div className="bk-step-label">Step {step+1} of 4 · {["Service","Provider","Time","Your details"][step]}</div>
    </header>
  );
}

function StepService({ value, onChange }) {
  return (
    <>
      <h1 className="bk-title">Choose a service</h1>
      <p className="bk-sub">Tell us what you're visiting for.</p>
      <div className="bk-cards">
        {SERVICES.map(s => (
          <button key={s.id} className={`bk-card ${value===s.id?"selected":""}`} onClick={()=>onChange(s.id)}>
            <div className="bk-card-icon"><i data-lucide={s.icon}></i></div>
            <div className="bk-card-body">
              <span className="bk-card-title">{s.title}</span>
              <span className="bk-card-desc">{s.desc} · {s.duration}</span>
            </div>
            <span className="bk-card-meta">{s.price}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function StepProvider({ value, onChange }) {
  return (
    <>
      <h1 className="bk-title">Pick your provider</h1>
      <p className="bk-sub">Or let us match you with the first available clinician.</p>
      <div className="bk-providers">
        {PROVIDERS.map(p => (
          <button key={p.id} className={`bk-provider ${value===p.id?"selected":""}`} onClick={()=>onChange(p.id)}>
            <div className="bk-avatar">{p.initials}</div>
            <div>
              <div style={{fontSize:14,fontWeight:600}}>{p.name}</div>
              <div style={{fontSize:12,color:"var(--muted-foreground)"}}>{p.role}</div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function StepTime({ date, onDate, slot, onSlot }) {
  return (
    <>
      <h1 className="bk-title">Pick a time</h1>
      <p className="bk-sub">All times shown in Riyadh timezone (GMT+3).</p>
      <div className="bk-dates">
        {DATES.map(d => (
          <button key={d.id} className={`bk-date ${date===d.id?"selected":""}`} onClick={()=>onDate(d.id)}>
            <span className="bk-date-dow">{d.dow}</span>
            <span className="bk-date-day">{d.day}</span>
            <span className="bk-date-mon">{d.mon}</span>
          </button>
        ))}
      </div>
      <div className="bk-slots">
        {SLOTS.map(s => (
          <button key={s} className={`bk-slot ${slot===s?"selected":""}`}
                  disabled={TAKEN.includes(s)} onClick={()=>onSlot(s)}>{s}</button>
        ))}
      </div>
    </>
  );
}

function StepDetails({ form, onChange }) {
  const set = (k,v) => onChange({...form, [k]: v});
  return (
    <>
      <h1 className="bk-title">Your details</h1>
      <p className="bk-sub">We'll send your confirmation to WhatsApp.</p>
      <div className="bk-form">
        <div className="bk-field">
          <label className="bk-label">Full name</label>
          <input className="bk-input" value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Khaled Al-Saud"/>
        </div>
        <div className="bk-field">
          <label className="bk-label">WhatsApp number</label>
          <input className="bk-input" dir="ltr" value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+966 5X XXX XXXX"/>
        </div>
        <div className="bk-field">
          <label className="bk-label">Note for the clinic (optional)</label>
          <textarea className="bk-textarea" value={form.note} onChange={e=>set("note",e.target.value)} placeholder="E.g. sensitive teeth, arriving with a child…"></textarea>
        </div>
      </div>
    </>
  );
}

function Summary({ service, provider, date, slot, form }) {
  const s = SERVICES.find(x=>x.id===service);
  const p = PROVIDERS.find(x=>x.id===provider);
  const d = DATES.find(x=>x.id===date);
  return (
    <div className="bk-summary">
      <div className="bk-summary-row"><span className="k">Service</span><span className="v">{s?.title}</span></div>
      <div className="bk-summary-row"><span className="k">Provider</span><span className="v">{p?.name}</span></div>
      <div className="bk-summary-row"><span className="k">When</span><span className="v">{d ? `${d.dow} ${d.day} ${d.mon}` : "—"} · {slot || "—"}</span></div>
      <div className="bk-summary-row"><span className="k">Name</span><span className="v">{form.name || "—"}</span></div>
      <div className="bk-summary-row"><span className="k">Phone</span><span className="v" dir="ltr">{form.phone || "—"}</span></div>
      <div className="bk-summary-row"><span className="k">Price</span><span className="v">{s?.price}</span></div>
    </div>
  );
}

function Success({ form, tenant }) {
  return (
    <div className="bk-success">
      <div className="bk-success-icon"><i data-lucide="check"></i></div>
      <h1 className="bk-title">Appointment confirmed</h1>
      <p className="bk-sub" style={{maxWidth:420}}>
        {tenant.name} will send a WhatsApp confirmation to{" "}
        <span dir="ltr" style={{color:"var(--foreground)",fontWeight:500}}>{form.phone || "your phone"}</span>.
        You can reschedule by replying to that message.
      </p>
    </div>
  );
}

function Attribution({ tier = "starter" }) {
  if (tier === "enterprise") return null;
  return (
    <div className="bk-attr">
      Bookings powered by
      <img src="../../assets/logo-mark.svg" alt=""/>
      <span style={{fontWeight:600,color:"var(--foreground)"}}>Azeer</span>
    </div>
  );
}

function App() {
  const [brand, setBrand] = useState(BRANDS[0]);
  const [step, setStep] = useState(0);
  const [service, setService] = useState("cleaning");
  const [provider, setProvider] = useState("yusra");
  const [date, setDate] = useState("tue");
  const [slot, setSlot] = useState("10:30");
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--tenant-primary", brand.color);
  }, [brand]);
  useEffect(() => { lucide.createIcons(); });

  const canNext = [
    !!service,
    !!provider,
    !!date && !!slot,
    form.name.trim().length > 1 && form.phone.trim().length > 5,
  ][step];

  if (done) {
    return (
      <>
        <BrandToggle brand={brand} setBrand={setBrand}/>
        <div className="bk-shell">
          <Success form={form} tenant={TENANT}/>
          <Attribution />
        </div>
      </>
    );
  }

  return (
    <>
      <BrandToggle brand={brand} setBrand={setBrand}/>
      <div className="bk-shell">
        <Header step={step} tenant={TENANT}/>
        <div className="bk-body">
          {step===0 && <StepService value={service} onChange={setService}/>}
          {step===1 && <StepProvider value={provider} onChange={setProvider}/>}
          {step===2 && <StepTime date={date} onDate={setDate} slot={slot} onSlot={setSlot}/>}
          {step===3 && (
            <>
              <StepDetails form={form} onChange={setForm}/>
              <Summary service={service} provider={provider} date={date} slot={slot} form={form}/>
            </>
          )}
        </div>
        <div className="bk-actions">
          {step > 0 && (
            <button className="bk-btn bk-btn-ghost" onClick={()=>setStep(s=>s-1)}>
              <i data-lucide="arrow-left" style={{width:16,height:16}}></i>Back
            </button>
          )}
          <button
            className="bk-btn bk-btn-primary"
            disabled={!canNext}
            onClick={()=> step===3 ? setDone(true) : setStep(s=>s+1)}
          >
            {step===3 ? "Confirm booking" : "Continue"}
            <i data-lucide="arrow-right" style={{width:16,height:16}}></i>
          </button>
        </div>
        <Attribution />
      </div>
    </>
  );
}

function BrandToggle({ brand, setBrand }) {
  return (
    <div className="bk-brand-toggle" title="Tenant brand">
      {BRANDS.map(b => (
        <button key={b.id} className={`bk-swatch ${brand.id===b.id?"active":""}`}
                style={{background:b.color}} onClick={()=>setBrand(b)} title={b.name}/>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
