import Dexie, { Table } from 'dexie'

class TDB extends Dexie {
  intList!: Table<any, string>
  constructor() {
    super('TDB')
    this.version(1).stores({
      intList: '++id,user,topics'
    })
  }
}

export const tdb = new TDB()

export async function saveIntTopics(user: string, topics: any) {
  await tdb.intList.add({ user, topics })
}

export async function getIntTopics(user: string) {
  return await tdb.intList.where({ user }).toArray()
}

export async function deleteIntTopics(user: string) {
  return await tdb.intList.where({ user }).delete()
}

export async function deleteAllIntTopics() {
  return await tdb.intList.clear()
}

export async function getAllIntTopics() {
  return await tdb.intList.toArray()
}

// export async function updateIntTopics(user: string, topics: any) {
//   return await tdb.intList.update(user, { topics })
// }
export function updateTopics(user:string, newTopics:any) {
  tdb.intList
    .where('user')
    .equals(user)
    .modify({ topics: newTopics })
    .then(updated => {
      if (updated) console.log('Items updated')
      else console.log('No items found for user')
    })
    .catch(error => {
      console.error('Ooops: ' + error)
    })
}

export async function updateIntTopicsById(id: number, topics: any) {
  return await tdb.intList.update(id, { topics })
}

export async function getIntTopicsById(id: number) {
  return await tdb.intList.where({ id }).toArray()
}

export async function deleteIntTopicsById(id: number) {
  return await tdb.intList.where({ id }).delete()
}
