/**
 * @azeer/tokens — BRAND metadata (دليل هوية أزير / Azeer Brand Book).
 *
 * Typed, read-only mirror of the brand book. Like the rest of @azeer/tokens
 * this is consumed by docs (Storybook "Brand" section), the marketing site
 * (`@azeer/website-ui`), audits, and scripts — never imported into product
 * components at runtime (those use the semantic `--color-*` tokens).
 *
 * The brand book is the source of truth; brand color hex values mirror
 * `brand.css`. Arabic strings are canonical (the brand voice is Arabic-first);
 * English glosses are provided for developer ergonomics.
 */

/* ─────────────────────────────────────────────────────────────────────── */
/*  Colors — الألوان                                                        */
/* ─────────────────────────────────────────────────────────────────────── */

export type BrandColorMeta = {
  /** Tailwind token name → `bg-brand-primary`, `text-brand-primary`, … */
  readonly token: string;
  readonly cssVar: `--brand-${string}`;
  readonly utility: string;
  readonly roleEn: string;
  readonly nameAr: string;
  readonly hex: string;
  readonly rgb: string;
  readonly hsb: string;
  readonly cmyk: string;
  /** Recommended on-color text variable for legible pairings. */
  readonly onColorVar?: `--brand-${string}`;
  /** الدلالة — what the color signifies. */
  readonly meaningAr: string;
  /** الشخصية — the color's personality. */
  readonly personalityAr: string;
  /** How the brand color relates to the product-UI token system. */
  readonly productMapping: string;
};

export const BRAND_COLORS = {
  primary: {
    token: "brand-primary",
    cssVar: "--brand-primary",
    utility: "bg-brand-primary",
    roleEn: "Primary",
    nameAr: "اللون الأساسي",
    hex: "#7B61FF",
    rgb: "123, 97, 255",
    hsb: "250, 62%, 100%",
    cmyk: "66, 67, 0, 0",
    onColorVar: "--brand-on-primary",
    meaningAr:
      "لون مثالي لعكس وضوح أزير كبراند وشفافيته المطلقة. وسطٌ بين الفاقع والباهت، وله مرجعية تراثية في الثقافة السعودية تمنح البراند رسوخًا وأصالة مع انطلاقة عالمية.",
    personalityAr: "حديث، جاذب بصريًا، ديناميكي، يمنح إحساسًا بالاحترافية والرؤية المستقبلية.",
    productMapping:
      "= --color-accent-brand (#7B61FF). NON-TEXT identity color. Product white-text CTAs use --color-accent-fill (#5238D1, 7.3:1 AAA).",
  },
  secondary: {
    token: "brand-secondary",
    cssVar: "--brand-secondary",
    utility: "bg-brand-secondary",
    roleEn: "Secondary",
    nameAr: "اللون الثانوي",
    hex: "#0A1F44",
    rgb: "10, 31, 68",
    hsb: "218, 85%, 27%",
    cmyk: "100, 89, 41, 48",
    onColorVar: "--brand-on-secondary",
    meaningAr:
      "أزرق داكن يوحي بالاستقرار والموثوقية، ويرمز للثقة والحماية والاستمرارية — خصوصًا مع عملاء B2B الباحثين عن حلول طويلة الأمد. يضع الأساس الجاد ويوازن جرأة اللون الأساسي.",
    personalityAr: "مسؤول، هادئ، يساعد على بناء الثقة في كل تواصل.",
    productMapping:
      "Brand-only navy. Closest product token is --color-surface-inverse (#1F1450, indigo-950) — not identical; do not substitute.",
  },
  accent: {
    token: "brand-accent",
    cssVar: "--brand-accent",
    utility: "bg-brand-accent",
    roleEn: "Accent",
    nameAr: "اللون التمييزي",
    hex: "#FFC857",
    rgb: "255, 200, 87",
    hsb: "40, 66%, 100%",
    cmyk: "0, 22, 76, 0",
    onColorVar: "--brand-on-accent",
    meaningAr:
      "أصفر يعبّر عن التفاؤل والطاقة والوضوح. يضيف إشراقة إيجابية ويشد الاهتمام للعناصر المهمة (CTA، رسائل الحملات)، ويؤكد أن أزير تحفّز عملاءها وتدعم نجاحهم بإيجابية.",
    personalityAr: "مشرق، محفّز، يوجّه الانتباه ويحفّز التفاعل.",
    productMapping:
      "Brand-only amber. NEVER white text on it (fails contrast) — pair with --brand-on-accent (#2E2E2E). Distinct from product --color-warning-fill (#F2B232).",
  },
  neutral: {
    token: "brand-neutral",
    cssVar: "--brand-neutral",
    utility: "bg-brand-neutral",
    roleEn: "Neutral",
    nameAr: "اللون الحيادي",
    hex: "#2E2E2E",
    rgb: "46, 46, 46",
    hsb: "0, 0%, 18%",
    cmyk: "70, 64, 63, 63",
    meaningAr:
      "قاعدة بصرية محايدة تُبرز العناصر الرئيسية وتعطي شعورًا بالتنظيم والبساطة ووضوح الاتصال. الرمادي الداكن يرمز للجدية والرزانة وراء كل ما هو مرئي من البراند.",
    personalityAr: "متزن، يدعم وضوح بقية الألوان دون أن ينافسها.",
    productMapping: "Brand-only. Near product --color-fg-default (#2A2A29) but not identical.",
  },
  supportive: {
    token: "brand-supportive",
    cssVar: "--brand-supportive",
    utility: "bg-brand-supportive",
    roleEn: "Supportive",
    nameAr: "اللون الداعم",
    hex: "#F4F4F4",
    rgb: "244, 244, 244",
    hsb: "0, 0%, 96%",
    cmyk: "3, 2, 2, 0",
    meaningAr:
      "خلفيات فاتحة توفّر راحة للعين وتُظهر جمال العناصر والنصوص، وتدعم استخدام الهوية في سيناريوهات متعددة دون إخلال بالتوازن. تفتح آفاقًا للتطوير وتزيد الشعور بالنظافة والتقنية.",
    personalityAr: "بسيط، هادئ، يسمح بالتركيز على المحتوى ويضفي انفتاحًا في التصميم.",
    productMapping: "Brand-only light gray. Near product --color-canvas (#F4F3FB, lavender-tinted).",
  },
} as const satisfies Record<string, BrandColorMeta>;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Strategy & positioning — الاستراتيجية: التمركز                         */
/* ─────────────────────────────────────────────────────────────────────── */

export const BRAND_VISION = {
  ar: "ما نطمح إليه في أزير، أن نصبح نظام تشغيل العملاء الأكثر اعتمادية وكفاءة وتكاملًا في الشرق الأوسط، وأن نُمكّن الشركات من تنمية علاقاتها مع عملائها بفاعلية عبر كل مراحل التواصل، مع تعزيز دور الإنسان وقتما أمكن... بكل ما هو ممكن.",
  en: "To become the most reliable, efficient, and integrated Customer OS in the Middle East — enabling companies to grow their customer relationships across every stage of communication, while amplifying the human role wherever possible.",
} as const;

export type PositioningPrinciple = { readonly ar: string; readonly en: string };

export const BRAND_POSITIONING: readonly PositioningPrinciple[] = [
  {
    ar: "نسعى أن نكون على أعلى فاعلية ممكنة دون أن نفقد إنسانيتنا ووجهتنا.",
    en: "Pursue the highest possible efficiency without losing our humanity or our direction.",
  },
  {
    ar: "أن نكون اعتماديين بكل ما تحمله الكلمة من معنى.",
    en: "Be reliable in every sense of the word.",
  },
  {
    ar: "أن نكوّن شراكات عميقة مع عملائنا.",
    en: "Build deep partnerships with our customers.",
  },
  {
    ar: "نؤمن بأن الشفافية المطلقة هي أقصر طريق للتواصل والوصول إلى حلول.",
    en: "Believe radical transparency is the shortest path to communication and to solutions.",
  },
] as const;

export type BrandBehavior = {
  readonly key: string;
  readonly titleEn: string;
  readonly titleAr: string;
  readonly bodyAr: string;
};

export const BRAND_BEHAVIORS: readonly BrandBehavior[] = [
  {
    key: "efficiency",
    titleEn: "Efficiency with direction",
    titleAr: "الفاعلية مع الوجهة",
    bodyAr:
      "نسعى لأعلى فاعلية ممكنة بشرط أن تخدم أهدافنا لا أن تكون غاية في ذاتها. الفاعلية القصوى بلا وجهة قد تُوصلنا أسرع، لكنها قد لا تُوصلنا سالمين.",
  },
  {
    key: "reliability",
    titleEn: "Reliability in everything",
    titleAr: "الاعتمادية في كل شيء",
    bodyAr:
      "نضع أعلى مستويات الاعتمادية في كل خطوة، من تصميم الموقع واختيار الهوية حتى التخارج من الشراكة. ومن فرط الاعتمادية ينبغي أن ينسى العميل أنه يستخدم منتجنا أصلًا.",
  },
  {
    key: "partnership",
    titleEn: "Deep partnership",
    titleAr: "الشراكة العميقة",
    bodyAr:
      "نتعامل مع كل عميل على أنه شريك. نكترث بطموحاته ومعوقاته على حد سواء، ونسعى لمساعدته على تحقيق أهدافه.",
  },
  {
    key: "transparency",
    titleEn: "Radical transparency",
    titleAr: "الشفافية المطلقة",
    bodyAr:
      "لا نخفي شيئًا. في كل تعامل يجمعنا ببعضنا أو بعملائنا، نوفّر كل المعلومات التي نؤمن أن الطرف الآخر يحتاجها.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Voice & tone — صوت البراند / نبرة الصوت                                 */
/* ─────────────────────────────────────────────────────────────────────── */

export type VoiceLevel = {
  /** Volume level — خافت (quiet) / متوسط (medium) / عالي (loud). */
  readonly levelAr: string;
  readonly levelEn: "Quiet" | "Medium" | "Loud";
  /** الوصف — the descriptor for this level. */
  readonly descAr: string;
  /** مثال — example copy. */
  readonly exampleAr: string;
};

export type VoiceAttribute = {
  readonly key: string;
  readonly nameAr: string;
  readonly nameEn: string;
  /** The metaphor / one-line characterization. */
  readonly summaryAr: string;
  readonly levels: readonly [VoiceLevel, VoiceLevel, VoiceLevel];
};

export const BRAND_VOICE: readonly VoiceAttribute[] = [
  {
    key: "rooted",
    nameAr: "راسخ",
    nameEn: "Rooted",
    summaryAr: "راسخ في الواقع. متواضع ومتصالح مع نفسه. لا يثيره المدح ولا يثبّطه الذم.",
    levels: [
      {
        levelAr: "خافت",
        levelEn: "Quiet",
        descAr: "هادئ ولا يريد إثارة الجلبة.",
        exampleAr: "أزير تساعدك على تنمية علاقاتك بعملائك من خلال تواصل فعّال ومتكامل واعتمادي.",
      },
      {
        levelAr: "متوسط",
        levelEn: "Medium",
        descAr: "واثق بوعيه بالسياق.",
        exampleAr:
          "اتخذنا قرارًا صعبًا بأن نجعل الذكاء الاصطناعي جزءًا لا يتجزأ من بنية أزير التحتية، في الوقت الذي تعامل فيه الآخرون مع الذكاء الاصطناعي على أنه إضافة لا علاقة لها بالمنتج.",
      },
      {
        levelAr: "عالي",
        levelEn: "Loud",
        descAr: "يتكلم وكأنه على علم بما هو آت.",
        exampleAr: "المستقبل للشركات التي تُحسِن التواصل مع عملائها.",
      },
    ],
  },
  {
    key: "ally",
    nameAr: "موآزر",
    nameEn: "Supportive ally",
    summaryAr:
      "لسنا مقدمي خدمة، بل شركاء في نجاح عملائنا، نكترث لشأنهم، نسعى معهم في حل مشاكلهم، ونمضي قُدُمًا في تحقيق أهدافهم.",
    levels: [
      {
        levelAr: "خافت",
        levelEn: "Quiet",
        descAr: "صديق جاهز للإنصات بأي وقت.",
        exampleAr: "إذا ما احتجتنا تجدنا.",
      },
      {
        levelAr: "متوسط",
        levelEn: "Medium",
        descAr: "مبادر ومتحمس لأنه حقيقةً يكترث.",
        exampleAr:
          "مرحبًا عميلنا العزيز، يبدو أنك لم تستخدم رصيد الشات بوت بحسابك، هل تقابل مشكلة تحتاج مساعدتنا فيها؟",
      },
      {
        levelAr: "عالي",
        levelEn: "Loud",
        descAr: "يرافق العميل إلى أن يحقق آماله.",
        exampleAr:
          "لا تقلق، معك محمد من خدمة العملاء. سأكون معك حتى نتخلص من المشكلة وتتابع استخدام أزير بكل سلاسة.",
      },
    ],
  },
  {
    key: "precise",
    nameAr: "دقيق",
    nameEn: "Precise",
    summaryAr: "طبيب جرّاح، يختار ألفاظه بدقة ولا يخشى الوضوح ويعتني بأدق التفاصيل.",
    levels: [
      {
        levelAr: "خافت",
        levelEn: "Quiet",
        descAr: "حتى بالكلام العادي، يختار اللفظ المناسب دائمًا.",
        exampleAr:
          "اسمح لي بتوضيح الفرق بين خدمة العملاء وفريق نجاح العملاء ودور كلٍّ منهما في نجاح رحلتك معنا.",
      },
      {
        levelAr: "متوسط",
        levelEn: "Medium",
        descAr: "لا يخشى توضيح التفاصيل.",
        exampleAr: "هناك ٥ فروقات بين عميل الذكاء الاصطناعي والشات بوت، دعني أوضحها لك.",
      },
      {
        levelAr: "عالي",
        levelEn: "Loud",
        descAr: "قادرٌ على إعادة الصياغة ليطرح وجهة نظر خاصة به.",
        exampleAr:
          "نؤمن أن نجاح مؤسستك لم يعد يتمركز حول مجرد الرد على عملائك، بل على تنمية العلاقة التي تجمعك بهم، حتى تعظّم النفع العائد عليك وعليهم.",
      },
    ],
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Writing rules — القواعد (14 do/don't rules)                            */
/* ─────────────────────────────────────────────────────────────────────── */

export type WritingRule = {
  readonly n: number;
  readonly ruleAr: string;
  readonly ruleEn: string;
  /** قل — preferred phrasing. */
  readonly say?: string;
  /** لا تقل — phrasing to avoid. */
  readonly dont?: string;
};

export const BRAND_WRITING_RULES: readonly WritingRule[] = [
  {
    n: 1,
    ruleAr: "دائمًا خاطب الشخص المسؤول. أزير رفيق الشخص المسؤول، المعين له على تحقيق أهدافه؛ فبكل ما تفعل وجِّه الكلام له.",
    ruleEn: "Always address the person in charge — Azeer is their companion in reaching their goals.",
    say: "خلينا نراجع سوا نتائج الحملة الأخيرة.",
    dont: "نوصي عملاءنا بمراجعة نتائج الحملة.",
  },
  {
    n: 2,
    ruleAr: "لا تتحدث عمّا لم تحط به علمًا. اسأل نفسك أولًا: هل أشعر بالثقة التامة في تناول هذه التفصيلة؟",
    ruleEn: "Don't speak about what you don't know. Ask yourself first if you're fully confident.",
    say: "خليني أتأكد من الفريق الفني وأرجع لك بعد قليل.",
    dont: "أكيد النظام يدعم الخاصية دي، بس خليني أتأكد.",
  },
  {
    n: 3,
    ruleAr: "استخدم الألفاظ اليومية الشائعة بين الناس. يسّر ولا تعسّر.",
    ruleEn: "Use everyday, common words. Make it easy, not complicated.",
    say: "وصل الإشعار.",
    dont: "تم إرسال الإشعار بنجاح.",
  },
  {
    n: 4,
    ruleAr: "استخدم الفصحى في الملفات والبريد والموقع.",
    ruleEn: "Use Modern Standard Arabic in documents, email, and the website.",
  },
  {
    n: 5,
    ruleAr: "استخدم اللهجة السعودية البيضاء على مواقع التواصل الاجتماعي وبالحملات الإعلانية. (هناك مساحة لاستخدام لهجات عربية أخرى بسياقات معينة — استشر المسؤول عن البراند أولًا.)",
    ruleEn: "Use neutral Saudi 'white' dialect on social media and ad campaigns. (Other Arabic dialects are allowed in specific contexts — consult the brand owner first.)",
  },
  {
    n: 6,
    ruleAr: "اختر أفعالًا حركية تحرّك القصة للأمام، وتجنّب الأفعال الرتيبة التي تشعِر الناس بأنه لا شيء يحدث.",
    ruleEn: "Choose active, forward-moving verbs; avoid flat verbs that feel like nothing is happening.",
    say: "اربط النظام بواتساب الآن.",
    dont: "يتكامل النظام مع واتساب.",
  },
  {
    n: 7,
    ruleAr: "استخدم جملًا قصيرة واعتمد الاختصار في كلامك.",
    ruleEn: "Use short sentences; favor brevity.",
    say: "جرّب الخاصية الجديدة، وشوف الفرق.",
    dont: "نقدّم لك خاصية جديدة تساعدك على تحقيق نتائج أفضل بشكل أسرع.",
  },
  {
    n: 8,
    ruleAr: "لا تكثر من الإيموجي. واحرص أن يضيف للمعنى لا أن يكون مجرد زينة.",
    ruleEn: "Don't overuse emoji; use it only when it adds meaning, not decoration.",
    say: "تم حل المشكلة ✅",
    dont: "تم حل المشكلة 😍🔥💪🎉",
  },
  {
    n: 9,
    ruleAr: "تجنّب الحشو. احذف كل لفظ لا يضيف للمعنى، وكل جملة لا توصل رسالة.",
    ruleEn: "Avoid filler. Delete every word that adds no meaning and every sentence that carries no message.",
    say: "الخاصية تعمل تلقائيًا.",
    dont: "هذه الخاصية تعمل بطريقة تلقائية دون الحاجة لأي تدخل منك.",
  },
  {
    n: 10,
    ruleAr: "تحدَّث وكأنك شريك أو زميل عمل، لا مقدِّم خدمة أو بائع.",
    ruleEn: "Speak as a partner or colleague — not a service provider or salesperson.",
    say: "خلينا نشوف مع بعض فين الخطأ ونعدله.",
    dont: "نعتذر عن الخطأ، ونرجو أن تتحملنا قليلًا.",
  },
  {
    n: 11,
    ruleAr: "كن دقيقًا قبل أن تكون بليغًا. تجنّب التقعُّر واختر أدق لفظ يوصل المعنى المقصود.",
    ruleEn: "Be precise before eloquent. Avoid grandiloquence; pick the most exact word.",
    say: "توصلك الإشعارات خلال ثانيتين.",
    dont: "تُرسل الإشعارات بسرعة فائقة لا مثيل لها.",
  },
  {
    n: 12,
    ruleAr: "كن صريحًا. اسأل دائمًا: هل ثمّة معلومة أحتاج لمشاركتها الآن ليكون الطرف الآخر على علم؟",
    ruleEn: "Be candid. Always ask whether there's information the other side needs to know now.",
    say: "تأخّر التحديث عن الجدول المعلن، ونعمل حاليًا على إصلاح السبب.",
    dont: "واجهنا بعض التحديات البسيطة التي أدّت إلى تأخير غير متوقع.",
  },
  {
    n: 13,
    ruleAr: "اهتم ولا تتملق. هناك خط رفيع بين إشعار العميل بأننا بجانبه، والتملق الذي يشعره أننا نخفي شيئًا.",
    ruleEn: "Care, don't flatter. There's a fine line between being beside the customer and flattery that hides something.",
    say: "نتفهم قلقك، وبدأنا بالفعل في حل المشكلة.",
    dont: "نعتذر جدًا جدًا عن الإزعاج ونتمنى لك يومًا سعيدًا.",
  },
  {
    n: 14,
    ruleAr: "لا تكابر. حين يلزمك الاعتذار، اعتذر بصدق.",
    ruleEn: "Don't be defensive. When an apology is due, apologize sincerely.",
    say: "الخلل حصل عندنا. تم إصلاحه بالكامل الآن.",
    dont: "حدث خلل بسيط من طرفكم أو بسبب الضغط الكبير على النظام.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Logo — الشعار                                                           */
/* ─────────────────────────────────────────────────────────────────────── */

export const BRAND_LOGO = {
  concept: {
    ar: "يدمج شعار أزير بين «مثلث رولو» و«تموجات الرمال»: شكل هندسي ثابت العرض يرمز للاستقرار والاعتمادية، تتخلله خطوط حية متغيرة ترمز للمرونة والتكيّف عبر القنوات.",
    en: "The Azeer logo fuses a Reuleaux triangle (constant-width geometry = stability & reliability) with sand-wave lines (flow & adaptability across channels).",
  },
  reuleaux: {
    ar: "مثلث رولو يتكون من ثلاثة أقواس دائرية مركز كلٍّ منها عند رأس مثلث متساوي الأضلاع. عرضه ثابت في كل الاتجاهات — رمز للثبات والاعتمادية «دائمًا أولًا».",
    en: "Reuleaux triangle: three circular arcs centered on the vertices of an equilateral triangle; constant width in every orientation — a symbol of constancy and reliability.",
  },
  waves: {
    ar: "تموجات الرمال مستوحاة من الصحراء السعودية؛ ترمز للمرونة والانسيابية وتعدد القنوات والترابط (Customer OS) واستمرارية التواصل دون عقبات.",
    en: "Sand waves, inspired by the Saudi desert; signal flexibility, multi-channel flow and seamless, uninterrupted communication (Customer OS).",
  },
  /** Clear space — measured in the unit `x` (defined by the construction grid). */
  clearSpace: {
    unit: "x",
    minimum: "2x on all sides",
    ar: "اترك مساحة آمنة لا تقل عن 2x حول الشعار (حيث x وحدة شبكة البناء).",
    en: "Keep a clear space of at least 2x around the logo (x = the construction-grid unit).",
  },
  /** Approved lockups / color treatments. */
  variants: [
    { key: "primary", ar: "الشعار بألوانه الأساسية", en: "Primary (brand colors)" },
    { key: "reversed", ar: "الشعار معكوس", en: "Reversed (on dark)" },
    { key: "mono", ar: "الشعار أحادي اللون", en: "Monochrome (single brand color)" },
    { key: "black", ar: "الشعار باللون الأسود", en: "Black" },
    { key: "white", ar: "الشعار باللون الأبيض على خلفية سوداء", en: "White on black" },
  ],
  /** Misuse — الاستخدامات الخاطئة. */
  misuse: [
    { ar: "لا تغيّر ألوان الشعار", en: "Don't change the logo colors" },
    { ar: "لا تغيّر تصميم الشعار", en: "Don't alter the logo design" },
    { ar: "لا تصمّم شعارًا فرعيًا", en: "Don't create a sub-logo / lockup" },
    { ar: "لا تضف عنصرًا للشعار", en: "Don't add elements to the logo" },
    { ar: "تجنّب تغيير أبعاد الشعار بضغط أو مط (اضغط Shift عند التحجيم)", en: "Don't distort proportions — hold Shift when resizing" },
    { ar: "لا يُسمح بإمالة الشعار", en: "Don't tilt or skew the logo" },
    { ar: "لا تُسقط ظلًا على الشعار", en: "Don't add a drop shadow" },
    { ar: "تجنّب إنتاج الشعار بجودة متدنية", en: "Don't reproduce the logo in low quality" },
  ],
  /** Background rules — الخلفيات غير المناسبة. */
  backgrounds: [
    { ar: "تجنّب خلفيات الأنماط", en: "Avoid patterned backgrounds" },
    { ar: "تجنّب خلفيات بألوان خارجة عن الهوية", en: "Avoid off-identity background colors" },
    { ar: "لا تستخدم الشعار الملوّن على لون داكن", en: "Don't place the color logo on a dark color" },
    { ar: "لا تضع الشعار على صور متعددة التفاصيل", en: "Don't place the logo over busy/detailed images" },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Typography — الخطوط (brand display font)                                */
/* ─────────────────────────────────────────────────────────────────────── */

export const BRAND_TYPOGRAPHY = {
  family: "Dialogue ME",
  scripts: ["Arabic", "Latin"] as const,
  tagline: {
    ar: "محادثات تحقق طموحات",
    en: "Conversations that Achieve Ambition",
  },
  meaning: {
    ar: "يعكس مبدأ الحديث والمتجدد مع الحفاظ على الأصالة. واضح ومريح للعين في الرقمي والمطبوع، ويخاطب المجتمع العربي بشخصية محلية قريبة.",
    en: "Modern and renewed while keeping authenticity — clear and comfortable across digital and print, with a local Arabic personality.",
  },
  weights: [
    { name: "Extralight", ar: "رفيع جدًا", value: 200 },
    { name: "Light", ar: "رفيع", value: 300 },
    { name: "Regular", ar: "عادي", value: 400 },
    { name: "Medium", ar: "متوسط", value: 500 },
    { name: "Demibold", ar: "شبه سميك", value: 600 },
    { name: "Bold", ar: "سميك", value: 700 },
    { name: "Extrabold", ar: "سميك جدًا", value: 800 },
  ],
  /**
   * Implementation note: the brand display font "Dialogue ME" is not bundled in
   * this repo. Product UI ships Inter (Latin) + IBM Plex Sans Arabic (Arabic)
   * via the @theme `--font-*` tokens; use those as the implemented fallback
   * until the licensed brand font is self-hosted on the marketing site.
   */
  implementationNote:
    'Dialogue ME is not bundled here. Use the product fonts (--font-sans / --font-arabic) as the fallback until the licensed brand font is self-hosted.',
} as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Patterns — النمط                                                        */
/* ─────────────────────────────────────────────────────────────────────── */

export type BrandPatternMeta = {
  /** Component variant id in @azeer/website-ui `<BrandPattern variant>`. */
  readonly variant: "waves" | "topographic" | "grid" | "layers";
  readonly nameAr: string;
  readonly nameEn: string;
  readonly inspirationAr: string;
  readonly meaningAr: string;
};

export const BRAND_PATTERNS: readonly BrandPatternMeta[] = [
  {
    variant: "waves",
    nameAr: "النمط الأول",
    nameEn: "Sand waves",
    inspirationAr: "مستوحى من الطبيعة الصحراوية وتدفق الرمال أو حركة المياه.",
    meaningAr: "يرمز للمرونة والانسيابية في التواصل وقدرة أزير على التكيّف؛ يمنح إحساسًا بالسلاسة والراحة البصرية.",
  },
  {
    variant: "topographic",
    nameAr: "النمط الثاني",
    nameEn: "Topographic",
    inspirationAr: "مستوحى من التضاريس والخرائط الطبوغرافية الصحراوية.",
    meaningAr: "يعكس العمق والتعقيد في بنية البراند ووصوله لأدق التفاصيل، وديناميكية العمل والتوسع، ويبرز التفرّد والابتكار.",
  },
  {
    variant: "grid",
    nameAr: "النمط الثالث",
    nameEn: "Logo grid",
    inspirationAr: "أيقونة الشعار متكررة في شبكة منتظمة.",
    meaningAr: "يعكس النظامية والاتساق في كل نقطة تواصل وانتشار العلامة بشكل منظّم، ويمنح شعورًا بثبات الهوية وقدرتها على التوسع.",
  },
  {
    variant: "layers",
    nameAr: "النمط الرابع",
    nameEn: "Layers",
    inspirationAr: "تدرّج الطبقات داخل الرمز الثلاثي (مثلث رولو متراكز).",
    meaningAr: "يوحي برحلة تطور العميل داخل نظام متكامل: كل طبقة مرحلة تقدّم ونمو، وتأكيد على العمق والاستمرارية.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────── */
/*  Applications & governance — تطبيق الهوية / هام                          */
/* ─────────────────────────────────────────────────────────────────────── */

export const BRAND_APPLICATIONS: readonly { readonly ar: string; readonly en: string }[] = [
  { ar: "العبوات والتغليف", en: "Packaging" },
  { ar: "الموقع الإلكتروني", en: "Website" },
  { ar: "اللافتات (رول أب)", en: "Roll-up banners" },
  { ar: "منشورات التواصل الاجتماعي", en: "Social media posts" },
  { ar: "جناح المعارض", en: "Exhibition booth" },
  { ar: "بطاقات التعريف والحبال", en: "ID cards & lanyards" },
  { ar: "ورق المراسلات", en: "Letterhead" },
  { ar: "الأظرف", en: "Envelopes" },
  { ar: "دفتر الملاحظات", en: "Notepad" },
  { ar: "الدفتر (نوت بوك)", en: "Notebook" },
] as const;

export const BRAND_GOVERNANCE = {
  ar: "ارجع دائمًا للنسخة الرقمية المحدثة من الدليل عبر الرابط المعتمد فقط. أي نسخة مطبوعة أو محفوظة خارج الرابط الرسمي تُعتبر غير ملزمة للهوية؛ التحديثات تجري باستمرار لمواكبة تطور العلامة.",
  en: "Always use the latest digital version of the guide via the approved link only. Any printed or saved copy outside the official link is non-binding; updates are made continuously as the brand evolves.",
} as const;
