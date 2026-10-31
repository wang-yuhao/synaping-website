// All page copy. zh = source of truth; en mirrors it; de covers home, services overview, contact and legal.
// Facts (people, prices, clients, numbers) must come from docs/content-facts.md. Items marked 【待确认】 there
// are placeholders the owner has not confirmed yet.
import type { Locale } from '../i18n/ui';

type L<T> = Partial<Record<Locale, T>> & { zh: T; en: T };

export interface Service {
  slug: string;
  icon: 'web' | 'data' | 'cloud';
  title: L<string>;
  short: L<string>;
  pains: L<string[]>;
  deliverables: L<string[]>;
  stack: string[];
  faq: L<{ q: string; a: string }[]>;
}

export const services: Service[] = [
  {
    slug: 'websites-digital-products',
    icon: 'web',
    title: { zh: '出海官网与数字化产品', en: 'Websites & Digital Products', de: 'Websites & digitale Produkte' },
    short: {
      zh: '面向欧洲客户的多语种企业官网、落地页与 SaaS 原型：合规、快速、可被 Google 与百度检索。',
      en: 'Multilingual corporate sites, landing pages and SaaS prototypes for European buyers: compliant, fast and searchable on Google and Baidu.',
      de: 'Mehrsprachige Unternehmenswebsites, Landingpages und SaaS-Prototypen für europäische Kunden – schnell, konform und auffindbar.',
    },
    pains: {
      zh: ['官网只有中文或机翻英文，欧洲客户难以信任', '使用了在欧洲受限的第三方脚本或字体，存在 GDPR 风险', '海外访问慢，移动端体验差，搜索引擎难以收录'],
      en: ['Sites only in Chinese or machine-translated English undermine trust', 'Third-party scripts and fonts create GDPR exposure', 'Slow from abroad, weak on mobile, poorly indexed'],
    },
    deliverables: {
      zh: ['中 / 英 / 德 多语种官网（静态生成，加载快）', '欧洲版隐私政策、法律声明（Impressum）页面结构', 'Google 与百度 SEO 基础、结构化数据、站点地图', '无 Cookie 访问统计与询盘表单', '持续集成 / 持续部署与运维交接文档'],
      en: ['Chinese / English / German site, statically generated', 'EU-style privacy policy and legal-notice (Impressum) page structure', 'SEO foundations for Google and Baidu, structured data, sitemaps', 'Cookie-less analytics and lead form', 'CI/CD pipeline and handover documentation'],
    },
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Nginx', 'GitHub Actions', 'CDN'],
    faq: {
      zh: [
        { q: '网站可以同时服务中国和欧洲访客吗？', a: '可以。我们常用"一套代码、两地部署"：中国大陆节点满足备案与访问速度，欧洲节点满足 GDPR 与低延迟。' },
        { q: '你们提供德语内容吗？', a: '提供。德语页面由懂业务的母语级人员校对，避免机翻带来的信任问题。' },
      ],
      en: [
        { q: 'Can one site serve visitors in China and Europe?', a: 'Yes. We typically use one codebase with two deployments: a mainland node for ICP compliance and speed, an EU node for GDPR and low latency.' },
        { q: 'Do you provide German content?', a: 'Yes. German pages are proofread by fluent speakers who understand the business context.' },
      ],
    },
  },
  {
    slug: 'data-ai-engineering',
    icon: 'data',
    title: { zh: '数据与智能工程', en: 'Data & AI Engineering', de: 'Data & AI Engineering' },
    short: {
      zh: '数据平台、数据管道、BI 看板与 AI 智能体：把分散的业务数据变成可用于决策的资产。',
      en: 'Data platforms, pipelines, BI dashboards and AI agents that turn scattered business data into decisions.',
      de: 'Datenplattformen, Pipelines, BI-Dashboards und KI-Agenten – aus verstreuten Daten werden Entscheidungen.',
    },
    pains: {
      zh: ['销售、广告、电商数据散落在多个系统，口径不一', '报表依赖手工 Excel，更新慢、易出错', '想用大模型提效，却不知道从哪里开始、如何保证数据安全'],
      en: ['Sales, ad and e-commerce data spread across systems with inconsistent definitions', 'Manual Excel reporting is slow and error-prone', 'Unsure where to start with LLMs and how to keep data safe'],
    },
    deliverables: {
      zh: ['湖仓一体数据平台设计（Databricks / Delta Lake 等）', '数据采集、清洗、统一口径的自动化管道', '管理层 BI 看板与指标体系', '基于大模型的文档处理、客服与内部助手智能体', '数据质量监控与告警'],
      en: ['Lakehouse platform design (Databricks / Delta Lake and similar)', 'Automated ingestion, cleaning and harmonisation pipelines', 'Management BI dashboards and KPI definitions', 'LLM agents for documents, support and internal assistants', 'Data-quality monitoring and alerting'],
    },
    stack: ['Databricks', 'Apache Spark', 'Delta Lake', 'Python', 'SQL', 'Power BI', 'LangGraph'],
    faq: {
      zh: [
        { q: '我们的数据量不大，也需要数据平台吗？', a: '不一定。我们会先做 1–2 周的诊断，从轻量方案开始，按业务价值逐步扩展。' },
        { q: 'AI 智能体会不会泄露公司数据？', a: '我们按数据分级设计权限，敏感数据可留在私有环境中处理，并记录完整的调用日志。' },
      ],
      en: [
        { q: 'Our data volume is small. Do we need a data platform?', a: 'Not necessarily. We start with a 1–2 week assessment and a lightweight setup, then grow with proven value.' },
        { q: 'Will AI agents leak company data?', a: 'Access follows data classification; sensitive data can stay in a private environment, and every call is logged.' },
      ],
    },
  },
  {
    slug: 'cloud-compliance-architecture',
    icon: 'cloud',
    title: { zh: '云与数据合规架构', en: 'Cloud & Compliance Architecture', de: 'Cloud- & Compliance-Architektur' },
    short: {
      zh: '中欧双区域云架构、CI/CD 与监控，以及 GDPR / 个人信息保护法（PIPL）的技术落地。',
      en: 'China–EU dual-region cloud, CI/CD and monitoring, plus the technical implementation of GDPR and PIPL requirements.',
      de: 'Cloud-Architektur für China und die EU, CI/CD und Monitoring sowie die technische Umsetzung von DSGVO- und PIPL-Anforderungen.',
    },
    pains: {
      zh: ['欧洲业务数据存放在国内服务器，跨境合规不清晰', '部署靠手工操作，出问题难以回滚', '缺少监控与备份，故障发现晚'],
      en: ['EU customer data sits on servers in China without a clear cross-border setup', 'Manual deployments with no reliable rollback', 'No monitoring or backups; incidents found late'],
    },
    deliverables: {
      zh: ['中欧双区域部署架构（京东云 / 阿里云 / 腾讯云 + Azure / AWS 欧洲区）', '数据流向梳理、数据驻留与访问控制方案', '同意管理、日志留存等合规相关技术实现', '自动化部署、回滚、监控与备份', '运维手册与应急预案'],
      en: ['Dual-region architecture (JD / Alibaba / Tencent Cloud + Azure / AWS EU regions)', 'Data-flow mapping, data residency and access control', 'Technical controls: consent management, log retention and similar', 'Automated deployment, rollback, monitoring and backups', 'Runbooks and incident playbooks'],
    },
    stack: ['Azure', 'AWS', 'JD Cloud', 'Docker', 'Nginx', 'GitHub Actions', 'Prometheus'],
    faq: {
      zh: [
        { q: '你们提供法律意见吗？', a: '不提供。我们负责技术实现，并与您的律师或合规顾问协作；法律判断请以专业律师意见为准。' },
        { q: '可以在不停机的情况下迁移吗？', a: '多数情况下可以，我们会设计分阶段迁移与回滚方案。' },
      ],
      en: [
        { q: 'Do you give legal advice?', a: 'No. We implement the technical side and work with your lawyer or compliance adviser, whose judgement prevails.' },
        { q: 'Can you migrate without downtime?', a: 'In most cases, yes: we plan staged migrations with tested rollback.' },
      ],
    },
  },
];

export const home = {
  zh: {
    title: '惟意科技 Synaping｜中国企业出海欧洲的数字技术伙伴',
    description: '惟意科技 Synaping 为出海欧洲的中国企业提供多语种官网、数据与 AI 工程、中欧云架构与数据合规技术实施。上海 · 慕尼黑。',
    eyebrow: '上海 · 慕尼黑',
    h1a: '连接数据、云与市场，',
    h1b: '助力中国企业走进欧洲',
    lead: '我们是扎根德国的数据与云工程团队：用欧洲客户信任的网站、可靠的数据平台和合规的云架构，帮助企业在欧洲市场高效落地。',
    secondary: '查看服务',
    servicesTitle: '三项核心服务',
    servicesLead: '从对外展示到数据决策，再到底层合规架构，一个团队完成。',
    kitTitle: '欧洲数字化落地包',
    kitLead: '固定范围、固定周期：域名与欧洲主机、三语官网、无 Cookie 统计、GDPR 技术基线、询盘数据管道，一次到位。',
    casesTitle: '精选案例',
    processTitle: '合作流程',
    process: [
      { t: '咨询', d: '30 分钟免费沟通，明确目标与约束' },
      { t: '架构', d: '1–2 周诊断，给出方案、报价与里程碑' },
      { t: '交付', d: '按周迭代，测试环境实时可见' },
      { t: '运维', d: '监控、备份与持续优化' },
    ],
    labsTitle: '研发实验室',
    labsLead: '我们持续投入的技术研究，是服务能力的底座。',
    trust: ['工信部 ICP 备案', '上海 + 慕尼黑 双地团队', '惟意集团旗下品牌'],
    stackTitle: '常用技术',
  },
  en: {
    title: 'Synaping | Digital technology partner for Chinese companies entering Europe',
    description: 'Synaping (惟意科技) builds multilingual websites, data and AI platforms, China–EU cloud architecture and the technical side of data compliance. Shanghai · Munich.',
    eyebrow: 'Shanghai · Munich',
    h1a: 'Connecting data, cloud and markets',
    h1b: 'for companies going to Europe',
    lead: 'We are a Germany-based data and cloud engineering team. We build websites European buyers trust, data platforms you can rely on and cloud architecture that meets compliance requirements.',
    secondary: 'See services',
    servicesTitle: 'Three core services',
    servicesLead: 'From your public face to data-driven decisions to the compliant foundation underneath — one team.',
    kitTitle: 'EU Digital Launch Kit',
    kitLead: 'Fixed scope, fixed timeline: EU domain and hosting, trilingual website, cookie-less analytics, a technical GDPR baseline and a lead pipeline.',
    casesTitle: 'Selected cases',
    processTitle: 'How we work',
    process: [
      { t: 'Consult', d: 'Free 30-minute call to clarify goals and constraints' },
      { t: 'Architect', d: '1–2 week assessment with plan, quote and milestones' },
      { t: 'Deliver', d: 'Weekly iterations, always visible on staging' },
      { t: 'Operate', d: 'Monitoring, backups and continuous improvement' },
    ],
    labsTitle: 'Labs',
    labsLead: 'Ongoing research that keeps our engineering sharp.',
    trust: ['ICP-registered in China', 'Teams in Shanghai and Munich', 'Part of the Weiyi group'],
    stackTitle: 'Technologies we use',
  },
  de: {
    title: 'Synaping | Technologiepartner für chinesische Unternehmen in Europa',
    description: 'Synaping (惟意科技) entwickelt mehrsprachige Websites, Daten- und KI-Plattformen sowie Cloud-Architekturen für China und die EU. Shanghai · München.',
    eyebrow: 'Shanghai · München',
    h1a: 'Daten, Cloud und Märkte verbinden',
    h1b: 'für Unternehmen auf dem Weg nach Europa',
    lead: 'Wir sind ein in Deutschland verwurzeltes Daten- und Cloud-Engineering-Team. Wir bauen Websites, denen europäische Kunden vertrauen, verlässliche Datenplattformen und konforme Cloud-Architekturen.',
    secondary: 'Leistungen ansehen',
    servicesTitle: 'Drei Kernleistungen',
    servicesLead: 'Vom Auftritt über datenbasierte Entscheidungen bis zur konformen Infrastruktur – aus einer Hand.',
    kitTitle: 'EU-Launch-Kit',
    kitLead: 'Fester Umfang, fester Zeitplan: EU-Domain und Hosting, dreisprachige Website, cookiefreie Analyse, technische DSGVO-Basis und Lead-Pipeline.',
    casesTitle: 'Ausgewählte Projekte',
    processTitle: 'Zusammenarbeit',
    process: [
      { t: 'Beratung', d: 'Kostenloses 30-Minuten-Gespräch zu Zielen und Rahmen' },
      { t: 'Architektur', d: '1–2 Wochen Analyse mit Plan, Angebot und Meilensteinen' },
      { t: 'Umsetzung', d: 'Wöchentliche Iterationen, jederzeit auf Staging sichtbar' },
      { t: 'Betrieb', d: 'Monitoring, Backups und laufende Optimierung' },
    ],
    labsTitle: 'Labs',
    labsLead: 'Laufende Forschung als Fundament unserer Arbeit.',
    trust: ['ICP-registriert in China', 'Teams in Shanghai und München', 'Teil der Weiyi-Gruppe'],
    stackTitle: 'Technologien',
  },
} satisfies L<Record<string, unknown>>;

export const kit = {
  zh: {
    title: '欧洲数字化落地包',
    lead: '为首次进入欧洲市场的中国企业设计：用 4–8 周，完成在欧洲开展业务所需的数字化基础设施。',
    checklistTitle: '包含内容',
    checklist: ['.eu / .de 等欧洲域名注册与邮箱配置', '欧洲区主机与 CDN（满足数据驻留需求）', '中 / 英 / 德 三语官网', '隐私政策、法律声明（Impressum）页面结构与技术合规基线', '无 Cookie 访问统计', '询盘表单与 CRM / 数据管道对接', '上线清单与运维交接'],
    tiers: [
      { name: 'Starter', d: '三语官网 + 欧洲主机 + 合规基线', price: '按需报价' },
      { name: 'Growth', d: 'Starter + 内容营销页面 + SEO + 询盘自动化', price: '按需报价' },
      { name: 'Data', d: 'Growth + 数据看板 + 中欧双区域数据管道', price: '按需报价' },
    ],
    partner: '需要市场调研、翻译、展会与商务谈判支持？我们的姐妹品牌惟意国际（Weiyi International）提供商务咨询服务。',
    partnerLink: '了解惟意国际',
  },
  en: {
    title: 'EU Digital Launch Kit',
    lead: 'Built for Chinese companies entering Europe for the first time: the digital groundwork for doing business in the EU in 4–8 weeks.',
    checklistTitle: 'What is included',
    checklist: ['EU domain (.eu / .de) and business email setup', 'EU hosting and CDN for data residency', 'Chinese / English / German website', 'Privacy policy and legal-notice (Impressum) page structure plus a technical compliance baseline', 'Cookie-less analytics', 'Lead form connected to your CRM or data pipeline', 'Launch checklist and operations handover'],
    tiers: [
      { name: 'Starter', d: 'Trilingual site + EU hosting + compliance baseline', price: 'On request' },
      { name: 'Growth', d: 'Starter + content pages + SEO + lead automation', price: 'On request' },
      { name: 'Data', d: 'Growth + dashboards + China–EU data pipeline', price: 'On request' },
    ],
    partner: 'Need market research, translation, trade fairs or negotiation support? Our sister brand Weiyi International provides business consulting.',
    partnerLink: 'Visit Weiyi International',
  },
};

export interface Case { slug: string; title: L<string>; summary: L<string>; challenge: L<string>; approach: L<string[]>; result: L<string>; tags: string[] }
export const cases: Case[] = [
  {
    slug: 'weiyiliuxue',
    title: { zh: '惟意留学：教育服务网站与云端运维', en: 'Weiyi Liuxue: education-services site on self-managed cloud' },
    summary: { zh: '面向中国学生的德国留学服务网站，部署在国内云服务器并完成 ICP 备案。', en: 'A study-in-Germany services site for Chinese students, hosted on a mainland cloud server with ICP filing.' },
    challenge: { zh: '需要在国内稳定访问，同时由德国团队远程维护，内容中英双语。', en: 'Reliable access in mainland China while a team in Germany maintains it remotely, in Chinese and English.' },
    approach: {
      zh: ['React 前端 + Python API + 容器化部署', 'Nginx 反向代理与 HTTPS 证书自动化', 'GitHub Actions 推送即部署'],
      en: ['React front end, Python API, containerised deployment', 'Nginx reverse proxy with automated HTTPS', 'Push-to-deploy with GitHub Actions'],
    },
    result: { zh: '网站已稳定运行，支持团队成员、服务与资讯页面的持续更新。', en: 'The site runs reliably and supports ongoing updates to team, service and news pages.' },
    tags: ['Web', 'Cloud', 'ICP'],
  },
  {
    slug: 'weiyi-international',
    title: { zh: '惟意国际：零第三方请求的双语企业官网', en: 'Weiyi International: bilingual corporate site with zero third-party requests' },
    summary: { zh: '为出海咨询品牌打造的中英双语静态官网，字体与资源全部自托管。', en: 'A bilingual static site for a market-entry consulting brand, with all fonts and assets self-hosted.' },
    challenge: { zh: '面向中欧两地客户，既要设计感，也要符合 GDPR 对第三方请求的要求。', en: 'Serve clients in China and Europe with a strong design while avoiding GDPR issues from third-party requests.' },
    approach: {
      zh: ['Astro 静态生成 + Tailwind CSS', '自托管字体，无谷歌字体或外部 CDN', 'hreflang、Open Graph 与结构化数据'],
      en: ['Astro static generation + Tailwind CSS', 'Self-hosted fonts; no Google Fonts or external CDN', 'hreflang, Open Graph and structured data'],
    },
    result: { zh: '页面轻量、加载快，满足双语 SEO 与隐私要求。', en: 'Lightweight, fast pages that meet bilingual SEO and privacy requirements.' },
    tags: ['Web', 'GDPR', 'SEO'],
  },
  {
    slug: 'synaping-ci-cd',
    title: { zh: 'Synaping.com：AI 辅助的持续交付流水线', en: 'Synaping.com: AI-assisted continuous delivery' },
    summary: { zh: '本网站由 AI 编码助手夜间开发，经自动化测试与人工审批后发布到北京服务器。', en: 'This website is built overnight by an AI coding assistant and released to a Beijing server after automated tests and human approval.' },
    challenge: { zh: '在 GitHub 与中国大陆服务器之间，建立安全、可回滚、无需 SSH 密钥外泄风险的发布流程。', en: 'A secure, reversible release path between GitHub and a mainland server, without exposing SSH keys.' },
    approach: {
      zh: ['构建与测试在无密钥环境中运行', '签名后的构建包上传至对象存储，服务器定时拉取并校验', '健康检查失败自动回滚；生产发布需人工批准'],
      en: ['Build and tests run with no secrets', 'Signed build artifacts go to object storage; the server pulls and verifies them', 'Automatic rollback on failed health checks; production needs human approval'],
    },
    result: { zh: '每次发布可追溯、可回滚，夜间迭代、白天审核。', en: 'Every release is traceable and reversible: built at night, reviewed in the morning.' },
    tags: ['DevOps', 'Security', 'AI'],
  },
];

export interface Lab { slug: string; title: L<string>; summary: L<string>; body: L<string[]>; disclaimer?: L<string>; demo?: boolean; tags: string[] }
export const labs: Lab[] = [
  {
    slug: 'quant-research-infrastructure',
    title: { zh: '量化研究基础设施', en: 'Quant Research Infrastructure' },
    summary: { zh: 'Walk-forward 回测引擎、数据管道与风控模块的工程实践。', en: 'Engineering a walk-forward backtesting engine, data pipeline and risk controls.' },
    body: {
      zh: [
        '我们搭建了一套用于策略研究的工程基础设施：统一的数据接入层、事件驱动的回测引擎，以及按时间窗口滚动的 walk-forward 样本外评估框架。',
        '风控模块在回测与实盘模拟中保持一致的规则，例如按自然日重置的日内亏损上限，避免回测与执行逻辑不一致导致的偏差。',
        '多智能体研究流程将数据检查、假设生成与结果复核分配给不同的 AI 角色，最终结论由人工审核。',
        '下方演示使用随机生成的模拟数据，仅用于展示 walk-forward 方法的分段结构。',
      ],
      en: [
        'We built engineering infrastructure for strategy research: a unified data layer, an event-driven backtesting engine and a rolling walk-forward framework for out-of-sample evaluation.',
        'The risk module applies the same rules in backtests and paper trading — for example a daily loss limit that resets at each calendar day — so research and execution logic cannot drift apart.',
        'A multi-agent research workflow assigns data checks, hypothesis generation and result review to different AI roles; humans sign off on conclusions.',
        'The demo below uses randomly generated synthetic data and only illustrates how walk-forward folds are structured.',
      ],
    },
    disclaimer: { zh: '仅为技术研究，不构成投资建议。本页不展示任何真实收益、策略参数或交易信号。', en: 'Technical research only; not investment advice. No real returns, strategy parameters or trading signals are shown.' },
    demo: true,
    tags: ['Python', 'Backtesting', 'Multi-agent'],
  },
  {
    slug: 'neuroscience-eeg-lakehouse',
    title: { zh: '计算神经科学数据平台（NeuroLab）', en: 'Computational Neuroscience Lakehouse (NeuroLab)' },
    summary: { zh: '基于 Databricks 的睡眠脑电（EEG）数据湖仓与拓扑数据分析流水线。', en: 'A Databricks lakehouse and topological-data-analysis pipeline for sleep EEG.' },
    body: {
      zh: [
        'NeuroLab 是我们在科研数据工程方向的实验项目：将原始睡眠脑电数据按 Bronze / Silver / Gold 三层组织，实现可追溯、可复现的处理流程。',
        '特征层结合睡眠分期、纺锤波与慢波检测，以及持久同调（Persistent Homology）等拓扑数据分析方法。',
        '这一实践与企业数据平台的方法相通：分层建模、数据质量校验、元数据管理与可复现计算。',
      ],
      en: [
        'NeuroLab is our research data-engineering project: raw sleep EEG is organised into Bronze / Silver / Gold layers for a traceable, reproducible pipeline.',
        'The feature layer combines sleep staging, spindle and slow-oscillation detection with topological data analysis such as persistent homology.',
        'The same methods power enterprise data platforms: layered modelling, data-quality checks, metadata management and reproducible computation.',
      ],
    },
    tags: ['Databricks', 'Delta Lake', 'TDA'],
  },
];

export const about = {
  zh: {
    title: '关于惟意科技',
    lead: '惟意科技（Synaping）是上海惟意计划科技有限公司旗下的技术品牌，团队工作和生活在中国与德国两地。',
    story: [
      '我们在欧洲企业的数据平台、云架构与网站项目中积累了多年经验，也深知中国企业进入欧洲时面对的语言、合规与技术差异。',
      '惟意科技专注技术实施：网站与数字产品、数据与 AI 工程、云与数据合规架构。市场调研、翻译与商务支持由姐妹品牌惟意国际提供，共同为客户提供从商务到技术的完整支持。',
    ],
    mission: '惟精惟诚，一心一意。',
    teamTitle: '团队',
    founderRole: '创始人 · 数据与云工程',
    founderBio: '慕尼黑大学（LMU）计算机科学硕士（数据分析方向），在德国长期从事企业级数据平台与云架构工作。',
    network: '专家网络：根据项目需要，我们与前端、数据科学、金融与德语内容方面的合作伙伴协作。',
    groupTitle: '集团品牌',
  },
  en: {
    title: 'About Synaping',
    lead: 'Synaping (惟意科技) is the technology brand of Shanghai Weiyi Jihua Technology Co., Ltd., with people working in China and Germany.',
    story: [
      'We bring years of experience with data platforms, cloud architecture and websites for European enterprises, and we know the language, compliance and technical gaps Chinese companies face in Europe.',
      'Synaping focuses on technical delivery: websites and digital products, data and AI engineering, and cloud and compliance architecture. Market research, translation and business support come from our sister brand Weiyi International.',
    ],
    mission: 'Precision and sincerity, with one focus.',
    teamTitle: 'Team',
    founderRole: 'Founder · Data & Cloud Engineering',
    founderBio: 'MSc Computer Science (data analytics) from LMU Munich; long-standing work on enterprise data platforms and cloud architecture in Germany.',
    network: 'Expert network: depending on the project, we work with partners in front-end development, data science, finance and German content.',
    groupTitle: 'Group brands',
  },
};

export const contact = {
  zh: {
    title: '联系我们',
    lead: '告诉我们您的目标，我们会在 1 个工作日内回复，并预约 30 分钟免费咨询。',
    fields: { name: '姓名', company: '公司', email: '邮箱', phone: '电话（可选）', wechat: '微信号（可选）', topic: '咨询方向', budget: '预算范围', message: '需求描述' },
    topics: ['出海官网与数字化产品', '数据与智能工程', '云与数据合规架构', '欧洲数字化落地包', '其他'],
    budgets: ['待定', '¥5 万以下', '¥5–20 万', '¥20 万以上'],
    consent: '我已阅读并同意《隐私政策》，同意惟意科技为回复本次咨询处理上述信息；如由德国团队成员跟进，我单独同意将信息提供至境外（德国）。',
    submit: '提交',
    ok: '已收到，我们会尽快联系您。',
    fail: '提交失败，请直接发邮件至',
    channels: '其他联系方式',
    cn: '中国',
    de: '德国',
  },
  en: {
    title: 'Contact',
    lead: 'Tell us what you want to achieve. We reply within one business day and set up a free 30-minute call.',
    fields: { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone (optional)', wechat: 'WeChat ID (optional)', topic: 'Topic', budget: 'Budget', message: 'Your project' },
    topics: ['Websites & Digital Products', 'Data & AI Engineering', 'Cloud & Compliance Architecture', 'EU Digital Launch Kit', 'Other'],
    budgets: ['Not sure yet', '< €7k', '€7k–28k', '> €28k'],
    consent: 'I have read the privacy policy and agree that Synaping processes this information to answer my request, including access by team members in Germany. Data is stored on servers in China.',
    submit: 'Send',
    ok: 'Thank you — we will be in touch shortly.',
    fail: 'Sending failed. Please email',
    channels: 'Other channels',
    cn: 'China',
    de: 'Germany',
  },
  de: {
    title: 'Kontakt',
    lead: 'Erzählen Sie uns von Ihrem Vorhaben. Wir antworten innerhalb eines Werktags und vereinbaren ein kostenloses 30-Minuten-Gespräch.',
    fields: { name: 'Name', company: 'Unternehmen', email: 'E-Mail', phone: 'Telefon (optional)', wechat: 'WeChat-ID (optional)', topic: 'Thema', budget: 'Budget', message: 'Ihr Vorhaben' },
    topics: ['Websites & digitale Produkte', 'Data & AI Engineering', 'Cloud- & Compliance-Architektur', 'EU-Launch-Kit', 'Sonstiges'],
    budgets: ['Noch offen', '< 7.000 €', '7.000–28.000 €', '> 28.000 €'],
    consent: 'Ich habe die Datenschutzhinweise gelesen und willige ein, dass Synaping diese Angaben zur Beantwortung meiner Anfrage verarbeitet, auch durch Teammitglieder in Deutschland. Die Daten werden auf Servern in China gespeichert.',
    submit: 'Senden',
    ok: 'Vielen Dank – wir melden uns in Kürze.',
    fail: 'Senden fehlgeschlagen. Bitte schreiben Sie an',
    channels: 'Weitere Kanäle',
    cn: 'China',
    de: 'Deutschland',
  },
};
