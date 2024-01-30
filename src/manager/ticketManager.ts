import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  Guild,
  Message,
  TextChannel,
  User,
} from "discord.js";
import {
  createTicketChannelText,
  deleteTicketChannelText,
} from "./channelManager";
import {
  getCurrentFormattedDateString,
  getCurrentFormattedTimeString,
} from "./timeManager";
import { sendDebug, sendError } from "./consoleManager";
import sentry from "./sentry";
import { labelMark, timeMark, whiteCheckMark, xMark } from "./enum/icon";

export async function createTicket(user: User, guild: Guild): Promise<boolean> {
  try {
    const ticketChannel = await createTicketChannelText(user, guild);

    const firstMessageTicket = await sendFirstMessageOfTicketChannel(
      ticketChannel,
      user
    );

    actionTicketButton(firstMessageTicket, user, ticketChannel);

    return true;
  } catch (error) {
    sendError(
      `Une erreur est survenue lors de la création du ticket (${error}).`
    );
  }

  return false;
}

async function sendFirstMessageOfTicketChannel(
  ticketChannel: TextChannel,
  user: User
): Promise<Message<boolean>> {
  const newTicketMessage = await ticketChannel.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`${labelMark} Ticket de ${user.displayName}`)
        .setThumbnail(user.displayAvatarURL())
        .setColor(Colors.LightGrey)
        .setDescription(
          `Bonjour, ${user.toString()} !\nBienvenue sur votre ticket, veuillez décrire votre problème et nous vous répondrons dès que possible.\nMerci de votre patience.\n\n> Le staff.`
        )
        .addFields({
          name: `${timeMark} Date de création`,
          value: `Le ${getCurrentFormattedDateString()} à ${getCurrentFormattedTimeString()}`,
          inline: true,
        })
        .setTimestamp(),
    ],
    components: [createTicketButton()],
  });

  sentry(
    user.client,
    "Ticket",
    whiteCheckMark + " Demande de la priorité pour la création d'un ticket",
    user,
    `/ticket`
  );

  return newTicketMessage;
}

function createTicketButton() {
  const closeTicket = new ButtonBuilder()
    .setCustomId("ticketDelete")
    .setLabel(`${xMark} Suppression du ticket`)
    .setStyle(ButtonStyle.Danger);

  const row: any = new ActionRowBuilder().addComponents(closeTicket);

  return row;
}

async function actionTicketButton(
  newTicketMessage: Message,
  user: User,
  ticketChannel: TextChannel
) {
  try {
    const buttonAction = await newTicketMessage.awaitMessageComponent({
      time: 3_600_000,
    });

    if (buttonAction.customId === "ticketDelete") {
      sendDebug(`Suppression du ticket de ${user.tag}.`);

      sentry(
        buttonAction.user.client,
        "Ticket",
        `${whiteCheckMark} Suppression d'un ticket (${ticketChannel.name})`,
        buttonAction.user
      );

      deleteTicketChannelText(ticketChannel, user);

      return;
    }
  } catch (e) {
    sendError(`Une erreur est survenur sur les actions des tickets (${e}).`);
  }
}
