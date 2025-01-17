const { join } = require('path');
const { MersenneTwister19937, integer } = require('random-js');
const { validate, parse } = require(join(__dirname, '..', '..', '..', 'Utils', 'types', 'user.js'));
const texts = require(join(__dirname, '..', '..', '..', 'assets', 'json', 'coolness.json'));

module.exports = {
    name: 'coolness',
    aliases: ['cool'],
    description: 'Determines a user\'s coolness.',
    ownerOnly: false,
    userPermissions: ['SEND_MESSAGES'],
    clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    category: 'Random-Seed',
    usage: '[user]',
    run: async (client, message, [ user ], container) => {
        user = user || message.author.id;
        if (!validate(user, message)) return message.reply('Please provide a valid user.');
        user = parse(user, message);
        const authorUser = user.id === message.author.id;
        try {
            if (user.id === client.user.id) return message.reply('Me as in Tamako? I think I\'m the very best around here.');
            if (user.id === '397338324328775680') {
                if (authorUser) return message.reply('You\'re the best owner a bot could ask for! ❤');
                return message.reply('He is the best owner a bot could ask for! ❤');
            }
            if (user.id === '465721387093327882' ) return message.reply(`${user.username} is by far the coolest person ever! ❤`);
            const random = MersenneTwister19937.seed(user.id);
            const coolness = integer(0, texts.length - 1)(random);
            const embed = new container.Discord.MessageEmbed()
                .setAuthor('I think.....')
                .setDescription(`${authorUser ? 'You are' : `${user.username} is`} ${texts[coolness]}`)
                .setFooter({ text: `Random Responses | Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) });
            return message.reply({ embeds: [embed] });
        } catch(err) {
            return message.reply({ content: `Let my developer know in the support server https://discord.gg/dDnmY56 or using \`${container.Config.prefix[0]}feedback\` command`, embeds: [ 
                new container.Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Error')
                    .setDescription(`\`${err}\``)
                    .setFooter({ text: `Error Occured | Made by Bear#3437 | ©️ ${new Date().getFullYear()} Tamako`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })]
            });
        }  
        
    }
};

/**
 * @INFO
 * Bot Coded by Bear#3437 | https://github.com/bearts
 * @INFO
 * Tamako Tech | https://tamako.tech/
 * @INFO
 */
