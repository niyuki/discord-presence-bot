const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../setting.json')
const Schema = require("../../models/presencelog");
const { confirmation } = require("reconlx");

module.exports = {
    name: 'gamelog',
    aliases: ['set-gamelog','set-gl'],
    description: 'Set Your Presence Log Channel to show what users are playing!',
    usage: `\`${config.prefix}gamelog <#channel/channel-id/channel-name>\``,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed().setTitle("Wtf?").setColor('#4a0000').setFooter('🔥 Niyuki On Fire 🔥').setDescription(await client.translate("You don't even have \`Manage Guild\` permission", message)))
        let newchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name === args.join(" "));
        if(!newchannel) return message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setColor('4a0000').setDescription(`${await client.translate(`❌\n\n To set up the new Role-Log you have to mention a channel or type it's`, message)} ID/Name \n\n Usage: \`${config.prefix}rolelog <#channel/channel-id/channel-name>\``).setFooter('🔥 Niyuki On Fire 🔥').setTimestamp())
        if(newchannel.id === config.rolelog) return message.channel.send((new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setColor('4a0000').setDescription(`${await client.translate(`❌\n\n The New Channel you wanted to enter is maybe already set as Role-Log.. Either you decide for a new channel or else leave me alone..Please.`, message)} \n\n Usage: \`${config.prefix}rolelog <#channel/channel-id/channel-name>\``).setFooter('🔥 Niyuki On Fire 🔥').setTimestamp()))
        Schema.findOne({ guild: message.guild.id}, async(err, data) => {
            if(data) {
                message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setDescription(await client.translate(`There is already a Game-Log saved. Do you want to change it?`, message)).setColor('#fff5ee').setFooter('🔥 Niyuki On Fire 🔥')).then(async (msg) => {
                    const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);
                    if(emoji === '✅') {
                        msg.edit(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setColor('0dfa3b').setDescription(`${await client.translate(`✅ \n\n New Game-Log has been set to`, message)} ${newchannel} by ${message.member}`).setFooter('🔥 Niyuki On Fire 🔥').setTimestamp())
                        data.delete()
                        new Schema({ 
                            guild: message.guild.id,
                            channel: newchannel.id
                        }).save();
                        
                    }
                    if(emoji === '❌') {
                        msg.edit(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setDescription(await client.translate(`❌\n\n Request has been cancelled!`, message)).setColor('#4a0000').setFooter('🔥 Niyuki On Fire 🔥')).then(x => x.delete({timeout: 7000}))
                    }
                });
            } 
            if(!data) {
                message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setColor('0dfa3b').setDescription(`${await client.translate(`✅ \n\n New Game-Log has been set to`, message)} ${newchannel} by ${message.member}`).setFooter('🔥 Niyuki On Fire 🔥').setTimestamp())
                new Schema({
                guild: message.guild.id,
                channel: newchannel.id,
            }).save();
            
        }        
        })
    }
}
