from pymongo import MongoClient
import format

client = MongoClient("localhost", 27017) 
db = client['5geo']
collection = db.signals

def getSignals(filters):  #filters has already been verified and built in MongoDB query format
    res = list(collection.find(filters, {'_id': 0}))  #exclude id from find
    return res


def insert(body):  #signalList has already been verified
    for signal in body["signals"]:
        newSignal = {}

        newSignal["dBm"] = signal["dBm"]
        newSignal["moment"] = signal["moment"]
        newSignal["ubiLat"] = signal["ubiLat"]
        newSignal["ubiLong"] = signal["ubiLong"]
        newSignal["type"] = signal["type"]

        if "freq" in signal:
            newSignal["freq"] = signal["freq"]
        
        if "cId" in signal:
            newSignal["cId"] = signal["cId"]
        
        if "provider" in signal:
            newSignal["operator"] = signal["operator"]
        
        if body["token"]!="":
            newSignal["user"] = body["token"]
        
        collection.insert_one(newSignal)