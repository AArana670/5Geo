from flask import Flask, render_template, request

app = Flask(__name__)


#index webpage
@app.route('/')
def index():
    return render_template('index.html')


#receiving data
@app.route('/signal', methods=['POST'])
def addSignals():
    data = print(request.form)


if __name__ == '__main__':
   app.run()