from datetime import datetime

infoPath = "/var/log/5geo/info.log"
errorPath = "/var/log/5geo/error.log"
LEVEL_INFO = 1
LEVEL_ERROR = 2


def log(data, lvl=1):

    if (lvl == 1):
        logFile = open(infoPath, "a")
    elif (lvl == 2):
        logFile = open(errorPath, "a")

    line = str(datetime.now()) + " - " + data
    print(line)
    logFile.write(line + "\n")
    logFile.close()
