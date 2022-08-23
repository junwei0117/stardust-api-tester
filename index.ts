import * as core from "./src/apis/core"

const run = async () => {
  do {
    const isNodeHealth = await core.isNodeHealth()
    console.log(`isNodeHealth: ${isNodeHealth}`)

    const nodeInfo = await core.getNodeInfo()
    console.log(`nodeInfo: ${JSON.stringify(nodeInfo, null, 4)}`)

    const tips = await core.getTips()
    console.log(`tips: ${JSON.stringify(tips, null, 4)}`)

    const blockResp = await core.submitBlock(1, 213000, nodeInfo)
    console.log(`blockResp: ${JSON.stringify(blockResp, null, 4)}`)

    const block = await core.getBlockById(blockResp?.blockId)
    console.log(`block: ${JSON.stringify(block, null, 4)}`)

    const blockMetaData = await core.getBlockMetaDataById(blockResp?.blockId)
    console.log(`blockMetaData: ${JSON.stringify(blockMetaData, null, 4)}`)

    const output = await core.getOutputById(blockResp?.outputIds.items[0])
    console.log(`output: ${JSON.stringify(output, null, 4)}`)

    const outputMetaData = await core.getOutputMetadataById(blockResp?.outputIds.items[0])
    console.log(`outputMetaData: ${JSON.stringify(outputMetaData, null, 4)}`)

    let receipts = await core.getReceipts()
    console.log(`receipts: ${JSON.stringify(receipts, null, 4)}`)

    receipts = await core.getReceiptsByIndex(nodeInfo.status.confirmedMilestone.index)
    console.log(`receipts: ${JSON.stringify(receipts, null, 4)}`)

    const treasury = await core.getTreasury()
    console.log(`treasury: ${JSON.stringify(treasury, null, 4)}`)

    let milestone = await core.getMilestoneById(nodeInfo.status.confirmedMilestone.milestoneId)
    console.log(`milestone: ${JSON.stringify(milestone, null, 4)}`)

    milestone = await core.getMilestoneByIndex(nodeInfo.status.confirmedMilestone.index)
    console.log(`milestone: ${JSON.stringify(milestone, null, 4)}`)

    let utxoChanges = await core.getUTXOChangeByMilestoneId(nodeInfo.status.confirmedMilestone.milestoneId)
    console.log(`utxoChanges: ${JSON.stringify(utxoChanges, null, 4)}`)

    utxoChanges = await core.getUTXOChangeByMilestoneIndex(nodeInfo.status.confirmedMilestone.index)
    console.log(`utxoChanges: ${JSON.stringify(utxoChanges, null, 4)}`)
  } while (true)
}

run()