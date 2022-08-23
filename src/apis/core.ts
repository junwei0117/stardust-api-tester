import {
  ED25519_ADDRESS_TYPE,
  SIGNATURE_UNLOCK_TYPE,
  ED25519_SIGNATURE_TYPE,
  TRANSACTION_ESSENCE_TYPE,
  TRANSACTION_PAYLOAD_TYPE,
  DEFAULT_PROTOCOL_VERSION,
  TransactionHelper,
  BASIC_OUTPUT_TYPE,
  ADDRESS_UNLOCK_CONDITION_TYPE,
  ITransactionEssence,
  OutputTypes,
} from "@iota/iota.js";
import { Converter } from "@iota/util.js";
import { Ed25519 } from "@iota/crypto.js";
import axios from "axios";
import { HORNET_API_ENDPOINT } from "../config"
import fs from "fs"

export const isNodeHealth = async () => {
  const endpoint = `${HORNET_API_ENDPOINT}/health`

  console.log(`GET ${endpoint}`)
  

  try {
    const headers = { "Accept-Encoding": "deflate" }
    const response = await axios.get(endpoint, {headers})

    if (response.status == 200) {
      return true
    } else {
      return false
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    return false
  }
}

export const getNodeInfo = async ()  => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/info`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getTips = async () => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/tips`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const submitBlock = async (receiverCount: number, amount: number, nodeInfo: any) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/blocks`

  console.log(`POST ${endpoint}`)

  const wallets = JSON.parse(fs.readFileSync('./wallets.json', 'utf8'));
  const senderWallet = wallets[Math.floor(Math.random() * wallets.length)];
  const senderOutputIds = (await axios.get(`${HORNET_API_ENDPOINT}/api/indexer/v1/outputs/basic?address=${senderWallet.address.inBech32}`)).data

  let senderInputs = [];
  let senderOutputs = [];
  let senderBalance = 0;
  for (let i = 0; i < senderOutputIds.items.length; i++) {
    const senderOutput = (await axios.get(`${HORNET_API_ENDPOINT}/api/core/v2/outputs/${senderOutputIds.items[i]}`)).data

    if (!senderOutput.metadata.isSpent && senderOutput.output.amount > amount * receiverCount) {
      senderInputs.push(TransactionHelper.inputFromOutputId(senderOutputIds.items[i]));
      senderBalance += +senderOutput.output.amount;
      senderOutputs.push(senderOutput.output);
    }
  }

  let txOutputs: OutputTypes[] = [];
  for (let i = 0; i < receiverCount; i++) {
    const receiverWallet = wallets[Math.floor(Math.random() * wallets.length)];
    const output: OutputTypes = {
      type: BASIC_OUTPUT_TYPE,
      amount: amount.toString(),
      nativeTokens: [],
      unlockConditions: [
        {
          type: ADDRESS_UNLOCK_CONDITION_TYPE,
          address: {
            type: ED25519_ADDRESS_TYPE,
            pubKeyHash: receiverWallet.address.inHex,
          },
        },
      ],
      features: [],
    };

    txOutputs.push(output);
  }

  const senderRemainderOutput: OutputTypes = {
    type: BASIC_OUTPUT_TYPE,
    amount: (senderBalance - amount * receiverCount).toString(),
    nativeTokens: [],
    unlockConditions: [
      {
        type: ADDRESS_UNLOCK_CONDITION_TYPE,
        address: {
          type: ED25519_ADDRESS_TYPE,
          pubKeyHash: senderWallet.address.inHex,
        },
      },
    ],
    features: [],
  };

  txOutputs.push(senderRemainderOutput);

  const inputsCommitment = TransactionHelper.getInputsCommitment(senderOutputs);
  const txEssence: ITransactionEssence = {
    type: TRANSACTION_ESSENCE_TYPE,
    networkId: TransactionHelper.networkIdFromNetworkName(nodeInfo.protocol.networkName),
    inputs: senderInputs,
    outputs: txOutputs,
    inputsCommitment,
  };

  const txEssenceHash = TransactionHelper.getTransactionEssenceHash(txEssence);
  let unlock = {
    type: SIGNATURE_UNLOCK_TYPE,
    signature: {
      type: ED25519_SIGNATURE_TYPE,
      publicKey: Converter.bytesToHex(Converter.hexToBytes(senderWallet.keyPair.publicKey), true),
      signature: Converter.bytesToHex(Ed25519.sign(Converter.hexToBytes(senderWallet.keyPair.privateKey), txEssenceHash), true),
    },
  };

  const txPayload = {
    type: TRANSACTION_PAYLOAD_TYPE,
    essence: txEssence,
    unlocks: [unlock],
  };
  
  const payload = {
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    payload: txPayload,
    nonce: "0",
  };

  const headers = {
    "Content-Type": "application/json",
  }

  try {
    const response = await axios.post(`${endpoint}`, payload, {headers})
    
    return {blockId: response.data.blockId, outputIds: senderOutputIds}
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getBlockById = async (blockId: string) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/blocks/${blockId}`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getBlockMetaDataById = async (blockId: string) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/blocks/${blockId}/metadata`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getOutputById = async (outputId: string) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/outputs/${outputId}`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getOutputMetadataById = async (outputId: string) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/outputs/${outputId}/metadata`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getReceipts = async () => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/receipts`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getReceiptsByIndex = async (index: number) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/receipts/${index}`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getTreasury = async () => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/treasury`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getMilestoneById = async (milestoneId: string) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/milestones/${milestoneId}`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}


export const getMilestoneByIndex = async (index: number) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/milestones/by-index/${index}`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getUTXOChangeByMilestoneId = async (milestoneId: string) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/milestones/${milestoneId}/utxo-changes`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

export const getUTXOChangeByMilestoneIndex = async (index: number) => {
  const endpoint = `${HORNET_API_ENDPOINT}/api/core/v2/milestones/by-index/${index}/utxo-changes`

  console.log(`GET ${endpoint}`)

  try {
    const response = await axios.get(endpoint)

    return response.data
  } catch (error: any) {
    console.error(error.message)

    return null
  }
}

