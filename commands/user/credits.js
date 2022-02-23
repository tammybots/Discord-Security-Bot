const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args, con) => {

    if(message.channel.type === 'dm') return message.channel.send(`Please only run commands in a Discord server.`).then(msg => {
        msg.delete({ timeout: 12000 })
    }).catch(e => {});

    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setColor(client.config.colorhex)
    .setDescription(`Created originally by [@Hyperz](https://hyperz.net)\n**Buy A Ban Database**\n[Hyperz Ban Database](https://hyperz.net/store/ban-database)`)
    message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
    message.delete().catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });

}

exports.info = {
    name: "credits",
    description: "View the credits for this bot!",
    useAliases: true,
    aliases: ['creator', 'hyperz']
}
