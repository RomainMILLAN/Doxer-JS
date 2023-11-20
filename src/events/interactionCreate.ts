import { Events, Interaction } from "discord.js";
import { BotEvent } from "../../types";

const event: BotEvent = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        if(!interaction.isChatInputCommand()) { return; }

        const command = interaction.client.slashCommands.get(interaction.commandName)

        if(!command) { return; }

        await command.execute(interaction);
    }
}

export default event;