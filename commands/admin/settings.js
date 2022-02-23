const Discord = require('discord.js');
exports.run = async (client, message, args, con) => {

    try {

        if(message.channel.type === 'dm') return message.channel.send(`Please only run commands in a Discord server.`).then(msg => {
            msg.delete({ timeout: 12000 })
        }).catch(e => {});
        
        if(!message.guild) return message.channel.send('Erroring finding this messages guild.');

        message.delete().catch(e => {});
        var gmessage;
        gmessage = message;

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You are missing the permission(s) \`ADMINISTRATOR\`.`).catch(e => {});

        await con.query(`SELECT * FROM guilds WHERE guildid='${message.guild.id}'`, async (err, row) => {
            let flip = row[0];
            await con.query(`SELECT * FROM loggingchannels WHERE guildid='${flip.guildid}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    let embed = new Discord.MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`Guild Settings:`)
                    .setURL(`https://hyperz.dev/`)
                    .setDescription(`✅ All settings are up to date.\n\n**You can review your current guild settings below!**`)
                    .addFields(
                        { name: `Logging`, value: `true`, inline: true },
                        { name: `Log Channel`, value: `<#${row[0].channelid}>`, inline: true },
                        { name: `Extra Logs`, value: `${flip.logall}`, inline: true },
                        { name: `Invite Blocker`, value: `${flip.inviteblocker}`, inline: true },
                        { name: `Auto-Bans`, value: `${flip.autobans}`, inline: true },
                        { name: `Auto-Unbans`, value: `${flip.autounbans}`, inline: true },
                        { name: `Alt Prevention`, value: `${flip.altprev}`, inline: true },
                        { name: `Alt Prevention Timer`, value: `${flip.altprevtimer}`, inline: true }
                    )
                    .setFooter(`Guild: ${message.guild.id} | ${gmessage.author.tag}`)
                    try { embed.setThumbnail(gmessage.author.avatarURL({ dynamic: true })) } catch(e) {}
                    message.channel.send(embed).catch(e => {
                        console.log(e)
                    });
                } else {
                    let embed = new Discord.MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setTitle(`Guild Settings:`)
                    .setURL(`https://hyperz.dev/`)
                    .setDescription(`✅ All settings are up to date.\n\n**You can review your current guild settings below!**`)
                    .addFields(
                        { name: `Logging`, value: `false`, inline: true },
                        { name: `Log Channel`, value: `N/A`, inline: true },
                        { name: `Extra Logs`, value: `false`, inline: true },
                        { name: `Invite Blocker`, value: `${flip.inviteblocker}`, inline: true },
                        { name: `Auto-Bans`, value: `${flip.autobans}`, inline: true },
                        { name: `Auto-Unbans`, value: `${flip.autounbans}`, inline: true },
                        { name: `Alt Prevention`, value: `${flip.altprev}`, inline: true },
                        { name: `Alt Prevention Timer`, value: `${flip.altprevtimer}`, inline: true }
                    )
                    .setFooter(`Guild: ${message.guild.id} | ${gmessage.author.tag}`)
                    try { embed.setThumbnail(gmessage.author.avatarURL({ dynamic: true })) } catch(e) {}
                    message.channel.send(embed).catch(e => {
                        console.log(e)
                    });
                }

            });
        });

    } catch(e) {}
}

exports.info = {
    name: "settings",
    description: "Shows the guilds current settings.",
    useAliases: false,
    aliases: []
}
