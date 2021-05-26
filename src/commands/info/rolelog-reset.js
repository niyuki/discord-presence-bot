const { MessageEmbed } = require("discord.js");
const Schema = require("../../models/rolelog");
const { confirmation } = require("reconlx")

module.exports = {
    name: 'role-reset',
    aliases: ['rl-reset','reset-rl'],
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(new MessageEmbed().setTitle("Wtf?").setColor('#4a0000').setFooter('🔥 Niyuki On Fire 🔥').setDescription(await client.translate("You don't even have \`Manage Guild\` permission", message)))
        message.channel.send(new MessageEmbed().setTitle(await client.translate("Are you sure you want to reset Role-Log from your server?", message)).setColor('#fff5ee').setFooter('🔥 Niyuki On Fire 🔥')
        .setDescription(await client.translate("  if you want to remove the data please Click on ✅ or ❌ if you want to keep it", message))).then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ["✅", '❌'], 30000);
            if(emoji === '✅') {
                Schema.findOne({ guild: message.guild.id}, async(err, data) => {
                    if(data) data.delete();
                    if(!data) return msg.edit(new MessageEmbed().setTitle("Wtf?").setColor('#4a0000').setFooter('🔥 Niyuki On Fire 🔥').setDescription(await client.translate("You don't even have data..", message)));
                    await msg.edit(new MessageEmbed().setTitle(await client.translate("Succesfully", message)).setColor('#0dfa3b').setFooter('🔥 Niyuki On Fire 🔥').setDescription(await client.translate("**Removed your data from database!**", message)))
                });
            }
            if(emoji === '❌') {
                msg.edit(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, })).setDescription(await client.translate(`❌\n\n Request has been cancelled!`, message)).setColor('#4a0000').setFooter('🔥 Niyuki On Fire 🔥')).then(x => x.delete({timeout: 7000}))
            }
        })    
    }
}