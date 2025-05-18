# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['file']
    df = pd.read_csv(file)
    plt.figure()
    df['pdc'].hist()
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    plt.close()
    return jsonify({'chart': img_base64})

if __name__ == '__main__':
    app.run(debug=True)