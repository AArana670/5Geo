import json

SUCCESS = 0
FAILURE = 1
DUMMY = 2

def verify(json):
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


def build(data):  #data is a dictionary

    return json.dumps(data)