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
        for t in data.getlist("type"):
            if t.upper() not in typesList:
                return FAILURE

    return SUCCESS

def buildFilter(data):  #data is a dictionary
                        #builds a dictionary to filter the mongoDB query
    filter = {}
    if "user" in data:
        filter["user"] = data["user"]

    if "type" in data:
        filter["type"] = {"$in": data.getlist("type")}
    
    return filter