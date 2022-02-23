const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, con) => {

    if(message.channel.type === 'dm') return message.channel.send(`Please only run commands in a Discord server.`).then(msg => {
        msg.delete({ timeout: 12000 })
    }).catch(e => {});

    if(!args[0]) return message.channel.send(`**Please include a Case ID to search.**`).catch(e => {});

    await con.query(`SELECT * FROM cases WHERE caseid='${args[0]}'`, async(err, row) => {
        if(err) throw err;
        if(row[0]) {
            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(client.config.colorhex)
            .setDescription(`**Case ID:** ${row[0].caseid}\n**User:** ${row[0].caseusertag} - (${row[0].caseuserid})\n**Staff:** ${row[0].enforcertag} - (${row[0].enforcerid})\n**Reason:** ${row[0].casereason}`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        } else {
            let embed = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setDescription(`**No case ID was found for \`${args[0]}\`**`)
            message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        }
    });

}

exports.info = {
    name: "case",
    description: "Find a case by it's unique ID.",
    useAliases: true,
    aliases: ['searchcase']
}
