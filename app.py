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
        body = request.get_json()
        contentFormat = format.verify(body)
        if contentFormat == format.SUCCESS:
            logger.log("Successful data post from " + request.remote_addr + ": " + str(body))
            dbManager.insert(body)
            return "El mensaje " + "owo" + " ha sido capturado.", 200
        
        elif contentFormat == format.FAILURE:
            logger.error("Failed data post from " + request.remote_addr + ": " + str(body))
            return "El mensaje " + "owo" + " no cumple con el formato de subida", 406
        
        else:  #contentFormat == format.DUMMY
            logger.log("Dummy data post from " + request.remote_addr + ": " + str(body))
            return "El mensaje " + "owo" + "ha llegado exitosamente", 202

    if request.method == 'GET':
        logger.log("New data request from " + request.remote_addr)
        return dbManager.getSignals(), 200