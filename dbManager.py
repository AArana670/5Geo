from pymongo import MongoClient

def getSignals():
    client = MongoClient("localhost", 27017) 
    db = client['5geo']
    collection = db.signals
    return list(collection.find({}))

