const client = require('../../niyuki')
const config = require('../../setting.json')
const rolelogSchema = require("../../models/rolelog")

client.on('presenceUpdate', async(oldMember, newMember) => {
  await rolelogSchema.findOne({ guild: newMember.guild.id }, async (err, data) => {
    if(data) {
      let channel = newMember.guild.channels.cache.find(x => x.id === data.channel)      
      var newGame = newMember.activities.length ?newMember.activities.filter(x=>x.type === "PLAYING") : null;
    var oldGame = oldMember.activities.length ?oldMember.activities.filter(x=>x.type === "PLAYING") : null;

    let game = newGame && newGame.length ? `${newGame[0].name}` : `${oldGame[0].name}`
    const playingRole = newMember.guild.roles.cache.find(role => role.name === game );
    
    let add = await client.translate('role added to this user:');
    let remove = await client.translate('role removed from this user:');

    if(newGame && newGame.length){
      newMember.guild.members.cache.get(newMember.user.id).roles.add(playingRole)
        .then(() => channel.send(`${newGame && newGame.length ? `**${playingRole.name}** ${add} **${newMember.user.tag}** ✅` : `**${playingRole.name}** ${remove} **${newMember.user.tag}** ❌`}`))
        .catch(console.error);

    } else if(oldGame && oldGame.length){
      newMember.guild.members.cache.get(newMember.user.id).roles.remove(playingRole)
        .then(() => channel.send(`${newGame && newGame.length ? `**${playingRole.name}** ${add} **${newMember.user.tag}** ✅` : `**${playingRole.name}** ${remove} **${newMember.user.tag}** ❌`}`))
        .catch(console.error);
    }
    }
    if(!data) {let channel = newMember.guild.channels.cache.find(x => x.id === config.rolelog);
    var newGame = newMember.activities.length ?newMember.activities.filter(x=>x.type === "PLAYING") : null;
    var oldGame = oldMember.activities.length ?oldMember.activities.filter(x=>x.type === "PLAYING") : null;

    let game = newGame && newGame.length ? `${newGame[0].name}` : `${oldGame[0].name}`
    const playingRole = newMember.guild.roles.cache.find(role => role.name === game );

        
    let add = await client.translate('role added to this user:');
    let remove = await client.translate('role removed from this user:');
    if(newGame && newGame.length){
      newMember.guild.members.cache.get(newMember.user.id).roles.add(playingRole)
      .then(() => channel.send(`${newGame && newGame.length ? `**${playingRole.name}** ${add} **${newMember.user.tag}** ✅` : `**${playingRole.name}** ${remove} **${newMember.user.tag}** ❌`}`))
      .catch(console.error);

    } else if(oldGame && oldGame.length){
      newMember.guild.members.cache.get(newMember.user.id).roles.remove(playingRole)
      .then(() => channel.send(`${newGame && newGame.length ? `**${playingRole.name}** ${add} **${newMember.user.tag}** ✅` : `**${playingRole.name}** ${remove} **${newMember.user.tag}** ❌`}`))
      .catch(console.error);
    }}
  });
});