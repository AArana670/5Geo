from flask import Flask, render_template, request, send_file, Response
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
        contentFormat = format.verifyJson(body)

        if contentFormat == format.SUCCESS:
            logger.log("Successful data post from " + request.remote_addr + ": " + str(body))
            dbManager.insert(body)
            return Response(status=200)
        
        elif contentFormat == format.FAILURE:
            logger.error("Failed data post from " + request.remote_addr + ": " + str(body))
            return Response(status=406)
        
        else:  #contentFormat == format.DUMMY
            logger.log("Dummy data post from " + request.remote_addr + ": " + str(body))
            return Response(status=202)


    if request.method == 'GET':
        params = request.args
        contentFormat = format.verifyFilter(params)

        if (contentFormat == format.SUCCESS):
            logger.log("Correct data request from " + request.remote_addr)
            return dbManager.getSignals(), 200
        else:  #contentFormat == format.FAILURE
            logger.error("Failed data request from " + request.remote_addr)
            return Response(status=400)


@app.route('/geiger')
def downloadApk():
    logger.log("New 5Geiger download from " + request.remote_addr)
    return send_file("downloads/5Geiger.apk")