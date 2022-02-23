const Discord = require('discord.js');
const ms = require('ms')
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

        const filter = m => m.author.id === message.author.id;

        const starter = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**What channel would you like logs to be posted too?**\nUse \`na\` to disable logging.`)

        const prompt0 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Would you like for bans and blacklists to be logged?**\nUse \`yes\` or \`no\`.`)

        const prompt1 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Would you like users to be auto-unbanned when their appeals are approved?**\nUse \`yes\` or \`no\`.`)

        const prompt2 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Would you like users to be automatically banned if they are banned in the bot?**\nIf disabled a warning message will be sent to your logs channel. Use \`yes\` or \`no\`.`)

        const prompt3 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Would you like ${client.user.username} to stop Discord Invites from being posted in channels?**\nUse \`yes\` or \`no\`.`)

        const prompt4 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Would you like ${client.user.username} to stop Alternate Accounts from joining your server?**\nUse \`yes\` or \`no\`.`)

        const prompt42 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please define a time limit for alt accounts to be created by before they get removed.**\nI.e \`30d\` for 30 days.`)

        const lastprompt = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Server Settings Successfully Updated!**`)

        try {
        message.channel.send(starter).then(async message => {
            message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
            .then(async collected => {
                
                let content1;
                if(collected.first().content.toLowerCase() === 'na') {
                    content1 = 'none'
                } else if(collected.first().mentions.channels.first()) {
                    content1 = collected.first().mentions.channels.first().id
                } else if(!isNaN(collected.first().content)) {
                    let channelfinder = await message.guild.channels.cache.find(c => c.id === collected.first().content)
                    if(channelfinder == undefined) return message.channel.send(`**Setup Cancelled.** You provided an invalid channel id.`);
                    content1 = channelfinder.id
                } else {
                    let channelfinder = await message.guild.channels.cache.find(c => c.name === collected.first().content)
                    if(channelfinder == undefined) return message.channel.send(`**Setup Cancelled.** You provided an invalid channel name.`);
                    content1 = channelfinder.id
                }

                message.channel.send(prompt0).then(async message => {
                    message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                    .then(async collected => {

                        let content2;
                        let req = collected.first().content.toLowerCase()
                        if(req === 'yes') {
                            content2 = 'true';
                        } else if(req === 'no') {
                            content2 = 'false';
                        } else {
                            message.channel.send(`**Invalid Answer Submitted.** Set to \`false\` by default.`)
                            content2 = 'false';
                        }

                    message.channel.send(prompt1).then(async message => {
                        message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                        .then(async collected => {
                            
                            let content3;
                            let req = collected.first().content.toLowerCase()
                            if(req === 'yes') {
                                content3 = 'true';
                            } else if(req === 'no') {
                                content3 = 'false';
                            } else {
                                message.channel.send(`**Invalid Answer Submitted.** Set to \`false\` by default.`)
                                content3 = 'false';
                            }
            
                            message.channel.send(prompt2).then(async message => {
                                message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                                .then(async collected => {
                                    
                                    let content4;
                                    let req = collected.first().content.toLowerCase()
                                    if(req === 'yes') {
                                        content4 = 'true';
                                    } else if(req === 'no') {
                                        content4 = 'false';
                                    } else {
                                        message.channel.send(`**Invalid Answer Submitted.** Set to \`false\` by default.`)
                                        content4 = 'false';
                                    }
                    
                                    message.channel.send(prompt3).then(async message => {
                                        message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                                        .then(async collected => {
                                            
                                            let content5;
                                            let req = collected.first().content.toLowerCase()
                                            if(req === 'yes') {
                                                content5 = 'true';
                                            } else if(req === 'no') {
                                                content5 = 'false';
                                            } else {
                                                message.channel.send(`**Invalid Answer Submitted.** Set to \`false\` by default.`)
                                                content5 = 'false';
                                            }
                            
                                            message.channel.send(prompt4).then(async message => {
                                                message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                                                .then(async collected => {
                                                    
                                                    let req = collected.first().content.toLowerCase()
                                                    if(req === 'yes') {
                                                        let content6 = 'true';
                                                        message.channel.send(prompt42).then(async message => {
                                                            message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                                                            .then(async collected => {
                                                                
                                                                let content7 = collected.first().content.toLowerCase()
                                            
                                                                message.channel.send(lastprompt).catch(e => {});
                                                
                                                                builder(client, con, message, Discord, gmessage, content1, content2, content3, content4, content5, content6, content7)

                                                            }).catch(e => {});
                                                        }).catch(e => {if(client.config.debugmode) return console.log(e);});
                                                    } else if(req === 'no') {
                                                        let content6 = 'false';
                                                        let content7 = 'none';
                                                        builder(client, con, message, Discord, gmessage, content1, content2, content3, content4, content5, content6, content7)
                                                        message.channel.send(lastprompt).catch(e => {});
                                                    } else {
                                                        message.channel.send(`**Invalid Answer Submitted.** Set to \`false\` by default.`)
                                                        let content6 = 'false';
                                                        let content7 = 'none';
                                                        builder(client, con, message, Discord, gmessage, content1, content2, content3, content4, content5, content6, content7)
                                                        message.channel.send(lastprompt).catch(e => {});
                                                    }
                                    
                                                    
                                    
                                                }).catch(e => {});
                                            }).catch(e => {if(client.config.debugmode) return console.log(e);});
                            
                                        }).catch(e => {});
                                    }).catch(e => {if(client.config.debugmode) return console.log(e);});
                    
                                }).catch(e => {});
                            }).catch(e => {if(client.config.debugmode) return console.log(e);});
            
                        }).catch(e => {});
                    }).catch(e => {if(client.config.debugmode) return console.log(e);});

                }).catch(e => {});
            }).catch(e => {if(client.config.debugmode) return console.log(e);});

            }).catch(e => {});
        }).catch(e => {if(client.config.debugmode) return console.log(e);});

    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }

    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }

}

exports.info = {
    name: "setup",
    description: "Setup your guild or update your guilds settings.",
    useAliases: false,
    aliases: []
}

async function builder(client, con, message, Discord, gmessage, content1, content2, content3, content4, content5, content6, content7) {
    if(content1 != 'none') {
        await con.query(`SELECT * FROM loggingchannels WHERE guildid='${message.guild.id}'`, async (err, row) => {
            if(err) throw err;
            if(!row[0]) {
                await con.query(`INSERT INTO loggingchannels (guildid, channelid, enforcerid, type) VALUES ('${message.guild.id}', '${content1}', '${gmessage.author.id}', '1')`, async (err, row) => {
                    if(err) throw err;
                });
            } else {
                await con.query(`UPDATE loggingchannels SET channelid='${content1}', enforcerid='${message.author.id}' WHERE guildid='${message.guild.id}'`, async (err, row) => {
                    if(err) throw err;
                });
            }
        });
        await con.query(`UPDATE guilds SET logall='${content2}', autounbans='${content3}', autobans='${content4}', inviteblocker='${content5}', altprev='${content6}', altprevtimer='${content7}' WHERE guildid='${message.guild.id}'`, async(err, row) => {
            if(err) throw err;
        });
        let embed = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(`Settings Updated:`)
        .setURL(`https://hyperz.dev/`)
        .setDescription(`✅ All settings have been updated.\n\n**You can review your new guild settings below!**`)
        .addFields(
            { name: `Logging`, value: `true`, inline: true },
            { name: `Log Channel`, value: `<#${content1}>`, inline: true },
            { name: `Extra Logs`, value: `${content2}`, inline: true },
            { name: `Invite Blocker`, value: `${content5}`, inline: true },
            { name: `Auto-Bans`, value: `${content4}`, inline: true },
            { name: `Auto-Unbans`, value: `${content3}`, inline: true },
            { name: `Alt Prevention`, value: `${content6}`, inline: true },
            { name: `Alt Prevention Timer`, value: `${content7}`, inline: true }
        )
        .setFooter(`Guild: ${message.guild.id} | ${gmessage.author.tag}`)
        try { embed.setThumbnail(gmessage.author.avatarURL({ dynamic: true })) } catch(e) {}
        message.channel.send(embed).catch(e => {
            console.log(e)
        });
        const newchan = await client.channels.cache.get(content1)
        newchan.send(embed).catch(e => {})
    } else {
        await con.query(`SELECT * FROM loggingchannels WHERE guildid='${message.guild.id}'`, async(err, row) => {
            if(err) throw err;
            if(row[0]) {
                await con.query(`DELETE FROM loggingchannels WHERE guildid='${message.guild.id}'`)
            }
        });
        await con.query(`UPDATE guilds SET logall='${content2}', autounbans='${content3}', autobans='${content4}', inviteblocker='${content5}', altprev='${content6}', altprevtimer='${content7}' WHERE guildid='${message.guild.id}'`, async(err, row) => {
            if(err) throw err;
        });
        let embed = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(`Settings Updated:`)
        .setURL(`https://hyperz.dev/`)
        .setDescription(`✅ All settings have been updated.\n\n**You can review your new guild settings below!**`)
        .addFields(
            { name: `Logging`, value: `false`, inline: true },
            { name: `Log Channel`, value: `${content1}`, inline: true },
            { name: `Extra Logs`, value: `${content2}`, inline: true },
            { name: `Invite Blocker`, value: `${content5}`, inline: true },
            { name: `Auto-Bans`, value: `${content4}`, inline: true },
            { name: `Auto-Unbans`, value: `${content3}`, inline: true },
            { name: `Alt Prevention`, value: `${content6}`, inline: true },
            { name: `Alt Prevention Timer`, value: `${content7}`, inline: true }
        )
        .setFooter(`Guild: ${message.guild.id} | ${gmessage.author.tag}`)
        try { embed.setThumbnail(gmessage.author.avatarURL({ dynamic: true })) } catch(e) {}
        message.channel.send(embed).catch(e => {
            console.log(e)
        });
    }
};
