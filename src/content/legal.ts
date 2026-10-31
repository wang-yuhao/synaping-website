// DRAFT legal texts — must be reviewed by the owner and a lawyer before launch (see docs/content-facts.md).
// Written as structured HTML strings so the three languages stay parallel.
import { company } from '../i18n/ui';

const c = company;

export const legalDraftNote = {
  zh: '草稿：本页文本待法务审核后生效。',
  en: 'Draft: this text takes effect after legal review.',
  de: 'Entwurf: Dieser Text gilt erst nach rechtlicher Prüfung.',
};

export const privacy = {
  zh: {
    title: '隐私政策',
    html: `
<p>更新日期：【待确认】</p>
<h2>1. 个人信息处理者</h2>
<p>${c.legalNameZh}（以下简称"我们"），联系邮箱：<a href="mailto:${c.email}">${c.email}</a>，地址：${c.addressCn}。</p>
<h2>2. 我们处理的信息与目的</h2>
<ul>
<li><strong>询盘表单：</strong>姓名、公司、邮箱，以及您自愿填写的电话、微信号、咨询方向、预算范围与需求描述。目的：回复您的咨询并安排沟通。</li>
<li><strong>访问统计：</strong>我们使用自托管的 Umami 统计工具，不使用 Cookie，不存储完整 IP 地址，仅统计页面访问量、来源与设备类型等汇总数据。</li>
<li><strong>服务器日志：</strong>为保障安全，Web 服务器会短期记录访问日志（保留不超过 30 天）。</li>
</ul>
<h2>3. 存储地点与期限</h2>
<p>询盘信息存储于位于中国北京的服务器，自收到之日起保存 12 个月，到期自动删除；如双方建立合作，按合同约定保存。</p>
<h2>4. 向境外提供</h2>
<p>我们的部分团队成员在德国工作。如您的咨询由德国团队成员跟进，您的询盘信息将被境外（德国）人员访问。我们仅在取得您单独同意后进行，并按照《个人信息保护法》及相关规定履行告知、评估等义务。境外接收方：${c.legalNameZh} 在德国的团队成员，联系方式同上。</p>
<h2>5. 您的权利</h2>
<p>您有权查阅、复制、更正、删除您的个人信息，撤回同意，以及获得本政策的解释说明。请发送邮件至 <a href="mailto:${c.email}">${c.email}</a>，我们将在 15 个工作日内答复。</p>
<h2>6. 未成年人</h2>
<p>本网站面向企业客户，不针对未满 14 周岁的未成年人。</p>`,
  },
  en: {
    title: 'Privacy policy',
    html: `
<p>Last updated: [to be confirmed]</p>
<h2>1. Controller</h2>
<p>${c.legalNameEn} (${c.legalNameZh}), ${c.addressCn}, China. Email: <a href="mailto:${c.email}">${c.email}</a>. Contact in Germany: ${c.addressDe}.</p>
<h2>2. What we process and why</h2>
<ul>
<li><strong>Contact form:</strong> name, company, email and any optional details you provide (phone, WeChat ID, topic, budget, message), to answer your request (legal basis: Art. 6(1)(b) and (a) GDPR).</li>
<li><strong>Analytics:</strong> self-hosted Umami without cookies; full IP addresses are not stored; only aggregated page views, referrers and device types (Art. 6(1)(f) GDPR).</li>
<li><strong>Server logs:</strong> kept for up to 30 days for security purposes (Art. 6(1)(f) GDPR).</li>
</ul>
<h2>3. Storage location and retention</h2>
<p>Form submissions are stored on servers in Beijing, China, and deleted automatically after 12 months unless a contract requires longer retention. By submitting the form you provide the data directly to us in China; we inform you of this before you submit.</p>
<h2>4. Your rights</h2>
<p>You may request access, rectification, erasure, restriction, data portability, object to processing and withdraw consent at any time. You may also lodge a complaint with a supervisory authority. Contact: <a href="mailto:${c.email}">${c.email}</a>.</p>
<h2>5. No cookies, no third-party tracking</h2>
<p>This website sets no cookies and loads no third-party scripts, fonts or trackers.</p>`,
  },
  de: {
    title: 'Datenschutzhinweise',
    html: `
<p>Stand: [noch zu bestätigen]</p>
<h2>1. Verantwortlicher</h2>
<p>${c.legalNameEn} (${c.legalNameZh}), ${c.addressCn}, China. E-Mail: <a href="mailto:${c.email}">${c.email}</a>. Kontakt in Deutschland: ${c.addressDe}.</p>
<h2>2. Verarbeitete Daten und Zwecke</h2>
<ul>
<li><strong>Kontaktformular:</strong> Name, Unternehmen, E-Mail sowie freiwillige Angaben (Telefon, WeChat-ID, Thema, Budget, Nachricht) zur Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. b und a DSGVO).</li>
<li><strong>Reichweitenmessung:</strong> selbst gehostetes Umami ohne Cookies; vollständige IP-Adressen werden nicht gespeichert (Art. 6 Abs. 1 lit. f DSGVO).</li>
<li><strong>Server-Logs:</strong> höchstens 30 Tage zu Sicherheitszwecken (Art. 6 Abs. 1 lit. f DSGVO).</li>
</ul>
<h2>3. Speicherort und Dauer</h2>
<p>Formulardaten werden auf Servern in Peking, China, gespeichert und nach 12 Monaten automatisch gelöscht, sofern kein Vertrag eine längere Aufbewahrung erfordert.</p>
<h2>4. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch sowie Widerruf erteilter Einwilligungen und das Recht auf Beschwerde bei einer Aufsichtsbehörde. Kontakt: <a href="mailto:${c.email}">${c.email}</a>.</p>
<h2>5. Keine Cookies, kein Tracking durch Dritte</h2>
<p>Diese Website setzt keine Cookies und lädt keine Skripte, Schriften oder Tracker von Drittanbietern.</p>`,
  },
};

export const notice = {
  zh: {
    title: '法律声明',
    html: `
<h2>网站运营者</h2>
<p>${c.legalNameZh}<br>地址：${c.addressCn}<br>邮箱：<a href="mailto:${c.email}">${c.email}</a><br>电话：${c.phoneCn}<br>法定代表人：【待确认】<br>ICP 备案号：<a href="${c.icpUrl}" target="_blank" rel="noopener">${c.icp}</a></p>
<h2>免责声明</h2>
<p>本网站内容仅供一般信息参考，不构成法律、税务或投资建议。研发实验室中的量化研究内容仅为技术研究，不构成投资建议。</p>
<h2>知识产权</h2>
<p>除另有说明外，本网站的文字、图形与代码归 ${c.legalNameZh} 所有。</p>`,
  },
  en: {
    title: 'Legal notice',
    html: `
<h2>Website operator</h2>
<p>${c.legalNameEn}<br>${c.legalNameZh}<br>${c.addressCn}, China<br>Legal representative: [to be confirmed]<br>Email: <a href="mailto:${c.email}">${c.email}</a> · Phone: ${c.phoneCn}<br>Contact in Germany: ${c.addressDe} · ${c.phoneDe}<br>ICP filing: <a href="${c.icpUrl}" target="_blank" rel="noopener">${c.icp}</a></p>
<h2>Disclaimer</h2>
<p>Content on this website is general information, not legal, tax or investment advice. Quantitative research in our Labs is technical research only and not investment advice.</p>`,
  },
  de: {
    title: 'Impressum',
    html: `
<h2>Anbieter</h2>
<p>${c.legalNameEn}<br>${c.legalNameZh}<br>${c.addressCn}, China<br>Vertretungsberechtigt: [noch zu bestätigen]<br>E-Mail: <a href="mailto:${c.email}">${c.email}</a> · Telefon: ${c.phoneCn}<br>Kontakt in Deutschland: ${c.addressDe} · ${c.phoneDe}<br>ICP-Registrierung: <a href="${c.icpUrl}" target="_blank" rel="noopener">${c.icp}</a></p>
<h2>Haftungsausschluss</h2>
<p>Die Inhalte dieser Website dienen der allgemeinen Information und stellen keine Rechts-, Steuer- oder Anlageberatung dar.</p>`,
  },
};
