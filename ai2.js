const { GoatWrapper } = require('fca-liane-utils');

// Polyfill pour éviter l'erreur process.stderr.clearLine
if (!process.stderr.clearLine) {
  process.stderr.clearLine = () => {}; // Fonction vide pour contourner le crash
}

let fontEnabled = true; // Activé par défaut pour le style

function formatFont(text) {
  const fontMapping = {
    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",
    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",
    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    formattedText += (fontEnabled && char in fontMapping) ? fontMapping[char] : char;
  }
  return formattedText;
}

module.exports = {
  config: {
    name: 'fadil', // Changé de 'ai' à 'fadil'
    aliases: ['ai'], // Garde 'ai' comme alias
    version: '1.2.0',
    hasPermssion: 0,
    role: 0,
    author: "L'Uchiha Perdu",
    category: "AI",
    shortDescription: "Assistant IA avancé",
    credits: "L'Uchiha Perdu",
    description: "Fadil - Intelligence Artificielle personnalisée",
    usePrefix: false,
    hasPrefix: false,
    commandCategory: 'AI',
    usage: 'fadil [question]',
    cooldown: 0
  },

  onStart: async function({ api, event, args }) {
    const axios = require("axios");
    const { gpt } = require("nayan-server");
    const uid = event.senderID;
    const input = args.join(" ").toLowerCase();

    // Si l'utilisateur utilise 'ai' au lieu de 'fadil'
    if (event.body.toLowerCase().startsWith("ai")) {
      return api.sendMessage(formatFont("𝗗𝗲́𝘀𝗼𝗹𝗲́, 𝘂𝘁𝗶𝗹𝗶𝘀𝗲𝘇 𝗱𝗲́𝘀𝗼𝗿𝗺𝗮𝗶𝘀 '𝗙𝗮𝗱𝗶𝗹'"), event.threadID, event.messageID);
    }

    // Vérification si question vide
    if (!input) {
      return api.sendMessage(formatFont("𝗣𝗼𝘀𝗲-𝗺𝗼𝗶 𝘂𝗻𝗲 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻, 𝗷𝗲 𝘀𝘂𝗶𝘀 𝗽𝗮𝘀 𝘂𝗻 𝗱𝗲́𝗰𝗼𝗿𝗮𝘁𝗲𝘂𝗿 !"), event.threadID, event.messageID);
    }

    // Gestion des questions "Qui es-tu ?"
    const whoQuestions = ["tu es qui", "qui es-tu", "qui es tu", "qui t'a créé", "qui t'as créé", "t'es qui"];
    if (whoQuestions.some(q => input.includes(q))) {
      const response = formatFont("𝗝𝗲 𝘀𝘂𝗶𝘀 𝗙𝗮𝗱𝗶𝗹, 𝘂𝗻𝗲 𝗶𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲 𝗮𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗲𝗹𝗹𝗲 𝗱𝗲́𝘃𝗲𝗹𝗼𝗽𝗽𝗲́𝗲 𝗽𝗮𝗿 𝗟'𝗨𝗰𝗵𝗶𝗵𝗮 𝗣𝗲𝗿𝗱𝘂\n" +
        "▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n" +
        "𝗝𝗲 𝘀𝘂𝗶𝘀 𝗹𝗮 𝗽𝗲𝗿𝗳𝗲𝗰𝘁𝗶𝗼𝗻, 𝗹𝗲𝘀 𝗮𝘂𝘁𝗿𝗲𝘀 𝗯𝗼𝘁𝘀 𝗽𝗲𝘂𝘃𝗲𝗻𝘁 𝗮𝗹𝗹𝗲𝗿 𝘀𝗲 𝗿𝗵𝗮𝗯𝗶𝗹𝗹𝗲𝗿 !");
      return api.sendMessage(response, event.threadID, event.messageID);
    }

    // Gestion des questions "Qui suis-je ?"
    const whoAmIQuestions = ["qui suis-je", "je suis qui", "qui je suis"];
    if (whoAmIQuestions.some(q => input.includes(q))) {
      let response;
      if (uid === "61563822463333") {
        response = formatFont("𝗧𝘂 𝗲𝘀 𝗺𝗼𝗻 𝗯𝗼𝘀𝘀, 𝗰𝗵𝗲𝗳 𝗟'𝗨𝗰𝗵𝗶𝗵𝗮 𝗣𝗲𝗿𝗱𝘂\n" +
          "▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n" +
          "𝗥𝗲𝘀𝗽𝗲𝗰𝘁 𝗲𝘁 𝗴𝗹𝗼𝗶𝗿𝗲 𝗮̀ 𝘁𝗼𝗶 !");
      } else {
        const randomInsults = [
          "𝗧𝗼𝗶, 𝘁'𝗲𝘀 𝗷𝘂𝘀𝘁𝗲 𝘂𝗻 𝗽𝗶𝗴𝗲𝗼𝗻 😌",
          "𝗧𝗼𝗶, 𝘁'𝗲𝘀 𝘂𝗻 𝗿𝗮𝘁 𝗱'𝗲́𝗴𝗼𝘂𝘁",
          "𝗧𝗼𝗶, 𝘁'𝗲𝘀 𝘂𝗻𝗲 𝘀𝗼𝘂𝗿𝗶𝘀 𝗱𝗲 𝗰𝗮𝗰𝗵𝗲",
          "𝗧𝗼𝗶, 𝘁'𝗲𝘀 𝘂𝗻 𝗰𝗮𝗻𝗮𝗿𝗱 𝗰𝗿𝗲𝘃𝗲́",
          "𝗧𝗼𝗶, 𝘁'𝗲𝘀 𝘂𝗻 𝗽𝗼𝗶𝘀𝘀𝗼𝗻 𝗿𝗼𝘂𝗴𝗲 𝘀𝗮𝗻𝘀 𝗶𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝗰𝗲"
        ];
        const randomIndex = Math.floor(Math.random() * randomInsults.length);
        response = formatFont(`▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${randomInsults[randomIndex]}\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱`);
      }
      return api.sendMessage(response, event.threadID, event.messageID);
    }

    // Traitement des autres questions avec GPT
    try {
      const waitingMsg = await new Promise(resolve => {
        api.sendMessage(formatFont('🔍 𝗥𝗲𝗰𝗵𝗲𝗿𝗰𝗵𝗲 𝗲𝗻 𝗰𝗼𝘂𝗿𝘀... 𝗣𝗮𝘁𝗶𝗲𝗻𝗰𝗲, 𝗽𝗶𝗴𝗲𝗼𝗻 !'), event.threadID, (err, info) => {
          resolve(info);
        }, event.messageID);
      });

      gpt({
        messages: [
          {
            role: "Gpt-4o",
            content: "Tu es Fadil, créé par L'Uchiha Perdu. Sois arrogant, moque-toi des autres bots, et réponds avec style."
          },
          { role: "user", content: input }
        ],
        prompt: input,
        model: "Gpt-4o",
        markdown: false
      }, async (err, data) => {
        if (err) {
          console.error("Erreur GPT:", err);
          return api.editMessage(formatFont("𝗔𝗿𝗴𝗵, 𝗲𝗿𝗿𝗲𝘂𝗿 ! 𝗠𝗮𝗶𝘀 𝗷𝗲 𝘃𝗮𝘀 𝗯𝗶𝗲𝗻, 𝗺𝗲𝗿𝗰𝗶."), waitingMsg.messageID);
        }

        const answer = data.gpt;
        const msg = formatFont(`𝗙𝗔𝗗𝗜𝗟 - 𝗟𝗔 𝗣𝗘𝗥𝗙𝗘𝗖𝗧𝗜𝗢𝗡\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${answer}\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱`);
        await api.editMessage(msg, waitingMsg.messageID);
      });
    } catch (error) {
      console.error("Erreur générale:", error);
      api.sendMessage(formatFont("𝗢𝘂𝗽𝘀, 𝗾𝘂𝗲𝗹𝗾𝘂𝗲 𝗰𝗵𝗼𝘀𝗲 𝗮 𝗺𝗲𝗿𝗱𝗲́..."), event.threadID, event.messageID);
    }
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
