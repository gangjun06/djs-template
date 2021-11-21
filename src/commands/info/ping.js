const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  description : '핑을 측정합니다.',
  aliases: ['핑', '측정', 'vld'],
  /**
   * @param {import('../../structures/BotClient')} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */
  execute(client, message, args) {
    message.channel.sendd('Pong!')
  }
}