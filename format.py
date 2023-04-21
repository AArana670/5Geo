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

    if json["token"] == "dummy":  #For intentionally fake data, so that the connection can be tested
        return DUMMY

    return SUCCESS


def buildJson(data):  #data is a dictionary
    body = {}
    body["signals"] = data

    return json.dumps(body)


def verifyFilter(data):

    return SUCCESS

def buildFilter(data):  #data is a dictionary
                        #builds a dictionary to filter the mongoDB query

    return {}