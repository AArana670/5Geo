from flask import Flask, render_template, request
import logger
import dbManager

app = Flask(__name__)


#index webpage
@app.route('/')
def index():
    logger.log("New access from " + request.remote_addr)
    return render_template('index.html')


#obtaining data
@app.route('/signal')
def showSignals():
    logger.log("New data request from " + request.remote_addr + ": " + str(request.args))
    return dbManager.getSignals()


#posting data
@app.route('/signal', methods=['POST'])
def addSignals():
    logger.log("New data post from " + request.remote_addr + " | " + request.form["token"] + ": " + request.form["msg"])
    return "El mensaje " + request.form["msg"] + " ha sido capturado."


'''#run api (for debugging purposes only)
if __name__ == '__main__':
   app.run()'''