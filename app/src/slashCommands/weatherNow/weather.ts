import { SlashCommandBuilder, Colors, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../../types";
import { sentry } from "../../manager/sentry";
import { getFormattedTime } from "../../manager/timeManager";
import {
  arrowDownMark,
  arrowUpMark,
  weatherHumidity,
  weatherMark,
  weatherPressure,
  weatherSunrise,
  weatherSunset,
  weatherTermostat,
  weatherWind,
  xMark,
} from "../../manager/enum/icon";
import { isConfigure } from "../../manager/configurationManager";

export const command: SlashCommand = {
  name: "weather",
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Visualisez la météo")
    .addStringOption((option) =>
      option.setName("city").setDescription("La ville").setRequired(false)
    ),
  execute: async (interaction) => {
    let city = process.env.WEATHER_DEFAULT_CITY;

    if (null != interaction.options.get("city")) {
      city = interaction.options.get("city").value.toString();
    }

    if (city == null || city == "") {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${xMark} Météo`)
            .setDescription(`Vous devez spécifier une ville.`)
            .setColor(Colors.Red),
        ],
        ephemeral: true,
      });

      sentry(
        interaction.client,
        "Weather",
        "La ville n'est pas définie",
        interaction.user,
        `/weather city:${city}`
      );
      return;
    }

    if (!isConfigure(process.env.OPEN_WEATHER_API)) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${xMark} Météo`)
            .setDescription(
              `Une erreur est survenue, merci de réessayer plus tard.`
            )
            .setColor(Colors.Red),
        ],
        ephemeral: true,
      });

      sentry(
        interaction.client,
        "Weather",
        "La clé d'API OpenWeatherMap n'est pas définie",
        interaction.user,
        `/weather city:${city}`
      );
      return;
    }

    const openWeatherMapApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API}&lang=fr`;

    let response;

    fetch(openWeatherMapApiUrl).then((response) => {
      response.json().then((data) => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`${weatherMark} Météo: ${data.name}`)
              .setThumbnail(
                `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
              )
              .addFields([
                {
                  name: "**Température**",
                  value: `${weatherTermostat} ${data.main.temp}°C\n${arrowUpMark} ${data.main.temp_max}°C\n${arrowDownMark} ${data.main.temp_min}°C`,
                  inline: true,
                },
                {
                  name: "**Informations**",
                  value: `${weatherWind} ${data.wind.speed}km/h\n${weatherHumidity} ${data.main.humidity}%\n${weatherPressure} ${data.main.pressure}hPa`,
                  inline: true,
                },
                {
                  name: "**Ephéméride**",
                  value: `${weatherSunrise} ${getFormattedTime(
                    data.sys.sunrise
                  )}\n${weatherSunset} ${getFormattedTime(data.sys.sunset)}`,
                  inline: true,
                },
              ]),
          ],
        });
      });
    });
  },
};
