const client = require('../../niyuki')
const config = require('../../setting.json')
const gamelogSchema = require("../../models/presencelog")
client.on('presenceUpdate', async(oldMember, newMember) => {
    await gamelogSchema.findOne({ guild: newMember.guild.id }, async (err, data) => {
    if(data) {
    let channel = newMember.guild.channels.cache.find(x => x.id === data.channel)      
    var newGame = newMember.activities.length ?newMember.activities.filter(x=>x.type === "PLAYING") : null;
    var oldGame = oldMember.activities.length ?oldMember.activities.filter(x=>x.type === "PLAYING") : null;
    
    let start = await client.translate('Started playing this game :');
    let stop = await client.translate('stopped playing this game :');
    channel.send(`**${newMember.user.tag}** ${newGame && newGame.length ? start : stop} **${newGame && newGame.length ? `${newGame[0].name} ${config.startemoji}` :`${oldGame[0].name} ${config.stopemoji}`}**`)

    }
    if(!data) {
    let channel = newMember.guild.channels.cache.find(x => x.id === config.gamelog);
    var newGame = newMember.activities.length ?newMember.activities.filter(x=>x.type === "PLAYING") : null;
    var oldGame = oldMember.activities.length ?oldMember.activities.filter(x=>x.type === "PLAYING") : null;
    
    let start = await client.translate('Started playing this game :');
    let stop = await client.translate('stopped playing this game :');
    channel.send(`**${newMember.user.tag}** ${newGame && newGame.length ? start : stop} **${newGame && newGame.length ? `${newGame[0].name} ${config.startemoji}` :`${oldGame[0].name} ${config.stopemoji}`}**`)}
    })
});