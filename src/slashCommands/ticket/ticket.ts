import { Colors, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import { EmbedBuilder } from "@discordjs/builders";
import { createTicket } from "../../manager/ticketManager";

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
          .setTitle(`🏷️ Ticket`)
          .setColor(Colors.Grey)
          .setDescription(`Création de votre ticket en cour...`),
      ],
      ephemeral: true,
    });

    const isTicketCreated = createTicket(interaction.user, interaction.guild);

    if (isTicketCreated) {
      response.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle(`🏷️ Ticket`)
            .setColor(Colors.Green)
            .setDescription(`Votre ticket a bien été créé !`),
        ],
      });
    }

    return;
  },
};
