import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import { sentry } from "../manager/sentry";
import { whiteCheckMark } from "../manager/enum/icon";

export const command: SlashCommand = {
  name: "info",
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Affiche les informations du bot"),
  execute: async (interaction) => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`🤖 Doxer JS`)
          .setDescription(
            `Bot développer par [Romain MILLAN](https://romainmillan.fr).\nCe bot permet l'utilisation de commande pour simplifier la configuration et la modération sur des serveurs discords`
          )
          .addFields({
            name: "🔗 Code",
            value:
              "[Lien vers Github](https://github.com/RomainMILLAN/Doxer-JS)",
          }),
      ],
    });

    sentry(
      interaction.client,
      "Informations",
      whiteCheckMark + " Affichage des informations du bot",
      interaction.user,
      '/info'
    );

    return;
  },
};
