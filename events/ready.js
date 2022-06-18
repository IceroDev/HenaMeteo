module.exports = (client) => {
  const Discord = require("discord.js");
  var weather = require('weather-js');

  console.log(`Je suis connecté et prêt à servir `+client.guilds.cache.size +" serveurs et "+client.users.cache.size+" utilisateurs");
  client.channels.cache
    .get("987510243439304795")
    .messages.fetch("987511323933962250")
    .then((m) => {
      setInterval(async () => {
        weather.find({search: 'Namur, BE', degreeType: 'C'}, function(err, result) {
          data = JSON.stringify(result, null, 2)
          if(err) console.log(err);
          var embed = new Discord.MessageEmbed()
          .setTitle("Météo Namur")
          .setDescription(
            "🌡️ Température actuelle: " + result[0].current.temperature + "°C\n" +
            "☁️ Vents actuel: " + result[0].current.windspeed + "\n" +
            "💧 Humidité actuelle: " + result[0].current.humidity + "%\n\n\n" +
            "**__Prévisions__ :**\n" +
            "**Aujourd'hui :**\n"+
            "🌡️ Température min: " + result[0].forecast[1].low + "°C\n" +
            "🌡️ Température max: " + result[0].forecast[1].high + "°C\n" +
            "💧 Risque précipitations: " + result[0].forecast[1].precip + "%\n\n" +
            "**Demain :**\n"+
            "🌡️ Température min: " + result[0].forecast[2].low + "°C\n" +
            "🌡️ Température max: " + result[0].forecast[2].high + "°C\n" +
            "💧 Risque précipitations: " + result[0].forecast[2].precip + "%\n\n" +
            "**Après-demain :**\n"+
            "🌡️ Température min: " + result[0].forecast[3].low + "°C\n" +
            "🌡️ Température max: " + result[0].forecast[3].high + "°C\n"+
            "💧 Risque précipitations: " + result[0].forecast[1].precip + "%\n" 
          )
          .setColor("2f3136")
          .setThumbnail(result[0].current.imageUrl)
          .setFooter("Dernière actualisation des données ")
          .setTimestamp();
          m.edit(embed);
        });
      },300000);
    })
}
