const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const api = require('../api/api.js')
const mysql = require('mysql');
const chalk = require('chalk')
let con;

class HDClient extends Client {
    constructor(options = {}) {
        super(options);

        this.config = require(`../config`);
        this.utils = require(`./utils/utils`);

        this.commands = new Collection();
        this.aliases = new Collection();
        this.useSql = true;

    };
};

const client = new HDClient({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

global.__basedir = __dirname;

const version = Number(process.version.split('.')[0].replace('v', ''));
if (!version === 12 || !version > 12) return console.log('Please upgrade to Node v12 or higher');

const init = async() => {
    try {

        try {
            const stuff = {
                    connectionLimit: 10,
                    queueLimit: 5000,
                    host: client.config.database.host,
                    user: client.config.database.user,
                    password: client.config.database.password,
                    database: client.config.database.database,
                }
            con = mysql.createPool(stuff)
            con.on('enqueue', function () {
                if(client.config.debugmode) {
                    console.log(`${chalk.yellow('[SQL SERVER]')} Waiting for available connection slot`);
                }
            });
            con.on('release', function (connection) {
                if(client.config.debugmode) {
                    console.log(`${chalk.yellow('[SQL SERVER]')} Connection %d released`, connection.threadId);
                }
            });
            setTimeout(() => {
                console.log(`\n\n    ------ CONSOLE LOGGING BEGINS BELOW ------\n\n`)
                console.log('MySQL Successfully Connected')
                console.log("Bot started successfully"); // Allows for docker ready event
            }, 6300);
        } catch (e) {
            client.utils.error(client, e)
            return process.exit(1);
        }

        if(client.config.clientAPI.enabled) {
            setTimeout(() => {
                api.apistart(client, con)
            }, 4300);
        }

        // Command Handler
        const categories = readdirSync(join(__dirname, `../`, `commands`));
        for (let category of categories) {
            const commands = readdirSync(join(__dirname, `../`, `commands/`, category));
            for (let command of commands) {
                let info = require(`../commands/${category}/${command}`);
                if (info.info.name) {
                    client.commands.set(info.info.name, info);
                } else {
                    console.log(`No help name or additional info found for ${command}`);
                    continue;
                }
                if (info.info.useAliases) {
                    try {
                        info.info.aliases.forEach(a => {
                            client.commands.set(a, info);
                        })
                    } catch(e) {
                        console.log(`An error occured when adding aliases for ${command}`);
                        continue;
                    }
                }
            }
        };

        // Event handler
        const events = readdirSync(join(__dirname, `../`, `events`));
        events.forEach(e => {
            const name = e.split('.')[0];
            const event = require(`../events/${e}`);
            client.on(name, event.bind(null, client, con));
            delete require.cache[require.resolve(`../events/${e}`)];
        });

    client.login(client.config.token).catch(e => console.log(e));
    } catch(e) {
        console.log(e)
    }
}

process.on('unhandledRejection', (err) => console.log(err))

exports.init = init;
