const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../setting.json');
const util = require('util');

module.exports = {
    name: 'eval',
    aliases: ['e'],
    category: 'Developers',
    description: 'Runs javascript as the discord bot client.',
    run: async (client, message, args) => {
        let code = args.join(' ');
        const embed = new Discord.MessageEmbed();
        if (message.content === `${config.prefix}eval 9+10`)
            return message.channel.send('21, You stupid');
            let array = config.owner
  
            if(!array.includes(message.author.id.toString())) {
              return message.channel.send("Only people who are worthy enough can use it ")
            }

        if (!code) {
            return message.reply(
                new MessageEmbed()
                    .setTitle('Error Usage')
                    .setDescription(`Usage: ${client.prefix}eval <code>`)
            );
        }

        try {
            let evaled = await eval(code),
                output;
            if (evaled.constructor.name === `Promise`) {
                output = `📤 Output (Promise)`;
            } else {
                output = `📤 Output`;
            }
            if (evaled.length > 800) {
                evaled = evaled.substring(0, 800) + `...`;
            }
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(output, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor('WHITE')
                .addField(`Status`, `Success`);
            return message.channel.send(embed);
        } catch (e) {
            console.log(e.stack);
            embed
                .addField(`📥 Input`, `\`\`\`\n${code}\n\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${e}\n\`\`\``)
                .addField(`Status`, `Failed`)
                .setColor('WHITE');
            return message.channel.send(embed);
        }
    }
};