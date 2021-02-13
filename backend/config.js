require('dotenv').config()

const fetch = require('node-fetch')
const { getLogger } = require('./utils/logger')

const log = getLogger('config')

const Defaults = {
  999: {
    ipfsGateway: 'http://localhost:8080',
    ipfsApi: `http://localhost:${process.env.IPFS_API_PORT || 5002}`,
    provider: 'http://localhost:8545',
    providerWs: 'ws://localhost:8545',
    marketplaceContract: process.env.MARKETPLACE_CONTRACT
  },
  4: {
    ipfsGateway: 'https://fs-autossl.ogn.app',
    ipfsApi: 'https://fs.ogn.app',
    backend: 'https://ogn-rinkeby.commonsstack.org',
    marketplaceContract: '0x3d608cce08819351ada81fc1550841ebc10686fd',
    provider: 'https://rinkeby.infura.io/v3/9bd0023135a246db86f6dd4f3dd3026a',
    providerWs:
      'wss://rinkeby.infura.io/ws/v3/9bd0023135a246db86f6dd4f3dd3026a',
    fetchPastLogs: true
  },
  1: {
    ipfsGateway: 'https://fs-autossl.ogn.app',
    ipfsApi: 'https://fs.ogn.app',
    backend: 'https://ogn.commonsstack.org',
    marketplaceContract: '0x698ff47b84837d3971118a369c570172ee7e54c2',
    provider: 'https://mainnet.infura.io/v3/9bd0023135a246db86f6dd4f3dd3026a',
    providerWs:
      'wss://mainnet.infura.io/ws/v3/9bd0023135a246db86f6dd4f3dd3026a',
    fetchPastLogs: true
  }
}

/**
 * Fetches a shop's config.json from the network.
 *
 * @param {string} dataURL: The shop's data URL
 * @param {number} netId: Ethereum network Id (1=Mainnet, 4=Rinkeby, 999=Test, etc..).
 * @returns {Promise<{object}>}
 */
async function getShopConfigJson(dataURL, netId) {
  const url = `${dataURL}config.json`
  try {
    const res = await fetch(url)
    const data = await res.json()
    const defaultData = Defaults[netId] || {}
    const networkData = data ? data.networks[netId] : {}
    return {
      ...data,
      ...defaultData,
      ...networkData
    }
  } catch (e) {
    log.error(`Error fetching config.json from ${url}`)
    return null
  }
}

module.exports = {
  defaults: Defaults,
  getShopConfigJson
}
