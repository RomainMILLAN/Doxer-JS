import { Colors, ComponentType, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import {
  ActionRowBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "@discordjs/builders";
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
          .setDescription(
            `Pour la création de votre ticket, veuillez sélectionner la priorité de votre ticket.`
          ),
      ],
      components: [createRowActionButton()],
      ephemeral: true,
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 3_600_000,
    });

    collector.on("collect", async (buttonActionInteract) => {
      interaction.deleteReply();

      const selection = buttonActionInteract.values[0];
      await createTicket(selection, interaction.user, interaction.guild);
    });

    return;
  },
};

function createRowActionButton() {
  const ticketPrioritySelector = new StringSelectMenuBuilder()
    .setCustomId("ticket-priority")
    .setPlaceholder("Quelle est la priorité de votre ticket ?")
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel("⬇️ Basse")
        .setDescription(
          "Priorité basse, (aucune personne ne sera notifié, le staff vous répondra.)"
        )
        .setValue("ticket-priority-low"),
      new StringSelectMenuOptionBuilder()
        .setLabel("➖ Moyen")
        .setDescription("Priorité moyenne, (le staff sera notifié)")
        .setValue("ticket-priority-medium"),
      new StringSelectMenuOptionBuilder()
        .setLabel("⬆️ Haute")
        .setDescription("Priorité haute, (les administrateurs seront notifié)")
        .setValue("ticket-priority-high")
    );

  const row: any = new ActionRowBuilder().addComponents(ticketPrioritySelector);

  return row;
}
