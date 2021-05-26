const client = require('../../niyuki');
const config = require('../../setting.json')

client.on('ready', async(message) => {
    //--------------LOG IF BOT IS ONLINE
    let log = await client.translate(`${client.user.tag} BOT is here!`, message)
    console.log(log)
    console.log('<==============================================>')
    console.log('🔥 Niyuki On Fire 🔥')
    console.log('<==============================================>')

    //--------JOIN VOICE CHANNEL
    client.channels.cache.get(config.voicechannel).join()

    //--------BOT PRESENCE STATUS
    client.user.setPresence({ activity: { name: '💸 Your mom on onlyfans xd 💸' , type: 'STREAMING', url:'https://github.com/niyuki'}, status: 'dnd'/*online, idle, dnd, invisible */ })
    //.then(console.log)
      .catch(console.error);  
})