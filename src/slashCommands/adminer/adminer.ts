import {
  EmbedBuilder,
  GuildMemberRoleManager,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { xMark, whiteCheckMark } from "../../manager/enum/icon";
import { SlashCommand } from "../../../types";
import { permErrorBuilder } from "../../manager/embedBuilder";
import sentry from "../../manager/sentry";

export const command: SlashCommand = {
  name: "adminer",
  data: new SlashCommandBuilder()
    .setName("adminer")
    .setDescription("Si tu ne sais pas à quoi sa sert, ne l'utilise pas")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  execute: async (interaction) => {
    const roleOpId = process.env.R_OP;

    if (false == (interaction.member.roles as GuildMemberRoleManager).cache.has(roleOpId)) {
        interaction.reply({
            embeds: [
                permErrorBuilder('OP')
            ],
            ephemeral: true,
        });

        sentry(
            interaction.client,
            'Adminer',
            xMark + ' Permission manquante',
            interaction.user,
            `/adminer`,
        )

        return;
    }

    var embed = new EmbedBuilder()
        .setTitle("⚙️ Informations administrateurs")
        .setDescription("Informatiion administrateur sur le bot.")
        .addFields(
            {
                name: "🔗 Code",
                value:
                "[Lien vers Github](https://github.com/RomainMILLAN/Doxer-JS)",
            },
            {
                name: "🧾 Ticket",
                value:
                "Pour toute demande de support, merci de créer un ticket [ici](https://romainmillan.fr/ticket)",
            },
        );

    
    if('' != process.env.RM_CLIENT_ID && '' != process.env.RM_PROJECT_ID) {
        embed
            .addFields(
                {
                    name: "🆔 Identifiant",
                    value: `${process.env.RM_CLIENT_ID}`,
                },
                {
                    name: "🤐 Mot de passe",
                    value: `${process.env.RM_PROJECT_ID}`,
                }
            );
    }

    interaction.reply({
      embeds: [
        embed,
      ],
      ephemeral: true,
    });
    
    sentry(
      interaction.client,
      'Adminer',
      whiteCheckMark + ' Visualisation des données administrateurs',
      interaction.user,
      `/admin`,
    )
  },
};
