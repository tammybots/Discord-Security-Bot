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
                return message.channel.send(`You don't have permission to use this command.`);
            } else {

        const filter = m => m.author.id === message.author.id;

        const starter = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please state the Users ID.**`)

        const prompt1 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please state the reason for the ban.**`)

        const prompt2 = new Discord.MessageEmbed()
        .setColor(client.config.colorhex)
        .setDescription(`**Please input an image link as evidence to backup the ban placed on this user.**`)

        try {
        message.channel.send(starter).then(async message => {
            message.channel.awaitMessages(filter, { max: 1, time: 1000000, errors: ['time'] })
            .then(async collected => {
                
                let content1;
                content1 = collected.first().content

                await con.query(`SELECT * FROM bannedusers WHERE userid='${content1}'`, async (err, row) => {
                    if(err) throw err;
                    if(row[0]) {
                        return message.channel.send(`That user is already banned.`);
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
                                        content3 = collected.first().content;
                                        let test = await client.users.fetch(content1)
                        if(!test) return message.channel.send('That user does not exist.');
                        await con.query(`SELECT * FROM bannedusers WHERE userid='${content1}'`, async (err, row) => {
                            if(err) throw err;
                            if(row[0]) {
                                return message.channel.send(`That user ID is already banned.`);
                            }
                        });
                                        let founded = test.tag.replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                                        let reason = content2
                                        let image;

                                        try {
                                            image = content3
                                        } catch (e) {
                                            image = `${client.config.defaultimage}`
                                        }
                                        let refinedReason = reason.split("[")[0].replace("'", "").replace("`", "").replace("\\", "").replace(";", "")

                                        const moment = require('moment');
                                        let datetime = moment().format(client.config.date_format);

                                    await con.query(`INSERT INTO bannedusers (userid, usertag, reason, proof, bandate) VALUES ('${content1}', "${founded}", '${refinedReason}', '${image}', '${datetime}')`, async(erro, rowo) => {
                                        await con.query(`SELECT count(caseid) as total FROM cases`, async (errol, rowol) => {
                                            let banid = rowol[0].total + 1
                                            let atag = gmessage.author.tag.replace("'", "").replace("`", "").replace("\\", "").replace(";", "")
                                            await con.query(`INSERT INTO cases (caseid, caseuserid, caseusertag, casereason, enforcerid, enforcertag) VALUES ('${banid}', '${content1}', "${founded}", '${refinedReason}', '${message.author.id}', "${atag}")`, async(erroll, rowoll) => {
                                                await con.query(`UPDATE bannedusers SET caseid='${banid}' WHERE userid='${content1}'`, async (errolll, rowolll) => {
                                                    if(errolll) throw errolll;
                                                    const thecase = new Discord.MessageEmbed()
                                                    .setColor(client.config.colorhex)
                                                    .setTitle(`Ban Added!`)
                                                    .setDescription(`**${founded}** was successfully banned!\n**Reason:** ${refinedReason}`)
                                                    .setTimestamp()
                                                    .setFooter(`${client.config.copyright}`)
                                                    try {
                                                        thecase.setImage(image)
                                                    } catch(e) {
                                                        await con.query(`UPDATE bannedusers SET proof='${client.config.defaultimage}'`, async (err, row) => {
                                                            if(err) throw err;
                                                        });
                                                        thecase.setImage(client.config.defaultimage)
                                                    }
                                                    message.channel.send(thecase).then(msg => {
                                                        msg.delete({ timeout: 14000 })
                                                    });

                                                    const flippers = new Discord.MessageEmbed()
                                                    .setColor(`${client.config.colorhex}`)
                                                    .setTitle(`You Were Banned!`)
                                                    .setDescription(`**Reason:** ${refinedReason}\n\n**You can appeal this ban [here](${client.config.supportServerInvite})**`)
                                                    .setThumbnail(`${client.user.displayAvatarURL()}`)
                                                    .setTimestamp()
                                                    .setFooter(`${client.config.copyright}`)
                                                    try {
                                                        flippers.setImage(image)
                                                    } catch(e) {
                                                        flippers.setImage(client.config.defaultimage)
                                                    }
                                                    try {
                                                        const founduser = client.users.cache.get(content1)
                                                        founduser.send(flippers)
                                                    } catch (e) {
                                                        if (client.config.debugmode) return console.log(e);
                                                    }

                                                    // The Enforcer Shit
                                                    let enfmember = content1;
                                                    let enfreason = content2;
                                                    let enfembed = new Discord.MessageEmbed()
                                                    .setColor(client.config.colorhex)
                                                    .setTitle(`Ban Hammer!`)
                                                    .setDescription(`**Member:** ${founded} - (${content1})\n**Reason:** ${content2}\n**Case #:** ${banid}\n**Severity:** High\n**Ban Date:** ${datetime}`)
                                                    .setTimestamp()
                                                    .setFooter(`${client.config.copyright}`);
                                                    try {
                                                        enfembed.setImage(image)
                                                    } catch(e) {
                                                        enfembed.setImage(client.config.defaultimage)
                                                    }
                                                    client.utils.enforcer(client, con, 'ban', enfmember, enfreason, enfembed)

                                                    let notice = new Discord.MessageEmbed()
                                                    .setColor(client.config.colorhex)
                                                    .setThumbnail(client.user.avatarURL({ dynamic: true }))
                                                    .setTitle(`Banned User Notice!`)
                                                    .setDescription(`**Case #:** ${banid}\n**User:** ${founded} - (${content1})\n**Type:** \`Banned\`\n**Reason:** ${content2}`)
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
                                                });
                                            });
                                        });
                                    });
                        
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
    name: "ban",
    description: "This is a command for the owner of the bot...",
    useAliases: false,
    aliases: []
}
