import { type IServicesList } from "@/types/Service";
import { FaDiscord, FaFigma, FaGithub, FaGoogleDrive, FaInstagram, FaLinkedin, FaPinterest, FaRedditSquare, FaSpotify, FaTrello, FaTwitch, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { SiAliexpress, SiCanva, SiGmail, SiGoogletranslate, SiHackthebox, SiMercadopago, SiMonkeytype, SiNetflix, SiNotion, SiPrimevideo, SiShopee, SiSpeedtest, SiTryhackme, SiZoho } from "react-icons/si";
import { PiMicrosoftOutlookLogoLight } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import PontoGoIcon from '@/assets/pontogo.svg?react';
import ChatGPT from '@/assets/chatgpt.svg?react';
import Habbo from '@/assets/habbo.png';
import Unisantos from '@/assets/unisantos.png';

export const ServicesList = {
   reddit: {
      name: "Reddit",
      url: {
         home: "https://www.reddit.com"
      },
      icon: {
         icon: FaRedditSquare,
         type: "react-icons"
      },
      pattern: /^r(eddit)?/i,
      style: {
         backgroundColor: "#ff4500",
         backgroundImage: "linear-gradient(to right bottom, rgb(255, 69, 0), rgb(255, 87, 0), rgb(255, 139, 96))",
      }
   },
   twitter: {
      name: "Twitter",
      url: {
         home: "https://twitter.com"
      },
      icon: {
         icon: FaTwitter,
         type: "react-icons"
      },
      pattern: /^t(t|w(itter)?)/i,
      style: {
         backgroundColor: "#1da1f2",
         backgroundImage: "linear-gradient(to right bottom, #1DA1F2, #009ffc)",
         color: "#14171a",
      }
   },
   youtube: {
      name: "YouTube",
      url: {
         home: "https://www.youtube.com"
      },
      icon: {
         icon: FaYoutube,
         type: "react-icons"
      },
      pattern: /^y(t(b)?|outube)?/i,
      style: {
         backgroundColor: "#ff0000",
         backgroundImage: "linear-gradient(to right bottom, #e52d27, #b31217)",
         color: "#212121",
      }
   },
   github: {
      name: "GitHub",
      url: {
         home: "https://github.com"
      },
      icon: {
         icon: FaGithub,
         type: "react-icons"
      },
      pattern: /^g(ithub)?/i,
      style: {
         backgroundColor: "#333",
         color: "#fafafa",
      }
   },
   instagram: {
      name: "Instagram",
      url: {
         home: "https://www.instagram.com"
      },
      icon: {
         icon: FaInstagram,
         type: "react-icons"
      },
      pattern: /^i(nstagram)?/i,
      style: {
         backgroundImage: "linear-gradient(to right bottom, #833ab4, #fd1d1d, #fcb045)",
         backgroundColor: "#C13584"
      }
   },
   twitch: {
      name: "Twitch",
      url: {
         home: "https://www.twitch.tv"
      },
      icon: {
         icon: FaTwitch,
         type: "react-icons"
      },
      pattern: /^t(w(itch)?)?/i,
      style: {
         backgroundColor: "#9146ff",
         backgroundImage: "linear-gradient(to right bottom, #6441A5, #2a0845)",
      }
   },
   monkeytype: {
      name: "Monkeytype",
      url: {
         home: "https://monkeytype.com"
      },
      icon: {
         icon: SiMonkeytype,
         type: "react-icons"
      },
      pattern: /^m(k|onkeytype)?/i,
      style: {
         backgroundColor: "#323437",
      }
   },
   spotify: {
      name: "Spotify",
      url: {
         home: "https://www.spotify.com"
      },
      icon: {
         icon: FaSpotify,
         type: "react-icons"
      },
      pattern: /^s(potify)?/i,
      style: {
         backgroundColor: "#1db954",
         color: "#191414",
      }
   },
   whatsapp: {
      name: "WhatsApp",
      url: {
         home: "https://www.whatsapp.com"
      },
      icon: {
         icon: FaWhatsapp,
         type: "react-icons"
      },
      pattern: /^w(hatsapp)?/i,
      style: {
         backgroundColor: "#128c7e",
         backgroundImage: "linear-gradient(to right bottom, #075e54, #128c7e, #25d366)",
      }
   },
   translator: {
      name: "Google Translate",
      url: {
         home: "https://translate.google.com"
      },
      icon: {
         icon: SiGoogletranslate,
         type: "react-icons"
      },
      pattern: /^gt(r(anslator)?)?/i,
      style: {
         backgroundColor: "#4285f4",
      }
   },
   discord: {
      name: "Discord",
      url: {
         home: "https://discord.com"
      },
      icon: {
         icon: FaDiscord,
         type: "react-icons"
      },
      pattern: /^d(c|iscord)?/i,
      style: {
         backgroundColor: "#7289da",
      }
   },
   gmail: {
      name: "Gmail",
      url: {
         home: "https://mail.google.com"
      },
      icon: {
         icon: SiGmail,
         type: "react-icons"
      },
      pattern: /^[gm](ail)?$/i,
      style: {
         backgroundColor: "#ea4335",
      }
   },
   netflix: {
      name: "Netflix",
      url: {
         home: "https://www.netflix.com"
      },
      icon: {
         icon: SiNetflix,
         type: "react-icons"
      },
      pattern: /^n(etflix)?/i,
      style: {
         backgroundColor: "#e50914",
         backgroundImage: "linear-gradient(to right bottom, #1F1C18, #8E0E00)",
      }
   },
   hackthebox: {
      name: "Hack The Box",
      url: {
         home: "https://www.hackthebox.com"
      },
      icon: {
         icon: SiHackthebox,
         type: "react-icons"
      },
      pattern: /^h(?:ack)?(?:\s*t(?:he)?)?(?:\s*b(?:ox)?)?/i, ///^h(ack)?\s?((t(he)?\s?)?(b(ox)?)?)/i // Se você precisa extrair partes específicas da string correspondente
      style: {
         backgroundImage: "linear-gradient(to right bottom, rgb(26, 35, 50), rgb(17, 25, 39)",
         backgroundColor: "#1a2332",
         color: "#9FEF00",
      }
   },
   tryhackme: {
      name: "TryHackMe",
      url: {
         home: "https://tryhackme.com"
      },
      icon: {
         icon: SiTryhackme,
         type: "react-icons"
      },
      pattern: /^t(?:ry)?(?:\s*h(?:ack)?)?(?:\s*m(?:e)?)?/i, ///^t(ry)?\s?((h(ack)?\s?)?(m(e)?)?)/i // Se você precisa extrair partes específicas da string correspondente
      style: {
         backgroundImage: "linear-gradient(to right bottom, rgb(28, 37, 56), rgb(22, 30, 45)",
         backgroundColor: "#1c2538",
      }
   },
   primevideo: {
      name: "Prime Video",
      url: {
         home: "https://www.primevideo.com"
      },
      pattern: /^p(v|rime(\s?video)?)?/i,
      icon: {
         icon: SiPrimevideo,
         type: "react-icons"
      },
      style: {
         backgroundColor: "#146eb4",
         backgroundImage: "linear-gradient(to right bottom, #146eb4, #0f4c81)",
      }
   },
   pinterest: {
      name: "Pinterest",
      url: {
         home: "https://www.pinterest.com"
      },
      icon: {
         icon: FaPinterest,
         type: "react-icons"
      },
      pattern: /^p(interest)?/i,
      style: {
         backgroundColor: "#e60023",
         backgroundImage: "linear-gradient(to right bottom, #e60023, #f00000)",
      }
   },
   chat_gpt: {
      name: "ChatGPT",
      url: {
         home: "https://chat.openai.com"
      },
      icon: {
         icon: ChatGPT,
         type: "svgr"
      },
      pattern: /^c(gpt|hat(\s?gpt)?)?/i,
      style: {
         backgroundColor: "#343541",
         color: "#bdbdca",
      }
   },
   linkedin: {
      name: "LinkedIn",
      url: {
         home: "https://www.linkedin.com"
      },
      icon: {
         icon: FaLinkedin,
         type: "react-icons"
      },
      pattern: /^l(inkedin)?/i,
      style: {
         backgroundColor: "#0077b5",
         backgroundImage: "linear-gradient(to right bottom, #0a66c2, #0d86ff)",
      }
   },
   aliexpress: {
      name: "AliExpress",
      url: {
         home: "https://www.aliexpress.com"
      },
      icon: {
         icon: SiAliexpress,
         type: "react-icons"
      },
      pattern: /^a(li(\s?express)?)?/i,
      style: {
         backgroundColor: "#f57224",
         backgroundImage: "linear-gradient(to right bottom, #f57224, #ff6a00)",
      }
   },
   trello: {
      name: "Trello",
      url: {
         home: "https://trello.com"
      },
      icon: {
         icon: FaTrello,
         type: "react-icons"
      },
      pattern: /^t(rello)?/i,
      style: {
         backgroundColor: "#0077bd",
      }
   },
   outlook: {
      name: "Outlook",
      url: {
         home: "https://outlook.live.com"
      },
      icon: {
         icon: PiMicrosoftOutlookLogoLight,
         type: "react-icons"
      },
      pattern: /^o(utlook)?/i,
      style: {
         backgroundColor: "#0f6cbd",
      }
   },
   notion: {
      name: "Notion",
      url: {
         home: "https://www.notion.so"
      },
      icon: {
         icon: SiNotion,
         type: "react-icons"
      },
      pattern: /^n(o(tion)?)?/i,
      style: {
         backgroundColor: "#ffffff",
         color: "#37352f",
      }
   },
   gdrive: {
      name: "Google Drive",
      url: {
         home: "https://drive.google.com"
      },
      icon: {
         icon: FaGoogleDrive,
         type: "react-icons"
      },
      pattern: /^d|^g(d(rive)?|oogle\s?drive)?/i,
      style: {
         backgroundImage: "linear-gradient(to right bottom, rgb(255, 208, 75), rgb(30, 163, 98), rgb(70, 136, 243)",
         backgroundColor: "#fdce4a",
      }
   },
   habbo: {
      name: "Habbo",
      url: {
         home: "https://www.habbo.com"
      },
      icon: {
         icon: Habbo,
         type: "img"
      },
      pattern: /^h(abbo)?/i,
      style: {
         backgroundColor: "#f7c600",
         color: "#000000",
      }
   },
   unisantos: {
      name: "Unisantos",
      url: {
         home: "https://www.unisantos.br"
      },
      icon: {
         icon: Unisantos,
         type: "img"
      },
      pattern: /^u(nisantos)?/i,
      style: {
         backgroundColor: "#52659b",
         color: "#FFFFFF",
      }
   },
   canva: {
      name: "Canva",
      url: {
         home: "https://www.canva.com"
      },
      icon: {
         icon: SiCanva,
         type: "react-icons"
      },
      pattern: /^c(v|anva)?/i,
      style: {
         backgroundImage: "linear-gradient(to right bottom, #01c3cc, #7d2ae7)",
         backgroundColor: "#7d2ae7",
         color: "#FFFFFF",
      }
   },
   pontogo: {
      name: "Ponto Go",
      url: {
         home: "https://www.pontogo.com.br"
      },
      icon: {
         icon: PontoGoIcon,
         type: "svgr"
      },
      pattern: /^p(g|onto\sgo)?/i,
      style: {
         backgroundColor: "#000099",
         color: "#FFFFFF",
      }
   },
   zoho: {
      name: "Zoho",
      url: {
         home: "https://www.zoho.com"
      },
      icon: {
         icon: SiZoho,
         type: "react-icons"
      },
      pattern: /^z(oho)?/i,
      style: {
         backgroundImage: "linear-gradient(to right bottom, #e42527, #089949, #226db4, #f9b21d)",
         backgroundColor: "none",
         color: "#FFFFFF",
      }
   },
   shopee: {
      name: "Shopee",
      url: {
         home: "https://shopee.com.br"
      },
      icon: {
         icon: SiShopee,
         type: "react-icons"
      },
      pattern: /^sh(opee)?/i,
      style: {
         backgroundImage: "linear-gradient(to right bottom, #f53d2d, #fe6432)",
         backgroundColor: "#fe6432",
         color: "#FFFFFF",
      }
   },
   mercadolivre: {
      name: "Mercado Livre",
      url: {
         home: "https://www.mercadolivre.com.br"
      },
      icon: {
         icon: SiMercadopago,
         type: "react-icons"
      },
      pattern: /^m(l|ercado\slivre)?/i,
      style: {
         backgroundColor: "#ffe600",
         color: "#2a2a2a",
      }
   },
   speedtest: {
      name: "Speedtest",
      url: {
         home: "https://www.speedtest.net"
      },
      icon: {
         icon: SiSpeedtest,
         type: "react-icons"
      },
      pattern: /^s(t|peedtest)?/i,
      style: {
         backgroundColor: "#141526",
         color: "#ffffff",
      }
   },
   notion_calendar: {
      name: "Notion Calendar",
      url: {
         home: "https://www.notion.so/calendar"
      },
      icon: {
         icon: IoCalendarNumberOutline,
         type: "react-icons"
      },
      pattern: /^n(c|otion\scalendar)/i,
      style: {
         backgroundColor: "#242424",
         color: "#ffffff",
      }
   },
   figma: {
      name: "Figma",
      url: {
         home: "https://www.figma.com"
      },
      icon: {
         icon: FaFigma,
         type: "react-icons"
      },
      pattern: /^f(igma)?/i,
      style: {
         backgroundColor: "#2c2c2c",
         color: "#ffffff",
      }
   },
} as IServicesList;