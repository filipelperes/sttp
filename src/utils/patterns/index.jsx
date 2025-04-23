export const services = {
   reddit: {
      without_slash: {
         pattern: /^r$/g,
         action: () => {
            window.open("https://reddit.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^r\/+/g,
         action: (match) => {
            window.open(`https://reddit.com/${match.replace(/^r\/+/g, "")}`, "_self", false);
         }
      }
   },
   twitter: {
      without_slash: {
         pattern: /^tt$/g,
         action: () => {
            window.open("https://twitter.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^tt\/+/g,
         action: (input) => {
            let tt_input = input.replace(/^tt\/+/g, "");
            window.open(`https://twitter.com/${tt_input}`, "_self", false);
         }
      },
      with_colon: {
         pattern: /^tt:/g,
         action: (input) => {
            let tts_input = input.replace(/^tt:/g, "");
            window.open(`https://twitter.com/search?q=${tts_input}&src=typed_query`, "_self", false);
         }
      }
   },
   youtube: {
      without_slash: {
         pattern: /^y$/g,
         action: () => {
            window.open("https://youtube.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^y\/+/g,
         action: (input) => {
            let y_input = input.replace(/^y\/+/g, "");
            window.open(`https://youtube.com/${y_input}`, "_self", false);
         }
      },
      with_colon: {
         pattern: /^y:/g,
         action: (input) => {
            let ys_input = input.replace(/^y:/g, "");//.replace(" ", "+");
            window.open(`https://youtube.com/results?search_query=${ys_input}`, "_self", false);
         }
      },
   },
   github: {
      without_slash: {
         pattern: /^g$/g,
         action: () => {
            window.open("https://github.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^g\/+/g,
         action: (input) => {
            let g_input = input.replace(/^g\/+/g, "");
            window.open(`https://github.com/${g_input}`, "_self", false);
         }
      },
      with_colon: {
         pattern: /^g:/g,
         action: (input) => {
            let gs_input = input.replace(/^g:/g, "");//.replace(" ", "+");
            window.open(`https://github.com/search?q=${gs_input}`, "_self", false);
         }
      },
   },
   instagram: {
      without_slash: {
         pattern: /^i$/g,
         action: () => {
            window.open("https://instagram.com", "_self", false);
         }
      },
      with_slash: {
         pattern: /^i\/+/g,
         action: (input) => {
            let i_input = input.replace(/^i\/+/g, "");
            window.open(`https://instagram.com/${i_input}`, "_self", false);
         }
      },
   },
   twitch: {
      without_slash: {
         pattern: /^tw$/g,
         action: () => {
            window.open("https://twitch.tv/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^tw\/+/g,
         action: (input) => {
            let tw_input = input.replace(/^tw\/+/g, "");
            window.open(`https://twitch.tv/${tw_input}`, "_self", false);
         }
      },
      with_colon: {
         pattern: /^tw:/g,
         action: (input) => {
            let tws_input = input.replace(/^tw:/g, "");
            window.open(`https://twitch.tv/search?term=${tws_input}`, "_self", false);
         }
      },
   },
   monkeytype: {
      without_slash: {
         pattern: /^mk$/g,
         action: () => {
            window.open("https://monkeytype.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^mk\/+/g,
         action: (input) => {
            let mk_input = input.replace(/^mk\/+/g, "");
            window.open(`https://monkeytype.com/${mk_input}`, "_self", false);
         }
      },
   },
   spotify: {
      without_slash: {
         pattern: /^s$/g,
         action: () => {
            window.open("https://spotify.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^s\/+/g,
         action: (input) => {
            let s_input = input.replace(/^s\/+/g, "");
            window.open(`https://spotify.com/${s_input}`, "_self", false);
         }
      },
   },
   whatsapp: {
      without_slash: {
         pattern: /^w$/g,
         action: () => {
            window.open("https://web.whatsapp.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^w\/+/g,
         action: () => {
            window.open("https://web.whatsap.com/", "_self", false);
         }
      }
   },
   translator: {
      without_slash: {
         pattern: /^tr$/g,
         action: () => {
            window.open("https://translate.google.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^tr\/+/g,
         action: () => {
            window.open("https://translate.google.com/", "_self", false);
         }
      },
      with_colon: {
         pattern: /^tr:/g,
         action: (input) => {
            let trc_input = input.replace(/^tr:/g, "").replace(/^tr:/g, "");
            window.open(`https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=${trc_input}`, "_self", false);
         }
      }
   },
   discord: {
      without_slash: {
         pattern: /^dc$/g,
         action: () => {
            window.open("https://discord.com/app", "_self", false);
         }
      },
      with_slash: {
         pattern: /^dc\/+/g,
         action: () => {
            window.open("https://discord.com/app", "_self", false);
         }
      }
   },
   gmail: {
      without_slash: {
         pattern: /^m$/g,
         action: () => {
            window.open("https://gmail.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^m\/+/g,
         action: () => {
            window.open("https://gmail.com/", "_self", false);
         }
      }
   },
   netflix: {
      without_slash: {
         pattern: /^n$/g,
         action: () => {
            window.open("https://netflix.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^n\/+/g,
         action: () => {
            window.open("https://netflix.com/", "_self", false);
         }
      }
   },
   hackthebox: {
      without_slash: {
         pattern: /^htb$/g,
         action: () => {
            window.open("https://app.hackthebox.com/login/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^htb\/+/g,
         action: () => {
            window.open("https://app.hackthebox.com/login/", "_self", false);
         }
      }
   },
   tryhackme: {
      without_slash: {
         pattern: /^thm$/g,
         action: () => {
            window.open("https://tryhackme.com/login/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^thm\/+/g,
         action: () => {
            window.open("https://tryhackme.com/login/", "_self", false);
         }
      }
   },
   primevideo: {
      without_slash: {
         pattern: /^pv$/g,
         action: () => {
            window.open("https://primevideo.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^pv\/+/g,
         action: () => {
            window.open("https://primevideo.com/", "_self", false);
         }
      }
   },
   pinterest: {
      without_slash: {
         pattern: /^p$/g,
         action: () => {
            window.open("https://pinterest.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^p\/+/g,
         action: () => {
            window.open("https://pinterest.com/", "_self", false);
         }
      },
      with_colon: {
         pattern: /^p:/g,
         action: (input) => {
            let ps_input = input.replace(/^p:/g, "");
            window.open(`https://pinterest.com/search/pins/?q=${ps_input}`, "_self", false);
         }
      }
   },
   chat_gpt: {
      without_slash: {
         pattern: /^c$/g,
         action: () => {
            window.open("https://chat.openai.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^c\/+/g,
         action: () => {
            window.open("https://chat.openai.com/", "_self", false);
         }
      }
   },
   linkedin: {
      without_slash: {
         pattern: /^l$/g,
         action: () => {
            window.open("https://linkedin.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^l\/+/g,
         action: (input) => {
            let l_input = input.replace(/^l\/+/g, "");
            window.open(`https://www.linkedin.com/in/${l_input}`, "_self", false);
         }
      }
   },
   aliexpress: {
      without_slash: {
         pattern: /^a$/g,
         action: () => {
            window.open("https://www.aliexpress.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^a\/+/g,
         action: (input) => {
            let a_input = input.replace(/^a\/+/g, "");
            window.open(`https://pt.aliexpress.com/w/wholesale-${a_input}.html`, "_self", false);
         }
      },
      with_colon: {
         pattern: /^a:/g,
         action: (input) => {
            let as_input = input.replace(/^a:/g, "");//.replace(" ", "+");
            window.open(`https://pt.aliexpress.com/wholesale?SearchText=${as_input}`, "_self", false);
            // https://pt.aliexpress.com/w/wholesale-${as_input}.html
         }
      }
   },
   trello: {
      without_slash: {
         pattern: /^t$/g,
         action: () => {
            window.open("https://trello.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^t\/+/g,
         action: () => {
            window.open("https://trello.com/", "_self", false);
         }
      }
   },
   outlook: {
      without_slash: {
         pattern: /^o$/g,
         action: () => {
            window.open(`https://outlook.live.com/mail/0/`, "_self", false);
         }
      },
      with_slash: {
         pattern: /^o\/+/g,
         action: () => {
            window.open(`https://outlook.live.com/mail/0/`, "_self", false);
         }
      },
   },
   notion: {
      without_slash: {
         pattern: /^no$/g,
         action: () => {
            window.open("https://www.notion.so/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^no\/+/g,
         action: () => {
            window.open("https://www.notion.so/", "_self", false);
         }
      }
   },
   gdrive: {
      without_slash: {
         pattern: /^d$/g,
         action: () => {
            window.open("https://drive.google.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^d\/+/g,
         action: () => {
            window.open("https://drive.google.com/", "_self", false);
         }
      }
   },
   habbo: {
      without_slash: {
         pattern: /^h$/g,
         action: () => {
            window.open("https://habbo.com.br/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^h\/+/g,
         action: () => {
            window.open("https://habbo.com.br/", "_self", false);
         }
      }
   },
   unisantos: {
      without_slash: {
         pattern: /^u$/g,
         action: () => {
            window.open("https://ww2.unisantos.br/portal/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^u\/+/g,
         action: () => {
            window.open("https://ww2.unisantos.br/portal/", "_self", false);
         }
      }
   },
   canva: {
      without_slash: {
         pattern: /^cv$/g,
         action: () => {
            window.open("https://www.canva.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^cv\/+/g,
         action: () => {
            window.open("https://www.canva.com/", "_self", false);
         }
      }
   },
   pontogo: {
      without_slash: {
         pattern: /^pg$/g,
         action: () => {
            window.open("https://pontogo.app/inicio/login", "_self", false);
         }
      },
      with_slash: {
         pattern: /^pg\/+/g,
         action: () => {
            window.open("https://pontogo.app/inicio/login", "_self", false);
         }
      }
   },
   zoho: {
      without_slash: {
         pattern: /^z$/g,
         action: () => {
            window.open("https://mail.zoho.com/zm/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^z\/+/g,
         action: () => {
            window.open("https://mail.zoho.com/zm/", "_self", false);
         }
      }
   },
   shopee: {
      without_slash: {
         pattern: /^sh$/g,
         action: () => {
            window.open("https://shopee.com.br/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^sh\/+/g,
         action: () => {
            window.open("https://shopee.com.br/", "_self", false);
         }
      }
   },
   mercadolivre: {
      without_slash: {
         pattern: /^ml$/g,
         action: () => {
            window.open("https://www.mercadolivre.com.br/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^ml\/+/g,
         action: () => {
            window.open("https://www.mercadolivre.com.br/", "_self", false);
         }
      }
   },
   speedtest: {
      without_slash: {
         pattern: /^st$/g,
         action: () => {
            window.open("https://www.speedtest.net/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^st\/+/g,
         action: () => {
            window.open("https://www.speedtest.net/", "_self", false);
         }
      }
   },
   notion_calendar: {
      without_slash: {
         pattern: /^nc$/g,
         action: () => {
            window.open("https://calendar.notion.so/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^nc\/+/g,
         action: () => {
            window.open("https://calendar.notion.so/", "_self", false);
         }
      }
   },
   figma: {
      without_slash: {
         pattern: /^f$/g,
         action: () => {
            window.open("https://www.figma.com/", "_self", false);
         }
      },
      with_slash: {
         pattern: /^f\/+/g,
         action: () => {
            window.open("https://www.figma.com/", "_self", false);
         }
      }
   },
};