module.exports = async(client, con, guild) => {

    console.log(`I have left: ${guild.name}`)
    await con.query(`SELECT * FROM guilds WHERE guildid='${guild.id}'`, async (err, row) => {
        if (err) throw err;
        if(row[0]) {
            await con.query(`UPDATE guilds SET active='false' WHERE guildid='${guild.id}'`, async (err, row) => {
                if(err) throw err;
            });
        }
    });

}