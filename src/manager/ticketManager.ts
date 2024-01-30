import { Colors, EmbedBuilder, Guild, User } from "discord.js";
import { createTicketChannelText } from "./channelManager";
import {
  getCurrentFormattedDateString,
  getCurrentFormattedTimeString,
} from "./timeManager";

const prioritiesTicketCommand: { key: string; value: string }[] = [
  { key: "ticket-priority-low", value: "Bas" },
  { key: "ticket-priority-medium", value: "Moyen" },
  { key: "ticket-priority-high", value: "Haut" },
];

export async function createTicket(
  priority: string,
  user: User,
  guild: Guild
): Promise<void> {
  let ticketPriority = prioritiesTicketCommand.find((p) => p.key === priority);

  try {
    const createdChannel = await createTicketChannelText(user, guild);

    createdChannel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`🏷️ Ticket de ${user.displayName}`)
          .setThumbnail(user.displayAvatarURL())
          .setColor(Colors.LightGrey)
          .setDescription(
            `Bonjour, ${user.toString()} !\nBienvenue sur votre ticket, veuillez décrire votre problème et nous vous répondrons dès que possible.\nMerci de votre patience.\n\n> Le staff.`
          )
          .addFields({
            name: "🕜 Date de création",
            value: `Le ${getCurrentFormattedDateString()} à ${getCurrentFormattedTimeString()}`,
            inline: true,
          })
          .addFields({
            name: "➖ Prioritée du ticket",
            value: `**${ticketPriority.value}**`,
            inline: true,
          })
          .setTimestamp(),
      ],
    });
  } catch (error) {
    console.error(error);
  }
}
