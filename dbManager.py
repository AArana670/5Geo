

def getSignals():
    from pymongo import MongoClient
    client = MongoClient("mongodb://5geocli:v56vAyP7YUdqU7zv@157.245.106.35:27017") 
    db = client["5geo"]
    collection = db['signals']
    return collection.find()

