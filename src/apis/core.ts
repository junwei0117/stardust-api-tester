import { TAGGED_DATA_PAYLOAD_TYPE } from "@iota/iota.js";
import axios from "axios";
import { API_ENDPOINT } from "../config"
import { logger } from "../logger";
import * as crypto from "crypto"

export const isNodeHealth = async () => {
  const endpoint = `${API_ENDPOINT}/health`

  try {
    const headers = { "Accept-Encoding": "deflate" }
    const response = await axios.get(endpoint, {headers})

    logger.log(`info`, `Core-API GET ${endpoint} ok`)

    if (response.status == 200) {
      return true
    } else {
      return false
    }
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getNodeInfo = async ()  => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/info`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
    
    return response.data
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getTips = async () => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/tips`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const submitBlock = async (receiverCount: number, amount: number, nodeInfo: any) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/blocks`
  const payload = JSON.stringify({
    protocolVersion: 2,
    payload: {
      type: TAGGED_DATA_PAYLOAD_TYPE,
      tag: `0x${Buffer.from(crypto.randomBytes(63)).toString("hex")}`,
      data: `0x${Buffer.from(crypto.randomBytes(32489)).toString("hex")}`
    },
    nonce: "0",
  });

  const headers = {
    "Content-Type": "application/json",
  }

  try {
    const response = await axios.post(`${endpoint}`, payload, {headers})

    logger.log(`info`, `Core-API POST ${endpoint} ok`)
    logger.log(`debug`, `Core-API POST ${endpoint} ok response ${JSON.stringify(response.data)}`)

    return response.data.blockId
  } catch (error: any) {
    console.log(`Core-API POST ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getBlockById = async (blockId: string) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/blocks/${blockId}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getBlockMetaDataById = async (blockId: string) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/blocks/${blockId}/metadata`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getOutputById = async (outputId: string) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/outputs/${outputId}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)

    return response.data
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getOutputMetadataById = async (outputId: string) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/outputs/${outputId}/metadata`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getReceipts = async () => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/receipts`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getReceiptsByIndex = async (index: number) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/receipts/${index}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getTreasury = async () => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/treasury`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getMilestoneById = async (milestoneId: string) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/milestones/${milestoneId}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}


export const getMilestoneByIndex = async (index: number) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/milestones/by-index/${index}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getUTXOChangeByMilestoneId = async (milestoneId: string) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/milestones/${milestoneId}/utxo-changes`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getUTXOChangeByMilestoneIndex = async (index: number) => {
  const endpoint = `${API_ENDPOINT}/api/core/v2/milestones/by-index/${index}/utxo-changes`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Core-API GET ${endpoint} ok`)
    logger.log(`debug`, `Core-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Core-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

