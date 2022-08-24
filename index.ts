import * as core from "./src/apis/core"
import * as indexer from "./src/apis/indexer"
import * as explorer from "./src/apis/explorer"
import { SPAMMER_ADDRESS, ENABLE_EXPLORER } from "./src/config"
import { Converter } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE, Bech32Helper, TransactionHelper } from "@iota/iota.js";
import { logger } from "./src/logger"

const doCoreAPITest = async () => {
  do {
      try {
        const address = SPAMMER_ADDRESS[Math.floor(Math.random() * SPAMMER_ADDRESS.length)]

        await core.isNodeHealth()
        const nodeInfo = await core.getNodeInfo()
        await core.getTips()
        const blockId = await core.submitBlock(1, 213000, nodeInfo)
        await core.getBlockById(blockId)
        await core.getBlockMetaDataById(blockId)
        const basicOutputs = await indexer.getBasicOutputs(address)
        await core.getOutputById(basicOutputs.items[0])
        await core.getOutputMetadataById(basicOutputs.items[0])
        await core.getReceipts()
        await core.getReceiptsByIndex(nodeInfo.status.confirmedMilestone.index)
        await core.getTreasury()
        await core.getMilestoneById(nodeInfo.status.confirmedMilestone.milestoneId)
        await core.getMilestoneByIndex(nodeInfo.status.confirmedMilestone.index)
        await core.getUTXOChangeByMilestoneId(nodeInfo.status.confirmedMilestone.milestoneId)
        await core.getUTXOChangeByMilestoneIndex(nodeInfo.status.confirmedMilestone.index)
      } catch (error) {
        logger.log(`error`, error)
      }
  } while (true)
}

const doIndexerAPITest = async () => {
  const nodeInfo = await core.getNodeInfo()

  do {
    try {
      const address = SPAMMER_ADDRESS[Math.floor(Math.random() * SPAMMER_ADDRESS.length)]

      await indexer.getBasicOutputs(address)
      const aliasOutputIDs = await indexer.getAliasOutputs(address)

      if (aliasOutputIDs?.items.length > 0) {
        for (let i = 0; i < aliasOutputIDs?.items.length; i++) {
          const outputID = aliasOutputIDs?.items[i]
          const type = outputID.substring(66, 70)
          let aliasID, aliasAddress, foundryOutputIDs, output
          switch (type) {
            case "0000":
              output = await core.getOutputById(outputID.substring(0, 66))
              aliasID = output.output.aliasId
              if (aliasID == "0x0000000000000000000000000000000000000000000000000000000000000000") {
                aliasID = TransactionHelper.resolveIdFromOutputId(outputID)
              }
              await indexer.getAliasOutputsById(aliasID)
              aliasAddress = Bech32Helper.toBech32(ALIAS_ADDRESS_TYPE, Converter.hexToBytes(aliasID), nodeInfo.protocol.bech32Hrp)
              foundryOutputIDs = await indexer.getFoundryOutputs(aliasAddress)
              break;
            case "0200":
              output = await core.getOutputById(outputID)
              aliasID = output.output.aliasId
              await indexer.getAliasOutputsById(aliasID)
              aliasAddress = Bech32Helper.toBech32(ALIAS_ADDRESS_TYPE, Converter.hexToBytes(aliasID), nodeInfo.protocol.bech32Hrp)
              foundryOutputIDs = await indexer.getFoundryOutputs(aliasAddress)
              break;
            default:
              break;
          }
        }
      }
      const nftOutputIDs = await indexer.getNFTOutputs(address)
      if (nftOutputIDs?.items.length > 0) {
        for (let i = 0; i < nftOutputIDs?.items.length; i++) {
          const outputID = nftOutputIDs?.items[i]
          const type = outputID.substring(66, 70)
          let output, nftID
          switch (type) {
            case "0000":
              output = await core.getOutputById(outputID.substring(0, 66))
              nftID = output.output.nftId
              if (nftID == "0x0000000000000000000000000000000000000000000000000000000000000000") {
                nftID = TransactionHelper.resolveIdFromOutputId(outputID)
              }
              await indexer.getNFTOutputsById(nftID)
              break;
              default:
                break;
          }
        }
      }
    } catch {}
  } while (true)
}

const doExploreAPITest = async () => {
  do {
    try {
      const address = SPAMMER_ADDRESS[Math.floor(Math.random() * SPAMMER_ADDRESS.length)]
      const nodeInfo = await core.getNodeInfo()

      await explorer.getBalance(address)
      // await explorer.getBlock(explorerBlockId)
      await explorer.getLedgerByAddress(address)
      await explorer.getLedgerByMilestoneId(nodeInfo.status.confirmedMilestone.milestoneId)
    } catch (error) {}
  } while (true)
}

const run = async () => {
  try {
    doCoreAPITest()
    doIndexerAPITest()
    ENABLE_EXPLORER ? doExploreAPITest() : null
  } catch {}   
}

run()