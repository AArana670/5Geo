from flask import Flask, render_template, request
import logger
import dbManager
import format

app = Flask(__name__)


#index webpage
@app.route('/')
def index():
    logger.log("New access from " + request.remote_addr)
    return render_template('index.html')


#posting data
@app.route('/signal', methods=['GET', 'POST'])
def addSignals():
    if request.method == 'POST':
        if format.verify(request.get_json()):
            logger.log("New data post from " + request.remote_addr + ": " + str(request.get_json()))
            return "El mensaje " + "owo" + " ha sido capturado.", 200
        else:
            logger.log("Failed data post from " + request.remote_addr + ": " + str(request.get_json()))
            return "El mensaje " + "owo" + " no cumple con el formato de subida", 406
    else:
        logger.log("New data request from " + request.remote_addr + ": " + request.form["msg"])
        return dbManager.getSignals()