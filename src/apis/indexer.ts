import axios from "axios"
import { API_ENDPOINT } from "../config"
import { logger } from "../logger"

export const getBasicOutputs = async (address: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/basic?address=${address}&pageSize=10`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)

    return response.data?.items
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getAliasOutputs = async (stateController: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/alias?stateController=${stateController}&pageSize=1000`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)

    return response.data
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getAliasOutputsById = async (aliasId: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/alias/${aliasId}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getFoundryOutputs = async (aliasAddress: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/foundry?aliasAddress=${aliasAddress}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)

    return response.data.items
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getFoundryOutputsById = async (foundryId: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/foundry/${foundryId}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getNFTOutputs = async (address: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/nft?address=${address}`
  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)

    return response.data
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}

export const getNFTOutputsById = async (nftId: string)  => {
  const endpoint = `${API_ENDPOINT}/api/indexer/v1/outputs/nft/${nftId}`

  try {
    const response = await axios.get(endpoint)

    logger.log(`info`, `Indexer-API GET ${endpoint} ok`)
    logger.log(`debug`, `Indexer-API GET ${endpoint} ok response ${JSON.stringify(response.data)}`)
  } catch (error: any) {
    logger.log(`error`, `Indexer-API GET ${endpoint} failed / reason: ${error.code} response: ${JSON.stringify(error.response.data)}`)
  }
}