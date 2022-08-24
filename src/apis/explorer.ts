import axios from "axios"
import { API_ENDPOINT } from "../config"
import { logger } from "../logger"

export const getBalance = async (address: string)  => {
  const endpoint = `${API_ENDPOINT}/api/explorer/v2/balance/${address}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Explorer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Explorer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Explorer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getBlock = async (blockId: string) => {
  const endpoint = `${API_ENDPOINT}/api/explorer/v2/blocks/${blockId}/children`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Explorer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Explorer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Explorer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getLedgerByAddress = async (address: string) => {
  const endpoint = `${API_ENDPOINT}/api/explorer/v2/ledger/updates/by-address/${address}?pageSize=1000&sort=newest&startMilestoneIndex=0`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Explorer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Explorer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Explorer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getLedgerByMilestoneId = async (milestoneId: string) => {
  const endpoint = `${API_ENDPOINT}/api/explorer/v2/ledger/updates/by-milestone/${milestoneId}?pageSize=1000`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Explorer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Explorer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Explorer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}