from flask import Flask, render_template, request
import logger
import dbManager

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
        logger.log("New data post from " + request.remote_addr + ": " + str(request.get_json()))
        return "El mensaje " + "owo" + " ha sido capturado."
    else:
        logger.log("New data request from " + request.remote_addr + ": " + request.form["msg"])
        return dbManager.getSignals()