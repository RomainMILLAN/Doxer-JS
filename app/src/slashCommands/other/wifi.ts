import {
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../../types";
import { sentry } from "../../manager/sentry";
import { linkMark, robotMark, whiteCheckMark } from "../../manager/enum/icon";

export const command: SlashCommand = {
  name: "wifi",
  data: new SlashCommandBuilder()
    .setName("wifi")
    .setDescription("Affiche les informations du wifi"),
  execute: async (interaction) => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${robotMark} Doxer JS`)
          .setDescription(
            `Voici les identifiants de connexion au wifi`
          )
          .addFields({
            name: `${linkMark} SSID`,
            value:
              `${process.env.W_SSID}`,
          },{
            name: `${linkMark} Mot de passe`,
            value:
              `${process.env.W_PASSWORD}`,
          }),
      ],
      ephemeral: true,
    });

    sentry(
      interaction.client,
      "Wifi",
      whiteCheckMark + " Affichage des informations du wifi",
      interaction.user,
      "/wifi"
    );

    return;
  },
};
