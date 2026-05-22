# Azeer voice & tone

Source of truth: `packages/tokens/src/brand.ts` (`BRAND_VOICE`,
`BRAND_WRITING_RULES`). The brand voice is **Arabic-first** — Arabic strings are
canonical; English mirrors them. Reference clinic copy lives in
`apps/website/src/content/clinics.ts`; generic omnichannel copy in
`apps/website/src/content/marketing.ts`.

## Who you are writing to

The **operator** — the person in charge of a clinic or a store. They count money,
not features. Confident, founder-energy, peer-to-peer. Never a vendor pitching, never
a hype machine.

## The three voice attributes

### 1. راسخ — Rooted
Rooted in reality. Humble and self-assured; unmoved by praise or blame.
- **Quiet:** calm, no fuss — "Azeer helps you grow customer relationships through
  effective, integrated, dependable communication."
- **Medium:** confident in its read of context.
- **Loud:** speaks as if it knows what's coming — "The future belongs to companies
  that communicate well with their customers."

### 2. موآزر — Supportive ally
Not a service provider — a partner in the customer's success. Cares, solves, pushes
forward with them.
- **Quiet:** a friend ready to listen — "If you need us, we're here."
- **Medium:** proactive because it genuinely cares.
- **Loud:** stays with the customer until they reach their goal.

### 3. دقيق — Precise
A surgeon — picks words exactly, unafraid of clarity, attends to detail.
- **Quiet:** even in casual talk, always the right word.
- **Medium:** unafraid to spell out the details.
- **Loud:** can reframe to advance its own point of view.

Pick the level by surface: Quiet for in-product/system copy, Medium for most
marketing body, Loud for the hero/manifesto line and the closing CTA.

## The 14 writing rules (قل / لا تقل)

1. **Address the person in charge.** Azeer is their companion toward their goals —
   aim every line at them.
   - قل: "خلينا نراجع سوا نتائج الحملة الأخيرة." · Say: "Let's review last month's results together."
   - لا تقل: "نوصي عملاءنا بمراجعة نتائج الحملة." / "We advise our clients to review campaign results."
2. **Don't speak about what you don't know.** Ask first if you're fully confident.
   - قل: "خليني أتأكد من الفريق الفني وأرجع لك." لا تقل: "أكيد النظام يدعم الخاصية، بس خليني أتأكد."
3. **Use everyday words.** Make it easy, not complicated.
   - قل: "وصل الإشعار." لا تقل: "تم إرسال الإشعار بنجاح."
4. **Use Modern Standard Arabic** in documents, email, and the website.
5. **Use neutral Saudi "white" dialect** on social and ad campaigns. (Other dialects
   only in specific contexts — consult the brand owner.)
6. **Active, forward-moving verbs.** Avoid flat verbs that feel like nothing happens.
   - قل: "اربط النظام بواتساب الآن." لا تقل: "يتكامل النظام مع واتساب." (Say "Connect WhatsApp now," not "The system integrates with WhatsApp.")
7. **Short sentences. Favor brevity.**
   - قل: "جرّب الخاصية الجديدة، وشوف الفرق." لا تقل: "نقدّم لك خاصية جديدة تساعدك على تحقيق نتائج أفضل بشكل أسرع."
8. **Don't overuse emoji.** Only when it adds meaning.
   - قل: "تم حل المشكلة ✅" لا تقل: "تم حل المشكلة 😍🔥💪🎉"
9. **Avoid filler.** Delete every word that adds no meaning, every sentence with no message.
   - قل: "الخاصية تعمل تلقائيًا." لا تقل: "هذه الخاصية تعمل بطريقة تلقائية دون الحاجة لأي تدخل منك."
10. **Speak as a partner/colleague**, not a service provider or salesperson.
    - قل: "خلينا نشوف مع بعض فين الخطأ ونعدله." لا تقل: "نعتذر عن الخطأ، ونرجو أن تتحملنا قليلًا."
11. **Precise before eloquent.** Avoid grandiloquence; pick the most exact word.
    - قل: "توصلك الإشعارات خلال ثانيتين." لا تقل: "تُرسل الإشعارات بسرعة فائقة لا مثيل لها."
12. **Be candid.** Share what the other side needs to know now.
    - قل: "تأخّر التحديث عن الجدول المعلن، ونعمل على إصلاح السبب." لا تقل: "واجهنا بعض التحديات البسيطة..."
13. **Care, don't flatter.** A fine line between being beside the customer and flattery that hides something.
    - قل: "نتفهم قلقك، وبدأنا بحل المشكلة." لا تقل: "نعتذر جدًا جدًا عن الإزعاج ونتمنى لك يومًا سعيدًا."
14. **Don't be defensive.** When an apology is due, apologize sincerely.
    - قل: "الخلل حصل عندنا. تم إصلاحه بالكامل الآن." لا تقل: "حدث خلل بسيط من طرفكم أو بسبب الضغط الكبير."

## Banned marketing-fluff (English)

"revolutionize your business," "unleash," "supercharge," "game-changer,"
"next-level," "cutting-edge," "seamlessly empower," "world-class," "blazing-fast,"
"10x your…", excessive exclamation, and any flattery. Replace with a concrete,
measured outcome.

## Headline pattern

Operator outcome + concrete number/mechanism, not a capability list.
- Good: "Turn every WhatsApp message into a booked, paid appointment."
- Good: "Deposits that stop no-shows. Patients who pay, show up."
- Bad: "The all-in-one platform to revolutionize patient communication."

## Vertical playbooks

### Healthcare clinics (GCC)
Frame: WhatsApp revenue orchestration — booking, deposits, reminders, no-show
recovery, reactivation. Revenue, not vanity metrics ("3.2× return," "−38% no-shows,"
"41% booked after hours"). Trust: Meta Business Partner, PDPL-ready, in-region data
residency (GCC/EU), HIPAA-aligned. Patients use the WhatsApp they already have —
nothing to install. Arabic + English, 24/7. Specialties: dental, dermatology,
aesthetics, IVF, implants, cosmetic surgery, physiotherapy. Markets: Riyadh, Jeddah,
Dubai, Abu Dhabi, Doha, Kuwait City, Manama. (See `content/clinics.ts`.)

### E-commerce (Salla / Zid)
Frame: turn store conversations into orders and repeat revenue — abandoned-cart
recovery, order updates, COD confirmation, post-purchase reactivation, broadcasts
within WhatsApp policy. Speak to the store owner / growth lead. Outcomes: recovered
carts, repeat-purchase rate, GMV per conversation, fewer failed COD deliveries.
Integrations: Salla and Zid storefronts, payment (Mada/Apple Pay/card), catalog.
Same trust spine (Meta Business Partner, PDPL, in-region residency). Same Arabic-first
voice and revenue framing as clinics. (No dedicated content file yet — model the tone
on `content/clinics.ts`.)
