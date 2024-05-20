import Dexie, { Table } from 'dexie'

export class RTopicsDB extends Dexie {
  internalTopics!: Table<any, string>
  externalTopics!: Table<any, string>

  constructor() {
    super('RTopicsDB')
    this.version(1).stores({
      internalTopics: '++id,user,chatId,topics',
      externalTopics: '++id,user,chatId,topics'
    })
  }
}

export const db = new RTopicsDB()

export async function saveInternalTopics(
  user: string,
  chatId: string,
  topics: any
) {
  await db.internalTopics.add({ user, chatId, topics })
}

export async function saveExternalTopics(
  user: string,
  chatId: string,
  topics: any
) {
  await db.externalTopics.add({ user, chatId, topics })
}

export async function getInternalTopics(user: string, chatId: string) {
  return await db.internalTopics.where({ user, chatId }).toArray()
}

export async function getExternalTopics(user: string, chatId: string) {
  return await db.externalTopics.where({ user, chatId }).toArray()
}

export async function deleteInternalTopics(user: string, chatId: string) {
  return await db.internalTopics.where({ user, chatId }).delete()
}

export async function deleteExternalTopics(user: string, chatId: string) {
  return await db.externalTopics.where({ user, chatId }).delete()
}

export async function deleteAllInternalTopics() {
  return await db.internalTopics.clear()
}

export async function deleteAllExternalTopics() {
  return await db.externalTopics.clear()
}

export async function getAllInternalTopics() {
  return await db.internalTopics.toArray()
}

export async function getAllExternalTopics() {
  return await db.externalTopics.toArray()
}

export async function getInternalTopicsCount() {
  return await db.internalTopics.count()
}

export async function getExternalTopicsCount() {
  return await db.externalTopics.count()
}

export async function deleteAllTopics() {
  await db.internalTopics.clear()
  await db.externalTopics.clear()
}

export async function deleteAllTopicsForUser(user: string) {
  await db.internalTopics.where({ user }).delete()
  await db.externalTopics.where({ user }).delete()
}

export async function deleteAllTopicsForChatId(chatId: string) {
  await db.internalTopics.where({ chatId }).delete()
  await db.externalTopics.where({ chatId }).delete()
}

export async function deleteAllTopicsForUserAndChatId(
  user: string,
  chatId: string
) {
  await db.internalTopics.where({ user, chatId }).delete()
  await db.externalTopics.where({ user, chatId }).delete()
}

export async function getInternalTopicsCountForUser(user: string) {
  return await db.internalTopics.where({ user }).count()
}

export async function getExternalTopicsCountForUser(user: string) {
  return await db.externalTopics.where({ user }).count()
}

export async function getInternalTopicsCountForChatId(chatId: string) {
  return await db.internalTopics.where({ chatId }).count()
}

export async function getExternalTopicsCountForChatId(chatId: string) {
  return await db.externalTopics.where({ chatId }).count()
}

export async function updateInternalTopics(
  user: string,
  chatId: string,
  topics: any
) {
  await db.internalTopics.where({ user, chatId }).modify({ topics })
}

//add one more topic to inetrnal topics
export async function addInternalTopic(
  user: string,
  chatId: string,
  topic: any
) {
  const topics = await getInternalTopics(user, chatId)
  if (topics.length > 0) {
    topics[0].topics.push(topic)
    await updateInternalTopics(user, chatId, topics[0].topics)
  } else {
    await saveInternalTopics(user, chatId, [topic])
  }
}
