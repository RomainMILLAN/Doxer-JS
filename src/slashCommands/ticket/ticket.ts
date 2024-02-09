import { Colors, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import { EmbedBuilder } from "@discordjs/builders";
import { createTicket } from "../../manager/ticketManager";
import { labelMark } from "../../manager/enum/icon";
import { sendDebug } from "../../manager/consoleManager";

export const command: SlashCommand = {
  name: "ticket",
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Créer un ticket")
    .setDMPermission(false),
  execute: async (interaction) => {
    const response = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${labelMark} Ticket`)
          .setColor(Colors.Grey)
          .setDescription(`Création de votre ticket en cour...`),
      ],
      ephemeral: true,
    });

    const isTicketCreated = await createTicket(interaction.user, interaction.guild);

    if (isTicketCreated) {
      response.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${labelMark} Ticket`)
            .setColor(Colors.Green)
            .setDescription(`Votre ticket a bien été créé !`),
        ],
      });
    }else {
      response.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${labelMark} Ticket`)
            .setColor(Colors.Red)
            .setDescription(`Une erreur est survenue, veuillez réessayer plus tard.`),
        ],
      });
    }

    return;
  },
};
