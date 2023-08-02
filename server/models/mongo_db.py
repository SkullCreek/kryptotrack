from urllib.parse import quote_plus

from pymongo.mongo_client import MongoClient


class Mongo_Db:
  def __init__(self):
    username = "darpan"
    password = "Darpan@2001"  # Note: replace with your actual password
    host = "darpan.k3zfqdd.mongodb.net"
    db_name = "darpan"
    escaped_username = quote_plus(username)
    escaped_password = quote_plus(password)
    self.uri = f"mongodb+srv://{escaped_username}:{escaped_password}@{host}/{db_name}?retryWrites=true&w=majority"

  def conn(self):
    self.client = MongoClient(self.uri)
    try:
      self.client.admin.command('ping')
      return True
    except Exception as e:
      return False

  def create_collection(self, collection_name):
    if self.client is not None:
      db = self.client.get_default_database()  # Use the default database specified in the connection URI
      db.create_collection(collection_name)
      print(f"Collection '{collection_name}' created successfully.")

  def add(self, collection_name, query):
    if self.client is not None:
      db = self.client.get_default_database()
      collection = db[collection_name]
      result = collection.insert_one(query)
      print(f"Document added with ObjectID: {result.inserted_id}")

  def search(self, search_query, collection_name):
    if self.client is not None:
      db = self.client.get_default_database()
      collection = db[collection_name]
      results = collection.find_one(search_query)
      return results

  def close(self):
    self.client.close()
