const Discord = require('discord.js');
const ms = require('ms')
exports.run = async (client, message, args, con) => {

    try {

        if(message.channel.type === 'dm') return message.channel.send(`Please only run commands in a Discord server.`).then(msg => {
            msg.delete({ timeout: 12000 })
        }).catch(e => {});

        message.delete().catch(e => {});
        var gmessage;
        gmessage = message;

        await con.query(`SELECT * FROM staff WHERE userid='${message.author.id}'`, async (err, row) => {
            if(err) throw err;
            if(!row[0]) {
                return message.channel.send(`You don't have permission to use that command.`);
            } else {


        const filter = m => m.author.id === message.author.id;

        const starter = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please provide the User ID of the user you wish to blacklist**\nEx. 704094587836301392`)

        const prompt1 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please provide the reason you wish to blacklist this user with.**`)

        const prompt2 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please send an image link as proof of this users offenses.**`)

        const prompt3 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please provide any notes on the situation if you have any.**`)

        try {
        message.channel.send(starter).then(async message => {
            message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
            .then(async collected => {
                
                let content1;
                content1 = collected.first().content

                await con.query(`SELECT * FROM blacklistedusers WHERE userid='${content1}'`, async (err, row) => {
                    if(err) throw err;
                    if(row[0]) {
                        return message.channel.send(`That user is already blacklisted.`);
                    } else {

                message.channel.send(prompt1).then(async message => {
                    message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                    .then(async collected => {
                        
                        let content2;
                        content2 = collected.first().content
        
                        message.channel.send(prompt2).then(async message => {
                            message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                            .then(async collected => {
                                
                                let content3;
                                content3 = collected.first().content
                
                                message.channel.send(prompt3).then(async message => {
                                    message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
                                    .then(async collected => {
                                        
                                        let content4;
                                        content4 = collected.first().content

                                        let image;
                                        try {
                                            image = content3
                                        } catch (e) {
                                            image = `${client.config.defaultimage}`
                                        }

                                        const moment = require('moment');
                                        let datetime = moment().format(client.config.date_format);

                                        await con.query(`INSERT INTO blacklistedusers (userid, caseid, reason, proof, notes) VALUES ('${content1}', 'cs', "${content2}", '${image}', "${content4}")`, async (err, row) => {
                                            if(err) throw err;
                                            await con.query(`SELECT count(caseid) as total FROM cases`, async (errol, rowol) => {
                                                let banid = rowol[0].total + 1
                                                let atag = gmessage.author.tag.replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                                                let test = await client.users.fetch(content1)
						if(!test) return message.channel.send('That user does not exist.');
						await con.query(`SELECT * FROM blacklistedusers WHERE userid='${content1}'`, async (err, row) => {
							if(err) throw err;
							if(row[0]) {
								return message.channel.send(`That user ID is already banned.`);
							}
						});
                                                let founduser = test.tag.replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                                                await con.query(`INSERT INTO cases (caseid, caseuserid, caseusertag, casereason, enforcertag, enforcerid) VALUES ('${banid}', '${content1}', '${founduser}', "${content2}", '${atag}', '${gmessage.author.id}')`, async (err, row) => {
                                                    if(err) throw err;
                                                    await con.query(`UPDATE blacklistedusers SET caseid='${banid}' WHERE userid='${content1}'`, async (err, row) => {
                                                        if(err) throw err;
                                                        const thecase = new Discord.MessageEmbed()
                                                        .setColor(client.config.colorhex)
                                                        .setTitle(`Blacklisted!`)
                                                        .setDescription(`**${founduser}** was successfully blacklisted!\n**Reason:** ${content2}`)
                                                        .setTimestamp()
                                                        .setFooter(`${client.config.copyright}`)
                                                        try {
                                                            thecase.setImage(image)
                                                        } catch(e) {
                                                            await con.query(`UPDATE blacklistedusers SET proof='${client.config.defaultimage}'`, async (err, row) => {
                                                                if(err) throw err;
                                                            });
                                                            thecase.setImage(client.config.defaultimage)
                                                        }
                                                        message.channel.send(thecase).then(msg => {
                                                            msg.delete({ timeout: 14000 })
                                                        });

                                                            // Logging the stuffs
                                                            let enfmember = content1;
                                                            let enfreason = content2;
                                                            let mails = new Discord.MessageEmbed()
                                                            .setColor(client.config.colorhex)
                                                            .setTitle(`Blacklisted!`)
                                                            .setDescription(`**Member:** ${founduser} - (${content1})\n**Reason:** ${content2}\n**Case #:** ${banid}\n**Severity:** Medium\n**Date / Time:** ${datetime}`)
                                                            .setTimestamp()
                                                            .setFooter(`${client.config.copyright}`);
                                                            try {
                                                                mails.setImage(image)
                                                            } catch(e) {
                                                                mails.setImage(client.config.defaultimage)
                                                            }
                                                            client.utils.enforcer(client, con, 'blacklist', enfmember, enfreason, mails)

                                                            let notice = new Discord.MessageEmbed()
                                                            .setColor(client.config.colorhex)
                                                            .setThumbnail(client.user.avatarURL({ dynamic: true }))
                                                            .setTitle(`Blacklisted User Notice!`)
                                                            .setDescription(`**Case #:** ${banid}\n**User:** ${founded} - (${content1})\n**Type:** \`Blacklisted\`\n**Reason:** ${content2}`)
                                                            .setFooter(`You are recieving this notice as we detected they are in your server.`)
                                                            try {
                                                                notice.setImage(image)
                                                            } catch(e) {
                                                                notice.setImage(client.config.defaultimage)
                                                            }
                                                            await con.query(`SELECT * FROM guilds WHERE active='true' AND logall='false'`, async (err, rows) => {
                                                                if(err) throw err;
                                                                if(rows[0]) {
                                                                    rows.forEach(async r => {
                                                                        try {
                                                                            let deGuild = await client.guilds.cache.get(r.guildid)
                                                                            let member = await deGuild.members.fetch(content1)
                                                                            if(member) {
                                                                                await con.query(`SELECT * FROM loggingchannels WHERE guildid='${r.guildid}'`, async (err, row) => {
                                                                                    if(err) throw err;
                                                                                    if(row[0]) {
                                                                                        let logchan = await client.channels.cache.get(row[0].channelid)
                                                                                        if(logchan !== undefined) {
                                                                                            await logchan.send(notice).catch(e => {})
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        } catch(e) {}
                                                                    });
                                                                }
                                                            });

                                                            const flipembed = new Discord.MessageEmbed()
                                                            .setColor(`${client.config.colorhex}`)
                                                            .setTitle(`You Were Blacklisted!`)
                                                            .setDescription(`**Reason:** ${content2}\n\n**You can appeal this blacklist [here](${client.config.supportServerInvite})**`)
                                                            .setThumbnail(`${client.user.displayAvatarURL()}`)
                                                            .setTimestamp()
                                                            .setFooter(`${client.config.copyright}`)
                                                            try {
                                                                flipembed.setImage(image)
                                                            } catch(e) {
                                                                flipembed.setImage(client.config.defaultimage)
                                                            }
                                                            try {
                                                                const founduser = client.users.cache.get(content1)
                                                                founduser.send(flipembed)
                                                            } catch (e) {
                                                                if (client.config.debugmode) return console.log(e);
                                                            }

                                                    });
                                                });
                                            });
                                        });
                        
                                    }).catch(e => {});
                                }).catch(e => {if(client.config.debugmode) return console.log(e);});
                
                            }).catch(e => {});
                        }).catch(e => {if(client.config.debugmode) return console.log(e);});
        
                    }).catch(e => {});
                }).catch(e => {if(client.config.debugmode) return console.log(e);});
            }
        });
            }).catch(e => {});
        }).catch(e => {if(client.config.debugmode) return console.log(e);});

    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }
        }
    });
    } catch(e) {
        if(client.config.debugmode) return console.log(e);
    }

}

exports.info = {
    name: "blacklist",
    description: "Blacklist a user via the bot (owners only).",
    useAliases: false,
    aliases: []
}
