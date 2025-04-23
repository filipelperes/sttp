export type Service = {
   pattern: RegExp;
   action: (match?: string) => void;
   //Se quiser garantir que match sempre vai vir com .action, pode mudar a função para exigir argumento: (match: string) => void;
};

export type ServiceGroup = {
   [subkey: string]: Service;
};

export type Services = {
   [key: string]: ServiceGroup;
};

export const services = {
   reddit: {
      without_slash: {
         pattern: /^r$/g,
         action: () => {
            window.open("https://reddit.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^r\/+/g,
         action: (match) => {
            window.open(`https://reddit.com/${match?.replace(/^r\/+/g, "")}`, "_self", "noopener, noreferrer");
         }
      }
   },
   twitter: {
      without_slash: {
         pattern: /^tt$/g,
         action: () => {
            window.open("https://twitter.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^tt\/+/g,
         action: (match) => {
            const tt_input = match?.replace(/^tt\/+/g, "");
            window.open(`https://twitter.com/${tt_input}`, "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^tt:/g,
         action: (match) => {
            const tts_input = match?.replace(/^tt:/g, "");
            window.open(`https://twitter.com/search?q=${tts_input}&src=typed_query`, "_self", "noopener, noreferrer");
         }
      }
   },
   youtube: {
      without_slash: {
         pattern: /^y$/g,
         action: () => {
            window.open("https://youtube.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^y\/+/g,
         action: (match) => {
            const y_input = match?.replace(/^y\/+/g, "");
            window.open(`https://youtube.com/${y_input}`, "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^y:/g,
         action: (match) => {
            const ys_input = match?.replace(/^y:/g, "");//.replace(" ", "+");
            window.open(`https://youtube.com/results?search_query=${ys_input}`, "_self", "noopener, noreferrer");
         }
      },
   },
   github: {
      without_slash: {
         pattern: /^g$/g,
         action: () => {
            window.open("https://github.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^g\/+/g,
         action: (match) => {
            const g_input = match?.replace(/^g\/+/g, "");
            window.open(`https://github.com/${g_input}`, "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^g:/g,
         action: (match) => {
            const gs_input = match?.replace(/^g:/g, "");//.replace(" ", "+");
            window.open(`https://github.com/search?q=${gs_input}`, "_self", "noopener, noreferrer");
         }
      },
   },
   instagram: {
      without_slash: {
         pattern: /^i$/g,
         action: () => {
            window.open("https://instagram.com", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^i\/+/g,
         action: (match) => {
            const i_input = match?.replace(/^i\/+/g, "");
            window.open(`https://instagram.com/${i_input}`, "_self", "noopener, noreferrer");
         }
      },
   },
   twitch: {
      without_slash: {
         pattern: /^tw$/g,
         action: () => {
            window.open("https://twitch.tv/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^tw\/+/g,
         action: (match) => {
            const tw_input = match?.replace(/^tw\/+/g, "");
            window.open(`https://twitch.tv/${tw_input}`, "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^tw:/g,
         action: (match) => {
            const tws_input = match?.replace(/^tw:/g, "");
            window.open(`https://twitch.tv/search?term=${tws_input}`, "_self", "noopener, noreferrer");
         }
      },
   },
   monkeytype: {
      without_slash: {
         pattern: /^mk$/g,
         action: () => {
            window.open("https://monkeytype.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^mk\/+/g,
         action: (match) => {
            const mk_input = match?.replace(/^mk\/+/g, "");
            window.open(`https://monkeytype.com/${mk_input}`, "_self", "noopener, noreferrer");
         }
      },
   },
   spotify: {
      without_slash: {
         pattern: /^s$/g,
         action: () => {
            window.open("https://spotify.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^s\/+/g,
         action: (match) => {
            const s_input = match?.replace(/^s\/+/g, "");
            window.open(`https://spotify.com/${s_input}`, "_self", "noopener, noreferrer");
         }
      },
   },
   whatsapp: {
      without_slash: {
         pattern: /^w$/g,
         action: () => {
            window.open("https://web.whatsapp.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^w\/+/g,
         action: () => {
            window.open("https://web.whatsap.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   translator: {
      without_slash: {
         pattern: /^tr$/g,
         action: () => {
            window.open("https://translate.google.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^tr\/+/g,
         action: () => {
            window.open("https://translate.google.com/", "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^tr:/g,
         action: (match) => {
            const trc_input = match?.replace(/^tr:/g, "").replace(/^tr:/g, "");
            window.open(`https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=${trc_input}`, "_self", "noopener, noreferrer");
         }
      }
   },
   discord: {
      without_slash: {
         pattern: /^dc$/g,
         action: () => {
            window.open("https://discord.com/app", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^dc\/+/g,
         action: () => {
            window.open("https://discord.com/app", "_self", "noopener, noreferrer");
         }
      }
   },
   gmail: {
      without_slash: {
         pattern: /^m$/g,
         action: () => {
            window.open("https://gmail.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^m\/+/g,
         action: () => {
            window.open("https://gmail.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   netflix: {
      without_slash: {
         pattern: /^n$/g,
         action: () => {
            window.open("https://netflix.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^n\/+/g,
         action: () => {
            window.open("https://netflix.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   hackthebox: {
      without_slash: {
         pattern: /^htb$/g,
         action: () => {
            window.open("https://app.hackthebox.com/login/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^htb\/+/g,
         action: () => {
            window.open("https://app.hackthebox.com/login/", "_self", "noopener, noreferrer");
         }
      }
   },
   tryhackme: {
      without_slash: {
         pattern: /^thm$/g,
         action: () => {
            window.open("https://tryhackme.com/login/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^thm\/+/g,
         action: () => {
            window.open("https://tryhackme.com/login/", "_self", "noopener, noreferrer");
         }
      }
   },
   primevideo: {
      without_slash: {
         pattern: /^pv$/g,
         action: () => {
            window.open("https://primevideo.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^pv\/+/g,
         action: () => {
            window.open("https://primevideo.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   pinterest: {
      without_slash: {
         pattern: /^p$/g,
         action: () => {
            window.open("https://pinterest.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^p\/+/g,
         action: () => {
            window.open("https://pinterest.com/", "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^p:/g,
         action: (match) => {
            const ps_input = match?.replace(/^p:/g, "");
            window.open(`https://pinterest.com/search/pins/?q=${ps_input}`, "_self", "noopener, noreferrer");
         }
      }
   },
   chat_gpt: {
      without_slash: {
         pattern: /^c$/g,
         action: () => {
            window.open("https://chat.openai.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^c\/+/g,
         action: () => {
            window.open("https://chat.openai.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   linkedin: {
      without_slash: {
         pattern: /^l$/g,
         action: () => {
            window.open("https://linkedin.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^l\/+/g,
         action: (match) => {
            const l_input = match?.replace(/^l\/+/g, "");
            window.open(`https://www.linkedin.com/in/${l_input}`, "_self", "noopener, noreferrer");
         }
      }
   },
   aliexpress: {
      without_slash: {
         pattern: /^a$/g,
         action: () => {
            window.open("https://www.aliexpress.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^a\/+/g,
         action: (match) => {
            const a_input = match?.replace(/^a\/+/g, "");
            window.open(`https://pt.aliexpress.com/w/wholesale-${a_input}.html`, "_self", "noopener, noreferrer");
         }
      },
      with_colon: {
         pattern: /^a:/g,
         action: (match) => {
            const as_input = match?.replace(/^a:/g, "");//.replace(" ", "+");
            window.open(`https://pt.aliexpress.com/wholesale?SearchText=${as_input}`, "_self", "noopener, noreferrer");
            // https://pt.aliexpress.com/w/wholesale-${as_input}.html
         }
      }
   },
   trello: {
      without_slash: {
         pattern: /^t$/g,
         action: () => {
            window.open("https://trello.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^t\/+/g,
         action: () => {
            window.open("https://trello.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   outlook: {
      without_slash: {
         pattern: /^o$/g,
         action: () => {
            window.open(`https://outlook.live.com/mail/0/`, "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^o\/+/g,
         action: () => {
            window.open(`https://outlook.live.com/mail/0/`, "_self", "noopener, noreferrer");
         }
      },
   },
   notion: {
      without_slash: {
         pattern: /^no$/g,
         action: () => {
            window.open("https://www.notion.so/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^no\/+/g,
         action: () => {
            window.open("https://www.notion.so/", "_self", "noopener, noreferrer");
         }
      }
   },
   gdrive: {
      without_slash: {
         pattern: /^d$/g,
         action: () => {
            window.open("https://drive.google.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^d\/+/g,
         action: () => {
            window.open("https://drive.google.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   habbo: {
      without_slash: {
         pattern: /^h$/g,
         action: () => {
            window.open("https://habbo.com.br/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^h\/+/g,
         action: () => {
            window.open("https://habbo.com.br/", "_self", "noopener, noreferrer");
         }
      }
   },
   unisantos: {
      without_slash: {
         pattern: /^u$/g,
         action: () => {
            window.open("https://ww2.unisantos.br/portal/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^u\/+/g,
         action: () => {
            window.open("https://ww2.unisantos.br/portal/", "_self", "noopener, noreferrer");
         }
      }
   },
   canva: {
      without_slash: {
         pattern: /^cv$/g,
         action: () => {
            window.open("https://www.canva.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^cv\/+/g,
         action: () => {
            window.open("https://www.canva.com/", "_self", "noopener, noreferrer");
         }
      }
   },
   pontogo: {
      without_slash: {
         pattern: /^pg$/g,
         action: () => {
            window.open("https://pontogo.app/inicio/login", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^pg\/+/g,
         action: () => {
            window.open("https://pontogo.app/inicio/login", "_self", "noopener, noreferrer");
         }
      }
   },
   zoho: {
      without_slash: {
         pattern: /^z$/g,
         action: () => {
            window.open("https://mail.zoho.com/zm/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^z\/+/g,
         action: () => {
            window.open("https://mail.zoho.com/zm/", "_self", "noopener, noreferrer");
         }
      }
   },
   shopee: {
      without_slash: {
         pattern: /^sh$/g,
         action: () => {
            window.open("https://shopee.com.br/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^sh\/+/g,
         action: () => {
            window.open("https://shopee.com.br/", "_self", "noopener, noreferrer");
         }
      }
   },
   mercadolivre: {
      without_slash: {
         pattern: /^ml$/g,
         action: () => {
            window.open("https://www.mercadolivre.com.br/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^ml\/+/g,
         action: () => {
            window.open("https://www.mercadolivre.com.br/", "_self", "noopener, noreferrer");
         }
      }
   },
   speedtest: {
      without_slash: {
         pattern: /^st$/g,
         action: () => {
            window.open("https://www.speedtest.net/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^st\/+/g,
         action: () => {
            window.open("https://www.speedtest.net/", "_self", "noopener, noreferrer");
         }
      }
   },
   notion_calendar: {
      without_slash: {
         pattern: /^nc$/g,
         action: () => {
            window.open("https://calendar.notion.so/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^nc\/+/g,
         action: () => {
            window.open("https://calendar.notion.so/", "_self", "noopener, noreferrer");
         }
      }
   },
   figma: {
      without_slash: {
         pattern: /^f$/g,
         action: () => {
            window.open("https://www.figma.com/", "_self", "noopener, noreferrer");
         }
      },
      with_slash: {
         pattern: /^f\/+/g,
         action: () => {
            window.open("https://www.figma.com/", "_self", "noopener, noreferrer");
         }
      }
   },
} as Services;