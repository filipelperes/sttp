import { IServicesList } from "../types/Services";

export const ServicesList = {
   reddit: {
      name: "Reddit",
      url: "https://www.reddit.com",
      icon: "reddit.svg",
      pattern: /^r(eddit)?/i,
      action: (input) => {
         window.open(`https://reddit.com/${input?.replace(/^r\/+/g, "")}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#ff4500",
         backgroundImage: "linear-gradient(to right down, rgb(255, 69, 0), rgb(255, 87, 0), rgb(255, 139, 96))",
      }
   },
   twitter: {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "twitter.svg",
      pattern: /^t(t|w(itter)?)/i,
      action: (input) => {
         const tt_input = input?.replace(/^tt\/+/g, "");
         window.open(`https://twitter.com/${tt_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#1da1f2",
         backgroundImage: "linear-gradient(to right, #1DA1F2, #009ffc)",
         color: "#14171a",
      }
   },
   youtube: {
      name: "YouTube",
      url: "https://www.youtube.com",
      icon: "youtube.svg",
      pattern: /^y(t(b)?|outube)?/i,
      action: (input) => {
         const y_input = input?.replace(/^y\/+/g, "");
         window.open(`https://youtube.com/${y_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#ff0000",
         backgroundImage: "linear-gradient(to right, #e52d27, #b31217)",
         color: "#212121",
      }
   },
   github: {
      name: "GitHub",
      url: "https://github.com",
      icon: "github.svg",
      pattern: /^g(ithub)?/i,
      action: (input) => {
         const g_input = input?.replace(/^g\/+/g, "");
         window.open(`https://github.com/${g_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#333",
         color: "#fafafa",
      }
   },
   instagram: {
      name: "Instagram",
      url: "https://www.instagram.com",
      icon: "instagram.svg",
      pattern: /^i(nstagram)?/i,
      action: (input) => {
         const i_input = input?.replace(/^i\/+/g, "");
         window.open(`https://instagram.com/${i_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
      }
   },
   twitch: {
      name: "Twitch",
      url: "https://www.twitch.tv",
      icon: "twitch.svg",
      pattern: /^t(w(itch)?)?/i,
      action: (input) => {
         const tws_input = input?.replace(/^tw:/g, "");
         window.open(`https://twitch.tv/search?term=${tws_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#9146ff",
         backgroundImage: "linear-gradient(to right, #6441A5, #2a0845)",
      }
   },
   monkeytype: {
      name: "Monkeytype",
      url: "https://monkeytype.com",
      icon: "monkeytype.svg",
      pattern: /^m(k|onkeytype)?/i,
      action: (input) => {
         const mk_input = input?.replace(/^mk\/+/g, "");
         window.open(`https://monkeytype.com/${mk_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#323437",
      }
   },
   spotify: {
      name: "Spotify",
      url: "https://www.spotify.com",
      icon: "spotify.svg",
      pattern: /^s(potify)?/i,
      action: (input) => {
         const s_input = input?.replace(/^s\/+/g, "");
         window.open(`https://spotify.com/${s_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#1db954",
         color: "#191414",
      }
   },
   whatsapp: {
      name: "WhatsApp",
      url: "https://www.whatsapp.com",
      icon: "whatsapp.svg",
      pattern: /^w(hatsapp)?/i,
      action: () => {
         window.open("https://web.whatsap.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#128c7e",
         backgroundImage: "linear-gradient(to right, #075e54, #128c7e, #25d366)",
      }
   },
   translator: {
      name: "Google Translate",
      url: "https://translate.google.com",
      icon: "google-translate.svg",
      pattern: /^gt(r(anslator)?)?/i,
      action: (input) => {
         const trc_input = input?.replace(/^tr:/g, "").replace(/^tr:/g, "");
         window.open(`https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=${trc_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#4285f4",
      }
   },
   discord: {
      name: "Discord",
      url: "https://discord.com",
      icon: "discord.svg",
      pattern: /^d(c|iscord)?/i,
      action: () => {
         window.open("https://discord.com/app", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#7289da",
      }
   },
   gmail: {
      name: "Gmail",
      url: "https://mail.google.com",
      icon: "gmail.svg",
      pattern: /^[gm](ail)?$/i,
      action: () => {
         window.open("https://gmail.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#ea4335",
      }
   },
   netflix: {
      name: "Netflix",
      url: "https://www.netflix.com",
      icon: "netflix.svg",
      pattern: /^n(etflix)?/i,
      action: () => {
         window.open("https://netflix.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#e50914",
         backgroundImage: "linear-gradient(to right, #1F1C18, #8E0E00)",
      }
   },
   hackthebox: {
      name: "Hack The Box",
      url: "https://www.hackthebox.com",
      icon: "hackthebox.svg",
      pattern: /^h(?:ack)?(?:\s*t(?:he)?)?(?:\s*b(?:ox)?)?/i, ///^h(ack)?\s?((t(he)?\s?)?(b(ox)?)?)/i // Se você precisa extrair partes específicas da string correspondente
      action: () => {
         window.open("https://app.hackthebox.com/login/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(to right, rgb(26, 35, 50), rgb(17, 25, 39)",
         color: "#9FEF00",
      }
   },
   tryhackme: {
      name: "TryHackMe",
      url: "https://tryhackme.com",
      icon: "tryhackme.svg",
      pattern: /^t(?:ry)?(?:\s*h(?:ack)?)?(?:\s*m(?:e)?)?/i, ///^t(ry)?\s?((h(ack)?\s?)?(m(e)?)?)/i // Se você precisa extrair partes específicas da string correspondente
      action: () => {
         window.open("https://tryhackme.com/login/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(to right, rgb(28, 37, 56), rgb(22, 30, 45)",
      }
   },
   primevideo: {
      name: "Prime Video",
      url: "https://www.primevideo.com",
      pattern: /^p(v|rime(\s?video)?)?/i,
      icon: "primevideo.svg",
      action: () => {
         window.open("https://primevideo.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#146eb4",
         backgroundImage: "linear-gradient(to right, #146eb4, #0f4c81)",
      }
   },
   pinterest: {
      name: "Pinterest",
      url: "https://www.pinterest.com",
      icon: "pinterest.svg",
      pattern: /^p(interest)?/i,
      action: (input) => {
         const ps_input = input?.replace(/^p:/g, "");
         window.open(`https://pinterest.com/search/pins/?q=${ps_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#e60023",
         backgroundImage: "linear-gradient(to right, #e60023, #f00000)",
      }
   },
   chat_gpt: {
      name: "ChatGPT",
      url: "https://chat.openai.com",
      icon: "chatgpt.svg",
      pattern: /^c(gpt|hat(\s?gpt)?)?/i,
      action: () => {
         window.open("https://chat.openai.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#343541",
         color: "#bdbdca",
      }
   },
   linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      icon: "linkedin.svg",
      pattern: /^l(inkedin)?/i,
      action: (input) => {
         const l_input = input?.replace(/^l\/+/g, "");
         window.open(`https://www.linkedin.com/in/${l_input}`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#0077b5",
         backgroundImage: "linear-gradient(to right , #0a66c2, #0d86ff)",
      }
   },
   aliexpress: {
      name: "AliExpress",
      url: "https://www.aliexpress.com",
      icon: "aliexpress.svg",
      pattern: /^a(li(\s?express)?)?/i,
      action: (input) => {
         const as_input = input?.replace(/^a:/g, "");//.replace(" ", "+");
         window.open(`https://pt.aliexpress.com/wholesale?SearchText=${as_input}`, "_self", "noopener, noreferrer");
         // https://pt.aliexpress.com/w/wholesale-${as_input}.html
      },
      style: {
         backgroundColor: "#f57224",
         backgroundImage: "linear-gradient(to right, #f57224, #ff6a00)",
      }
   },
   trello: {
      name: "Trello",
      url: "https://trello.com",
      icon: "trello.svg",
      pattern: /^t(rello)?/i,
      action: () => {
         window.open("https://trello.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#0077bd",
      }
   },
   outlook: {
      name: "Outlook",
      url: "https://outlook.live.com",
      icon: "outlook.svg",
      pattern: /^o(utlook)?/i,
      action: () => {
         window.open(`https://outlook.live.com/mail/0/`, "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#0f6cbd",
      }
   },
   notion: {
      name: "Notion",
      url: "https://www.notion.so",
      icon: "notion.svg",
      pattern: /^n(o(tion)?)?/i,
      action: () => {
         window.open("https://www.notion.so/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#ffffff",
         color: "#37352f",
      }
   },
   gdrive: {
      name: "Google Drive",
      url: "https://drive.google.com",
      icon: "gdrive.svg",
      pattern: /^d|^g(d(rive)?|oogle\s?drive)?/i,
      action: () => {
         window.open("https://drive.google.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(135deg, rgb(255, 208, 75), rgb(30, 163, 98), rgb(70, 136, 243)",
      }
   },
   habbo: {
      name: "Habbo",
      url: "https://www.habbo.com",
      icon: "habbo.svg",
      pattern: /^h(abbo)?/i,
      action: () => {
         window.open("https://habbo.com.br/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#f7c600",
         color: "#000000",
      }
   },
   unisantos: {
      name: "Unisantos",
      url: "https://www.unisantos.br",
      icon: "unisantos.svg",
      pattern: /^u(nisantos)?/i,
      action: () => {
         window.open("https://ww2.unisantos.br/portal/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#52659b",
         color: "#FFFFFF",
      }
   },
   canva: {
      name: "Canva",
      url: "https://www.canva.com",
      icon: "canva.svg",
      pattern: /^c(v|anva)?/i,
      action: () => {
         window.open("https://www.canva.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(135deg, #01c3cc, #7d2ae7)",
         color: "#FFFFFF",
      }
   },
   pontogo: {
      name: "Ponto Go",
      url: "https://www.pontogo.com.br",
      icon: "pontogo.svg",
      pattern: /^p(g|onto\sgo)?/i,
      action: () => {
         window.open("https://pontogo.app/inicio/login", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#000099",
         color: "#FFFFFF",
      }
   },
   zoho: {
      name: "Zoho",
      url: "https://www.zoho.com",
      icon: "zoho.svg",
      pattern: /^z(oho)?/i,
      action: () => {
         window.open("https://mail.zoho.com/zm/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(135deg, #e42527, #089949, #226db4, #f9b21d)",
         color: "#FFFFFF",
      }
   },
   shopee: {
      name: "Shopee",
      url: "https://shopee.com.br",
      icon: "shopee.svg",
      pattern: /^sh(opee)?/i,
      action: () => {
         window.open("https://shopee.com.br/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundImage: "linear-gradient(135deg, #f53d2d, #fe6432)",
         color: "#FFFFFF",
      }
   },
   mercadolivre: {
      name: "Mercado Livre",
      url: "https://www.mercadolivre.com.br",
      icon: "mercadolivre.svg",
      pattern: /^m(l|ercado\slivre)?/i,
      action: () => {
         window.open("https://www.mercadolivre.com.br/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#ffe600",
         color: "#2a2a2a",
      }
   },
   speedtest: {
      name: "Speedtest",
      url: "https://www.speedtest.net",
      icon: "speedtest.svg",
      pattern: /^s(t|peedtest)?/i,
      action: () => {
         window.open("https://www.speedtest.net/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#141526",
         color: "#ffffff",
      }
   },
   notion_calendar: {
      name: "Notion Calendar",
      url: "https://www.notion.so/calendar",
      icon: "notion_calendar.svg",
      pattern: /^n(c|otion\scalendar)/i,
      action: () => {
         window.open("https://calendar.notion.so/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#242424",
         color: "#ffffff",
      }
   },
   figma: {
      name: "Figma",
      url: "https://www.figma.com",
      icon: "figma.svg",
      pattern: /^f(igma)?/i,
      action: () => {
         window.open("https://www.figma.com/", "_self", "noopener, noreferrer");
      },
      style: {
         backgroundColor: "#2c2c2c",
         color: "#ffffff",
      }
   },
} as IServicesList;