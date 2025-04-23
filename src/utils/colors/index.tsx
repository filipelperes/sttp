export type ColorType = {
   backgroundColor?: string;
   backgroundImage?: string;
   color?: string;
};

export type Colors = {
   [key: string]: ColorType;
};

export const colors = {
   reddit: {
      backgroundColor: "#ff4500",
      backgroundImage: "linear-gradient(to right, rgb(255, 69, 0), rgb(255, 87, 0), rgb(255, 139, 96))",
   },
   twitter: {
      backgroundColor: "#1da1f2",
      backgroundImage: "linear-gradient(to right, #1DA1F2, #009ffc)",
      color: "#14171a",
   },
   youtube: {
      backgroundColor: "#ff0000",
      backgroundImage: "linear-gradient(to right, #e52d27, #b31217)",
      color: "#212121",
   },
   github: {
      backgroundColor: "#333",
      color: "#fafafa",
   },
   instagram: {
      backgroundImage: "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
   },
   twitch: {
      backgroundColor: "#9146ff",
      backgroundImage: "linear-gradient(to right, #6441A5, #2a0845)",
   },
   monkeytype: {
      backgroundColor: "#323437",
   },
   spotify: {
      backgroundColor: "#1db954",
      color: "#191414",
   },
   whatsapp: {
      backgroundColor: "#128c7e",
      backgroundImage: "linear-gradient(to right, #075e54, #128c7e, #25d366)",
   },
   translator: {
      backgroundColor: "#4285f4",
   },
   discord: {
      backgroundColor: "#7289da",
   },
   gmail: {
      backgroundColor: "#ea4335",
   },
   netflix: {
      backgroundColor: "#e50914",
      backgroundImage: "linear-gradient(to right, #1F1C18, #8E0E00)",
   },
   hackthebox: {
      backgroundImage: "linear-gradient(to right, rgb(26, 35, 50), rgb(17, 25, 39)",
      color: "#9FEF00",
   },
   tryhackme: {
      backgroundImage: "linear-gradient(to right, rgb(28, 37, 56), rgb(22, 30, 45)",
   },
   primevideo: {
      backgroundColor: "#146eb4",
      backgroundImage: "linear-gradient(to right, #146eb4, #0f4c81)"
   },
   pinterest: {
      backgroundColor: "#e60023",
      backgroundImage: "linear-gradient(to right, #e60023, #f00000)",

   },
   chat_gpt: {
      backgroundColor: "#343541",
      color: "#bdbdca",
   },
   linkedin: {
      backgroundColor: "#0077b5",
      backgroundImage: "linear-gradient(to right , #0a66c2, #0d86ff)",
   },
   aliexpress: {
      // backgroundImage: "linear-gradient(135deg, rgb(229, 45, 3), rgb(253, 147, 0)",
      backgroundImage: "linear-gradient(to right, #f57224, #ff6a00)",

   },
   trello: {
      backgroundColor: "#0077bd",
   },
   outlook: {
      backgroundColor: "#0f6cbd",
   },
   notion: {
      backgroundColor: "#ffffff",
      color: "#37352f",
   },
   gdrive: {
      backgroundImage: "linear-gradient(135deg, rgb(255, 208, 75), rgb(30, 163, 98), rgb(70, 136, 243)",
   },
   habbo: {
      backgroundColor: "#f7c600",
      color: "#000000",
   },
   unisantos: {
      backgroundColor: "#52659b",
      color: "#FFFFFF",
   },
   canva: {
      backgroundImage: "linear-gradient(135deg, #01c3cc, #7d2ae7)",
      color: "#FFFFFF",
   },
   pontogo: {
      backgroundImage: "none",
      backgroundColor: "#000099",
      color: "#FFFFFF",
   },
   zoho: {
      backgroundImage: "linear-gradient(135deg, #e42527, #089949, #226db4, #f9b21d)",
      color: "#FFFFFF",
   },
   shopee: {
      backgroundImage: "linear-gradient(135deg, #f53d2d, #fe6432)",
      color: "#FFFFFF",
   },
   mercadolivre: {
      backgroundColor: "#ffe600",
      color: "#2a2a2a",
   },
   speedtest: {
      backgroundColor: "#141526",
      color: "#ffffff",
   },
   notioncalendar: {
      backgroundColor: "#242424",
      color: "#ffffff",
   },
   figma: {
      backgroundColor: "#2c2c2c",
      color: "#ffffff",
   }
} as Colors;