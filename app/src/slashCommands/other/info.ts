import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { SlashCommand } from "../../../types";
import { sentry } from "../../manager/sentry";
import { linkMark, robotMark, whiteCheckMark } from "../../manager/enum/icon";
import { APP_VERSION } from "../../version";

export const command: SlashCommand = {
  name: "info",
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Affiche les informations du bot"),
  execute: async (interaction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${robotMark} Doxer JS v${APP_VERSION}`)
          .setDescription(
            `Bot développer par [Romain MILLAN](https://romainmillan.fr).\nCe bot permet l'utilisation de commande pour simplifier la configuration et la modération sur des serveurs discords`
          )
          .addFields({
            name: `${linkMark} Code`,
            value:
              "[Lien vers Github](https://github.com/RomainMILLAN/Doxer-JS)",
          }),
      ],
      components: [createRowActionButton()],
      flags: [MessageFlags.Ephemeral],
    });

    sentry(
      interaction.client,
      "Informations",
      whiteCheckMark + " Affichage des informations du bot",
      interaction.user,
      "/info"
    );

    return;
  },
};

function createRowActionButton() {
  const romainMillanLink = new ButtonBuilder()
    .setURL(`https://romainmillan.fr/`)
    .setLabel("Romain MILLAN")
    .setStyle(ButtonStyle.Link);

  const githubButtonLink = new ButtonBuilder()
    .setURL(`https://github.com/RomainMILLAN/Doxer-JS/`)
    .setLabel("Repository Github")
    .setStyle(ButtonStyle.Link);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(romainMillanLink, githubButtonLink);
}
