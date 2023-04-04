from flask import Flask, render_template, request
import logger

app = Flask(__name__)


#index webpage
@app.route('/')
def index():
    logger.log("New access from " + request.remote_addr)
    return render_template('index.html')


#receiving data
'''@app.route('/signal', methods=['POST'])
def addSignals():
    logger.log(request.form["msg"])
    return "El mensaje " + request.form["msg"] + " ha sido capturado."'''


if __name__ == '__main__':
   app.run()