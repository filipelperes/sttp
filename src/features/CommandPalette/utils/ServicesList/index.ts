import { type IServicesList } from "@/types/Service";
import {
  FaDiscord,
  FaFigma,
  FaGithub,
  FaGoogleDrive,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaRedditSquare,
  FaSpotify,
  FaTrello,
  FaTwitch,
  FaWhatsapp,
  FaYahoo,
  FaYoutube,
} from "react-icons/fa";
import {
  SiAliexpress,
  SiCanva,
  SiClaude,
  SiCnn,
  SiDeepl,
  SiFiverr,
  SiFreelancer,
  SiGmail,
  SiGooglegemini,
  SiGooglecalendar,
  SiGooglekeep,
  SiGoogletranslate,
  SiHackthebox,
  SiMega,
  SiMercadopago,
  SiMeta,
  SiMonkeytype,
  SiNetflix,
  SiNewyorktimes,
  SiNotebooklm,
  SiNotion,
  SiOpenai,
  SiShopee,
  SiSpeedtest,
  SiThewashingtonpost,
  SiTradingview,
  SiTryhackme,
  SiUpwork,
  SiX,
  SiZoho,
} from "react-icons/si";
import { DiOnedrive } from "react-icons/di";
import { MdOndemandVideo } from "react-icons/md";
import { PiMicrosoftOutlookLogoLight } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GoCopilot } from "react-icons/go";
import QwenIcon from "@/assets/qwen.svg?react";
import GrokIcon from "@/assets/grok.svg?react";
import DeepSeekIcon from "@/assets/deepseek.svg?react";
import Workana from "@/assets/workana.png";
import NoventaNoveFreelas from "@/assets/99freelas.png";
import ProfitWeb from "@/assets/profit.png";
import MetaTrader5 from "@/assets/metatrader5.svg?react";
import PontoGoIcon from "@/assets/pontogo.svg?react";
import Habbo from "@/assets/habbo.png";
import Unisantos from "@/assets/unisantos.png";
import TeraBoxIcon from "@/assets/terabox.png";
import YouVersionIcon from "@/assets/youversion.png";
import BibleGatewayIcon from "@/assets/biblegateway.png";
import BibliaOnlineIcon from "@/assets/bibliaonline.svg?react";
import InvestingIcon from "@/assets/investing.png";
import BloombergIcon from "@/assets/bloomberg.png";
import CnbcIcon from "@/assets/cnbc.svg?react";
import YahooFinanceIcon from "@/assets/yahoofinance.svg?react";
import MsnDinheiroIcon from "@/assets/msndinheiro.svg?react";

export const ServicesList = {
  reddit: {
    name: "Reddit",
    url: {
      home: "https://www.reddit.com",
    },
    icon: {
      icon: FaRedditSquare,
      type: "react-icons",
    },
    pattern: /^r(eddit)?/i,
    style: {
      backgroundColor: "#ff4500",
      backgroundImage:
        "linear-gradient(to right bottom, rgb(255, 69, 0), rgb(255, 87, 0), rgb(255, 139, 96))",
    },
  },
  twitter: {
    name: "X",
    url: {
      home: "https://x.com",
    },
    icon: {
      icon: SiX,
      type: "react-icons",
    },
    pattern: /^x$/i,
    style: {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  },
  youtube: {
    name: "YouTube",
    url: {
      home: "https://www.youtube.com",
    },
    icon: {
      icon: FaYoutube,
      type: "react-icons",
    },
    pattern: /^y(t(b)?|outube)?/i,
    style: {
      backgroundColor: "#ff0000",
      backgroundImage: "linear-gradient(to right bottom, #e52d27, #b31217)",
      color: "#212121",
    },
  },
  github: {
    name: "GitHub",
    url: {
      home: "https://github.com",
    },
    icon: {
      icon: FaGithub,
      type: "react-icons",
    },
    pattern: /^g(ithub)?/i,
    style: {
      backgroundColor: "#333",
      color: "#fafafa",
    },
  },
  instagram: {
    name: "Instagram",
    url: {
      home: "https://www.instagram.com",
    },
    icon: {
      icon: FaInstagram,
      type: "react-icons",
    },
    pattern: /^i(nstagram)?/i,
    style: {
      backgroundImage:
        "linear-gradient(to right bottom, #833ab4, #fd1d1d, #fcb045)",
      backgroundColor: "#C13584",
    },
  },
  twitch: {
    name: "Twitch",
    url: {
      home: "https://www.twitch.tv",
    },
    icon: {
      icon: FaTwitch,
      type: "react-icons",
    },
    pattern: /^t(w(itch)?)?/i,
    style: {
      backgroundColor: "#9146ff",
      backgroundImage: "linear-gradient(to right bottom, #6441A5, #2a0845)",
    },
  },
  monkeytype: {
    name: "Monkeytype",
    url: {
      home: "https://monkeytype.com",
    },
    icon: {
      icon: SiMonkeytype,
      type: "react-icons",
    },
    pattern: /^m(k|onkeytype)?/i,
    style: {
      backgroundColor: "#323437",
    },
  },
  spotify: {
    name: "Spotify",
    url: {
      home: "https://www.spotify.com",
    },
    icon: {
      icon: FaSpotify,
      type: "react-icons",
    },
    pattern: /^s(potify)?/i,
    style: {
      backgroundColor: "#1db954",
      color: "#191414",
    },
  },
  whatsapp: {
    name: "WhatsApp",
    url: {
      home: "https://www.whatsapp.com",
    },
    icon: {
      icon: FaWhatsapp,
      type: "react-icons",
    },
    pattern: /^w(hatsapp)?/i,
    style: {
      backgroundColor: "#128c7e",
      backgroundImage:
        "linear-gradient(to right bottom, #075e54, #128c7e, #25d366)",
    },
  },
  translator: {
    name: "Google Translate",
    url: {
      home: "https://translate.google.com",
    },
    icon: {
      icon: SiGoogletranslate,
      type: "react-icons",
    },
    pattern: /^gt(r(anslator)?)?/i,
    style: {
      backgroundColor: "#4285f4",
    },
  },
  discord: {
    name: "Discord",
    url: {
      home: "https://discord.com",
    },
    icon: {
      icon: FaDiscord,
      type: "react-icons",
    },
    pattern: /^d(c|iscord)?/i,
    style: {
      backgroundColor: "#7289da",
    },
  },
  gmail: {
    name: "Gmail",
    url: {
      home: "https://mail.google.com",
    },
    icon: {
      icon: SiGmail,
      type: "react-icons",
    },
    pattern: /^[gm](ail)?$/i,
    style: {
      backgroundColor: "#ea4335",
    },
  },
  netflix: {
    name: "Netflix",
    url: {
      home: "https://www.netflix.com",
    },
    icon: {
      icon: SiNetflix,
      type: "react-icons",
    },
    pattern: /^n(etflix)?/i,
    style: {
      backgroundColor: "#e50914",
      backgroundImage: "linear-gradient(to right bottom, #1F1C18, #8E0E00)",
    },
  },
  hackthebox: {
    name: "Hack The Box",
    url: {
      home: "https://www.hackthebox.com",
    },
    icon: {
      icon: SiHackthebox,
      type: "react-icons",
    },
    pattern: /^h(?:ack)?(?:\s*t(?:he)?)?(?:\s*b(?:ox)?)?/i, ///^h(ack)?\s?((t(he)?\s?)?(b(ox)?)?)/i // Se você precisa extrair partes específicas da string correspondente
    style: {
      backgroundImage:
        "linear-gradient(to right bottom, rgb(26, 35, 50), rgb(17, 25, 39)",
      backgroundColor: "#1a2332",
      color: "#9FEF00",
    },
  },
  tryhackme: {
    name: "TryHackMe",
    url: {
      home: "https://tryhackme.com",
    },
    icon: {
      icon: SiTryhackme,
      type: "react-icons",
    },
    pattern: /^t(?:ry)?(?:\s*h(?:ack)?)?(?:\s*m(?:e)?)?/i, ///^t(ry)?\s?((h(ack)?\s?)?(m(e)?)?)/i // Se você precisa extrair partes específicas da string correspondente
    style: {
      backgroundImage:
        "linear-gradient(to right bottom, rgb(28, 37, 56), rgb(22, 30, 45)",
      backgroundColor: "#1c2538",
    },
  },
  primevideo: {
    name: "Prime Video",
    url: {
      home: "https://www.primevideo.com",
    },
    pattern: /^p(v|rime(\s?video)?)?/i,
    icon: {
      icon: MdOndemandVideo,
      type: "react-icons",
    },
    style: {
      backgroundColor: "#146eb4",
      backgroundImage: "linear-gradient(to right bottom, #146eb4, #0f4c81)",
    },
  },
  pinterest: {
    name: "Pinterest",
    url: {
      home: "https://www.pinterest.com",
    },
    icon: {
      icon: FaPinterest,
      type: "react-icons",
    },
    pattern: /^p(interest)?/i,
    style: {
      backgroundColor: "#e60023",
      backgroundImage: "linear-gradient(to right bottom, #e60023, #f00000)",
    },
  },
  chat_gpt: {
    name: "ChatGPT",
    url: {
      home: "https://chat.openai.com",
    },
    icon: {
      icon: SiOpenai,
      type: "react-icons",
    },
    pattern: /^c(gpt|hat(\s?gpt)?)?/i,
    style: {
      backgroundColor: "#343541",
      color: "#bdbdca",
    },
  },
  linkedin: {
    name: "LinkedIn",
    url: {
      home: "https://www.linkedin.com",
    },
    icon: {
      icon: FaLinkedin,
      type: "react-icons",
    },
    pattern: /^l(inkedin)?/i,
    style: {
      backgroundColor: "#0077b5",
      backgroundImage: "linear-gradient(to right bottom, #0a66c2, #0d86ff)",
    },
  },
  aliexpress: {
    name: "AliExpress",
    url: {
      home: "https://www.aliexpress.com",
    },
    icon: {
      icon: SiAliexpress,
      type: "react-icons",
    },
    pattern: /^a(li(\s?express)?)?/i,
    style: {
      backgroundColor: "#f57224",
      backgroundImage: "linear-gradient(to right bottom, #f57224, #ff6a00)",
    },
  },
  trello: {
    name: "Trello",
    url: {
      home: "https://trello.com",
    },
    icon: {
      icon: FaTrello,
      type: "react-icons",
    },
    pattern: /^t(rello)?/i,
    style: {
      backgroundColor: "#0077bd",
    },
  },
  outlook: {
    name: "Outlook",
    url: {
      home: "https://outlook.live.com",
    },
    icon: {
      icon: PiMicrosoftOutlookLogoLight,
      type: "react-icons",
    },
    pattern: /^o(utlook)?/i,
    style: {
      backgroundColor: "#0f6cbd",
    },
  },
  notion: {
    name: "Notion",
    url: {
      home: "https://www.notion.so",
    },
    icon: {
      icon: SiNotion,
      type: "react-icons",
    },
    pattern: /^n(o(tion)?)?/i,
    style: {
      backgroundColor: "#ffffff",
      color: "#37352f",
    },
  },
  gdrive: {
    name: "Google Drive",
    url: {
      home: "https://drive.google.com",
    },
    icon: {
      icon: FaGoogleDrive,
      type: "react-icons",
    },
    pattern: /^d|^g(d(rive)?|oogle\s?drive)?/i,
    style: {
      backgroundImage:
        "linear-gradient(to right bottom, rgb(255, 208, 75), rgb(30, 163, 98), rgb(70, 136, 243)",
      backgroundColor: "#fdce4a",
    },
  },
  habbo: {
    name: "Habbo",
    url: {
      home: "https://www.habbo.com",
    },
    icon: {
      icon: Habbo,
      type: "img",
      skipBackground: true,
    },
    pattern: /^h(abbo)?/i,
    style: {
      backgroundColor: "#f7c600",
      color: "#000000",
    },
  },
  unisantos: {
    name: "Unisantos",
    url: {
      home: "https://www.unisantos.br",
    },
    icon: {
      icon: Unisantos,
      type: "img",
      skipBackground: true,
    },
    pattern: /^u(nisantos)?/i,
    style: {
      backgroundColor: "#52659b",
      color: "#FFFFFF",
    },
  },
  canva: {
    name: "Canva",
    url: {
      home: "https://www.canva.com",
    },
    icon: {
      icon: SiCanva,
      type: "react-icons",
    },
    pattern: /^c(v|anva)?/i,
    style: {
      backgroundImage: "linear-gradient(to right bottom, #01c3cc, #7d2ae7)",
      backgroundColor: "#7d2ae7",
      color: "#FFFFFF",
    },
  },
  pontogo: {
    name: "Ponto Go",
    url: {
      home: "https://www.pontogo.com.br",
    },
    icon: {
      icon: PontoGoIcon,
      type: "svgr",
    },
    pattern: /^p(g|onto\sgo)?/i,
    style: {
      backgroundColor: "#000099",
      color: "#FFFFFF",
    },
  },
  zoho: {
    name: "Zoho",
    url: {
      home: "https://www.zoho.com",
    },
    icon: {
      icon: SiZoho,
      type: "react-icons",
    },
    pattern: /^z(oho)?/i,
    style: {
      backgroundImage:
        "linear-gradient(to right bottom, #e42527, #089949, #226db4, #f9b21d)",
      backgroundColor: "none",
      color: "#FFFFFF",
    },
  },
  shopee: {
    name: "Shopee",
    url: {
      home: "https://shopee.com.br",
    },
    icon: {
      icon: SiShopee,
      type: "react-icons",
    },
    pattern: /^sh(opee)?/i,
    style: {
      backgroundImage: "linear-gradient(to right bottom, #f53d2d, #fe6432)",
      backgroundColor: "#fe6432",
      color: "#FFFFFF",
    },
  },
  mercadolivre: {
    name: "Mercado Livre",
    url: {
      home: "https://www.mercadolivre.com.br",
    },
    icon: {
      icon: SiMercadopago,
      type: "react-icons",
    },
    pattern: /^m(l|ercado\slivre)?/i,
    style: {
      backgroundColor: "#ffe600",
      color: "#2a2a2a",
    },
  },
  speedtest: {
    name: "Speedtest",
    url: {
      home: "https://www.speedtest.net",
    },
    icon: {
      icon: SiSpeedtest,
      type: "react-icons",
    },
    pattern: /^s(t|peedtest)?/i,
    style: {
      backgroundColor: "#141526",
      color: "#ffffff",
    },
  },
  notion_calendar: {
    name: "Notion Calendar",
    url: {
      home: "https://www.notion.so/calendar",
    },
    icon: {
      icon: IoCalendarNumberOutline,
      type: "react-icons",
    },
    pattern: /^n(c|otion\scalendar)/i,
    style: {
      backgroundColor: "#242424",
      color: "#ffffff",
    },
  },
  figma: {
    name: "Figma",
    url: {
      home: "https://www.figma.com",
    },
    icon: {
      icon: FaFigma,
      type: "react-icons",
    },
    pattern: /^f(igma)?/i,
    style: {
      backgroundColor: "#2c2c2c",
      color: "#ffffff",
    },
  },
  qwen: {
    name: "Qwen",
    url: {
      home: "https://chat.qwen.ai",
    },
    icon: {
      icon: QwenIcon,
      type: "svgr",
    },
    pattern: /^qw(en)?/i,
    style: {
      backgroundColor: "#6A3DE8",
      color: "#ffffff",
    },
  },
  gemini: {
    name: "Gemini",
    url: {
      home: "https://gemini.google.com",
    },
    icon: {
      icon: SiGooglegemini,
      type: "react-icons",
    },
    pattern: /^ge(mini)?/i,
    style: {
      backgroundColor: "#1A73E8",
      color: "#ffffff",
    },
  },
  notebooklm: {
    name: "NotebookLM",
    url: {
      home: "https://notebooklm.google.com",
    },
    icon: {
      icon: SiNotebooklm,
      type: "react-icons",
    },
    pattern: /^n(otebooklm)?/i,
    style: {
      backgroundColor: "#1A73E8",
      color: "#ffffff",
    },
  },
  grok: {
    name: "Grok",
    url: {
      home: "https://x.com/i/grok",
    },
    icon: {
      icon: GrokIcon,
      type: "svgr",
    },
    pattern: /^g(rok)?/i,
    style: {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  },
  claude: {
    name: "Claude",
    url: {
      home: "https://claude.ai",
    },
    icon: {
      icon: SiClaude,
      type: "react-icons",
    },
    pattern: /^c(laude)?/i,
    style: {
      backgroundColor: "#D97706",
      color: "#ffffff",
    },
  },
  copilot: {
    name: "Copilot",
    url: {
      home: "https://copilot.microsoft.com",
    },
    icon: {
      icon: GoCopilot,
      type: "react-icons",
    },
    pattern: /^co(pilot)?/i,
    style: {
      backgroundColor: "#217346",
      color: "#ffffff",
    },
  },
  deepseek: {
    name: "DeepSeek",
    url: {
      home: "https://chat.deepseek.com",
    },
    icon: {
      icon: DeepSeekIcon,
      type: "svgr",
    },
    pattern: /^dee(p(seek)?)?/i,
    style: {
      backgroundColor: "#4F6BFE",
      color: "#ffffff",
    },
  },
  metaai: {
    name: "Meta AI",
    url: {
      home: "https://meta.ai",
    },
    icon: {
      icon: SiMeta,
      type: "react-icons",
    },
    pattern: /^me(ta(\s?ai)?)?/i,
    style: {
      backgroundColor: "#0064E0",
      color: "#ffffff",
    },
  },
  workana: {
    name: "Workana",
    url: {
      home: "https://www.workana.com",
    },
    icon: {
      icon: Workana,
      type: "img",
      skipBackground: true,
    },
    pattern: /^wo(rkana)?/i,
    style: {
      backgroundColor: "#F7931E",
      color: "#ffffff",
    },
  },
  freelancer: {
    name: "Freelancer",
    url: {
      home: "https://www.freelancer.com.br",
    },
    icon: {
      icon: SiFreelancer,
      type: "react-icons",
    },
    pattern: /^fr(eelancer)?/i,
    style: {
      backgroundColor: "#29B2FE",
      color: "#ffffff",
    },
  },
  "99freelas": {
    name: "99freelas",
    url: {
      home: "https://www.99freelas.com.br",
    },
    icon: {
      icon: NoventaNoveFreelas,
      type: "img",
      skipBackground: true,
    },
    pattern: /^99(freelas)?/i,
    style: {
      backgroundColor: "#00B4B4",
      color: "#ffffff",
    },
  },
  fiverr: {
    name: "Fiverr",
    url: {
      home: "https://www.fiverr.com",
    },
    icon: {
      icon: SiFiverr,
      type: "react-icons",
    },
    pattern: /^fi(verr)?/i,
    style: {
      backgroundColor: "#1DBF73",
      color: "#ffffff",
    },
  },
  upwork: {
    name: "Upwork",
    url: {
      home: "https://www.upwork.com",
    },
    icon: {
      icon: SiUpwork,
      type: "react-icons",
    },
    pattern: /^up(work)?/i,
    style: {
      backgroundColor: "#6FDA44",
      color: "#ffffff",
    },
  },
  keep: {
    name: "Keep Notes",
    url: {
      home: "https://keep.google.com",
    },
    icon: {
      icon: SiGooglekeep,
      type: "react-icons",
    },
    pattern: /^k(eep(\s?notes)?)?/i,
    style: {
      backgroundColor: "#FFCC00",
      color: "#000000",
    },
  },
  tradingview: {
    name: "TradingView",
    url: {
      home: "https://www.tradingview.com",
    },
    icon: {
      icon: SiTradingview,
      type: "react-icons",
    },
    pattern: /^t(radingview)?/i,
    style: {
      backgroundColor: "#2962FF",
      color: "#ffffff",
    },
  },
  profitweb: {
    name: "ProfitWeb",
    url: {
      home: "https://profitweb.nelogica.com.br",
    },
    icon: {
      icon: ProfitWeb,
      type: "img",
      skipBackground: true,
    },
    pattern: /^pr(ofitweb)?/i,
    style: {
      backgroundColor: "#1E6B4F",
      color: "#ffffff",
    },
  },
  metatrader5: {
    name: "MetaTrader 5",
    url: {
      home: "https://web.metatrader.app/terminal?lang=pt",
    },
    icon: {
      icon: MetaTrader5,
      type: "svgr",
    },
    pattern: /^me(t(atrade(r5?)?)?)?/i,
    style: {
      backgroundColor: "#1E2A38",
      color: "#ffffff",
    },
  },
  googlecalendar: {
    name: "Google Calendar",
    url: {
      home: "https://calendar.google.com",
    },
    icon: {
      icon: SiGooglecalendar,
      type: "react-icons",
    },
    pattern: /^gc|^g(oogle\s?calendar)?/i,
    style: {
      backgroundColor: "#1A73E8",
      color: "#ffffff",
    },
  },
  yahoomail: {
    name: "Yahoo Mail",
    url: {
      home: "https://mail.yahoo.com",
    },
    icon: {
      icon: FaYahoo,
      type: "react-icons",
    },
    pattern: /^ym|^ya(hoo\s?mail)?/i,
    style: {
      backgroundColor: "#6001D2",
      color: "#ffffff",
    },
  },
  onedrive: {
    name: "OneDrive",
    url: {
      home: "https://onedrive.live.com",
    },
    icon: {
      icon: DiOnedrive,
      type: "react-icons",
    },
    pattern: /^od|^on(edrive)?/i,
    style: {
      backgroundColor: "#0078D4",
      color: "#ffffff",
    },
  },
  mega: {
    name: "Mega",
    url: {
      home: "https://mega.io",
    },
    icon: {
      icon: SiMega,
      type: "react-icons",
    },
    pattern: /^mg|^me(ga)?/i,
    style: {
      backgroundColor: "#D9272E",
      color: "#ffffff",
    },
  },
  terabox: {
    name: "TeraBox",
    url: {
      home: "https://www.terabox.com",
    },
    icon: {
      icon: TeraBoxIcon,
      type: "img",
      skipBackground: true,
    },
    pattern: /^te(rabox)?/i,
    style: {
      backgroundColor: "#1890FF",
      color: "#ffffff",
    },
  },
  deepl: {
    name: "DeepL",
    url: {
      home: "https://www.deepl.com",
    },
    icon: {
      icon: SiDeepl,
      type: "react-icons",
    },
    pattern: /^dl|^de(epl)?/i,
    style: {
      backgroundColor: "#0F2B46",
      color: "#ffffff",
    },
  },
  biblegateway: {
    name: "Bible Gateway",
    url: {
      home: "https://www.biblegateway.com",
    },
    icon: {
      icon: BibleGatewayIcon,
      type: "img",
      skipBackground: true,
    },
    pattern: /^bg|^b(ible\s?gateway)?/i,
    style: {
      backgroundColor: "#B80000",
      color: "#ffffff",
    },
  },
  youversion: {
    name: "YouVersion",
    url: {
      home: "https://www.youversion.com",
    },
    icon: {
      icon: YouVersionIcon,
      type: "img",
      skipBackground: true,
    },
    pattern: /^yv|^y(ouversion)?/i,
    style: {
      backgroundColor: "#D60000",
      color: "#ffffff",
    },
  },
  bibliaonline: {
    name: "Bíblia Online",
    url: {
      home: "https://www.bibliaonline.com.br",
    },
    icon: {
      icon: BibliaOnlineIcon,
      type: "svgr",
    },
    pattern: /^bo|^b(iblia\s?online)?/i,
    style: {
      backgroundColor: "#005599",
      color: "#ffffff",
    },
  },
  investing: {
    name: "Investing.com",
    url: {
      home: "https://www.investing.com",
    },
    icon: {
      icon: InvestingIcon,
      type: "img",
      skipBackground: true,
    },
    pattern: /^i(nv(esting)?)?/i,
    style: {
      backgroundColor: "#181C21",
      color: "#ffffff",
    },
  },
  bloomberg: {
    name: "Bloomberg",
    url: {
      home: "https://www.bloomberg.com",
    },
    icon: {
      icon: BloombergIcon,
      type: "img",
      skipBackground: true,
    },
    pattern: /^bl(oomberg)?/i,
    style: {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  },
  cnbc: {
    name: "CNBC",
    url: {
      home: "https://www.cnbc.com",
    },
    icon: {
      icon: CnbcIcon,
      type: "svgr",
    },
    pattern: /^cn(bc)?/i,
    style: {
      backgroundColor: "#005594",
      color: "#ffffff",
    },
  },
  cnn: {
    name: "CNN",
    url: {
      home: "https://www.cnn.com",
    },
    icon: {
      icon: SiCnn,
      type: "react-icons",
    },
    pattern: /^c(nn)?/i,
    style: {
      backgroundColor: "#CC0000",
      color: "#ffffff",
    },
  },
  washingtonpost: {
    name: "Washington Post",
    url: {
      home: "https://www.washingtonpost.com",
    },
    icon: {
      icon: SiThewashingtonpost,
      type: "react-icons",
    },
    pattern: /^w(p|ash(ington\spost)?)?/i,
    style: {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  },
  nytimes: {
    name: "NYTimes",
    url: {
      home: "https://www.nytimes.com",
    },
    icon: {
      icon: SiNewyorktimes,
      type: "react-icons",
    },
    pattern: /^ny(t(imes)?)?/i,
    style: {
      backgroundColor: "#000000",
      color: "#ffffff",
    },
  },
  yahoofinance: {
    name: "Yahoo Finance",
    url: {
      home: "https://finance.yahoo.com",
    },
    icon: {
      icon: YahooFinanceIcon,
      type: "svgr",
    },
    pattern: /^y(f|ahoo\s?finance)?/i,
    style: {
      backgroundColor: "#6001D2",
      color: "#ffffff",
    },
  },
  msndinheiro: {
    name: "MSN Dinheiro",
    url: {
      home: "https://www.msn.com/pt-br/dinheiro",
    },
    icon: {
      icon: MsnDinheiroIcon,
      type: "svgr",
    },
    pattern: /^ms(n(\sdinheiro)?)?/i,
    style: {
      backgroundColor: "#0078D7",
      color: "#ffffff",
    },
  },
} as IServicesList;
