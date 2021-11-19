const { Client } = require('discord.js')
const fs = require('fs')
const path = require('path')

const config = require('@config')
const Logger = require('./Logger')
const logger = new Logger('bot')
/**
 * Discord Bot Client
 * @extends {Client}
 */
class BotClient extends Client {
  /**
   * BotClient constructor
   * @param {import('discord.js').ClientOptions} options Discord client options
   */
  constructor(options, BUILD_VERSION) {
    super(options)

    logger.info('Loading config data...')

    this.VERSION = BUILD_VERSION
    if (fs.existsSync(path.join(path.resolve(), 'config.js'))) {
      /**
       * @type {import('../../config')}
       */
      this.config = require('@config')
      logger.info('Config data loaded.')
    } else {
      logger.fatal('Config file not found!')
    }
  }

  /**
   * Loggin in the bot
   * @param {string} token Discord bot token
   */
  async start(token) {
    logger.info('Logging in bot...')
    await this.login(token)
  }

  /**
   * Setting status
   * @param {string} status 
   */
  async setStatus(status = 'online', name = '점검중...') {
    if(status.includes('dev')) {
      logger.warn('Changed status to Developent mode')

      this.user?.setPresence({
        activities: [
          { name: `${this.config.bot.prefix}help | ${this.VERSION} : ${name}` }
        ], 
        status: 'dnd'
      })
    } else if(status.includes('online')) {
      logger.info('Changed status to Online mode')
      
      this.user?.setPresence({
        activities: [
          { name: `${this.config.prefix}help | ${this.VERSION}` }
        ],
        status: 'online'
      })
    }
  }

}

module.exports = BotClient