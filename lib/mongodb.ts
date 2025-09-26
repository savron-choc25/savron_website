import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB_NAME!

let client: MongoClient
let db: Db

export async function connectToDatabase() {
  if (db) {
    return { client, db }
  }

  try {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(dbName)
    
    console.log('Connected to MongoDB successfully')
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}
