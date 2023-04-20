from pymongo import MongoClient

client = MongoClient("localhost", 27017) 
db = client['5geo']
collection = db.signals

def getSignals():
    res = list(collection.find({}))
    return str(res)


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
            newSignal["provider"] = signal["provider"]
        
        if "token" in signal:
            newSignal["user"] = signal["token"]
        
        collection.insert_one(newSignal)