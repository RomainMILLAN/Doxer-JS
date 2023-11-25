"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const sentry_1 = require("../../manager/sentry");
const embedBuilder_1 = require("../../manager/embedBuilder");
const timeManager_1 = require("../../manager/timeManager");
exports.command = {
    name: "weather",
    data: new discord_js_1.SlashCommandBuilder()
        .setName("weather")
        .setDescription("Visualisez la météo")
        .setDMPermission(true)
        .addStringOption(option => option
        .setName('city')
        .setDescription('La ville')
        .setRequired(false)),
    execute: async (interaction) => {
        let city = process.env.WEATHER_DEFAULT_CITY;
        if (null != interaction.options.get('city')) {
            city = interaction.options.get('city').value.toString();
        }
        if ('' == process.env.OPEN_WEATHER_API) {
            interaction.reply({
                embeds: [
                    (0, embedBuilder_1.errorBuilder)('Weather', 'Une erreur est survenue, merci d\'en informer le staff')
                ],
                ephemeral: true,
            });
            (0, sentry_1.sentry)(interaction.client, 'Weather/Weather', 'La clé d\'API OpenWeatherMap n\'est pas définie', interaction.user, `/weather city:${city}`);
        }
        const openWeatherMapApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=celsus&appid=${process.env.OPEN_WEATHER_API}&lang=fr`;
        let response;
        fetch(openWeatherMapApiUrl)
            .then((response) => {
            response.json()
                .then((data) => {
                interaction.reply({
                    embeds: [
                        new discord_js_1.EmbedBuilder()
                            .setTitle(`⛅️ Météo: ${data.name}`)
                            .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                            .addFields([
                            {
                                name: '**Température**',
                                value: `🌡 ${data.main.temp}°C\n▲ ${data.main.temp_max}°C\n▼ ${data.main.temp_min}°C`,
                                inline: true,
                            },
                            {
                                name: '**Informations**',
                                value: `🌬 ${data.wind.speed}km/h\n🫧 ${data.main.humidity}%\n🎚 ${data.main.pressure}hPa`,
                                inline: true,
                            },
                            {
                                name: '**Ephéméride**',
                                value: `🌖 ${(0, timeManager_1.getFormattedTime)(data.sys.sunrise)}\n🌒 ${(0, timeManager_1.getFormattedTime)(data.sys.sunset)}`,
                                inline: true,
                            },
                        ])
                    ]
                });
            });
        });
    }
};
