def verify(json):
    if "token" not in json:
        return False
    
    if "signals" not in json:
        return False
    
    for signal in json["signals"]:
        if "dBm" not in signal:
            return False
        
        if "ubiLat" not in signal:
            return False
        
        if "ubiLong" not in signal:
            return False
        
        if "moment" not in signal:
            return False

    return True


def build():

    return None