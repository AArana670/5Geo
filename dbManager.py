from pymongo import MongoClient
import logger

def getSignals():
    client = MongoClient("localhost", 27017) 
    db = client['5geo']
    collection = db.signals
    res = list(collection.find({}))
    logger.log("Requested data: " + str(res))
    return str(res)

