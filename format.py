import json

SUCCESS = 0
FAILURE = 1
DUMMY = 2

def verifyJson(json):
    if "token" not in json:
        return FAILURE
    
    if "signals" not in json:
        return FAILURE
    
    for signal in json["signals"]:  #Other parameters are optional
        if "dBm" not in signal:
            return FAILURE
        
        if "ubiLat" not in signal:
            return FAILURE
        
        if "ubiLong" not in signal:
            return FAILURE
        
        if "moment" not in signal:
            return FAILURE

        if "type" not in signal:
            return FAILURE

    if json["token"] == "dummy":  #For intentionally fake data, so that the connectivity can be tested
        return DUMMY

    return SUCCESS


def buildJson(data):  #data is a dictionary
    body = {}
    body["signals"] = data

    return json.dumps(body)


def verifyFilter(data):

    if "type" in data:
        typesList = ["NR", "LTE", "TDSCDMA", "WCDMA", "GSM"]
        for t in data.getlist("type"):  #https://stackoverflow.com/a/14188496
            if t.upper() not in typesList:
                return FAILURE
    
    if "minFreq" in data and "maxFreq" in data:
        if data["minFreq"] > data["maxFreq"]:
            return FAILURE

    return SUCCESS

def buildFilter(data):  #data is a dictionary verified by verifyFilter
                        #builds a dictionary in the format of a mongoDB query
    filter = {}
    if "user" in data:
        filter["user"] = data["user"]

    if "type" in data:
        filter["type"] = {"$in": data.getlist("type")}

    freqConditions = {}
    
    if "minFreq" in data:
        freqConditions["$gte"] = data["minFreq"]
    
    if "maxFreq" in data:
        freqConditions["$lte"] = data["maxFreq"]
    
    if freqConditions:
        filter["freq"] = freqConditions
    
    return filter