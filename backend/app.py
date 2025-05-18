from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import io
import base64
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        print("Reading CSV...")
        # Read the CSV file
        df = pd.read_csv(file)
        print("CSV columns:", df.columns.tolist())
        
        # Perform analysis (example - vaccination rate)
        if 'vaccination_status' in df.columns:
            vaccinated = df['vaccination_status'].value_counts()
       
            
            # Create a chart
            plt.figure(figsize=(8, 6))
            vaccinated.plot(kind='bar')
            plt.title('Vaccination Status')
            plt.xlabel('Status')
            plt.ylabel('Count')
            
            # Save chart to a bytes buffer
            buffer = io.BytesIO()
            plt.savefig(buffer, format='png')
            buffer.seek(0)
            chart_data = base64.b64encode(buffer.read()).decode('utf-8')
            plt.close()

            # Save analysis report as Excel
            report_path = os.path.join(os.getcwd(), "analysis_report.xlsx")
            df.to_excel(report_path, index=False)

            return jsonify({
                'chart': chart_data,
                'stats': {
                    'total_records': len(df),
                    'vaccination_rate': vaccinated.get('yes', 0) / len(df) * 100,
                'top_health_issues': df['health_issue'].value_counts().head(5).to_dict(),
                'insights': {
                    'disease_outbreaks': "No significant outbreaks detected",
                    'high_risk_groups': "None identified",
                    'recommendations': "Increase awareness in Zone A"
                },
             'vaccination_gaps': {'yes': 7, 'no': 5},
             'nutrition_issues': {'underweight': 3, 'normal': 8, 'overweight': 1},
             'disease_trends': {'malaria': 6, 'typhoid': 4, 'cholera': 2},
             'report_path': report_path
                }, 
            })
        else:
            return jsonify({'error': 'CSV format not recognized'}), 400
            
    except Exception as e:
        print("Error during analysis:", str(e))  # Add this line
        return jsonify({'error': str(e)}), 500


# --- Add this download route ---
@app.route('/download/analysis_report.xlsx', methods=['GET'])
def download_report():
    report_path = os.getcwd()
    filename = "analysis_report.xlsx"
    if not os.path.exists(os.path.join(report_path, filename)):
        return jsonify({'error': 'Report not found'}), 404
    return send_from_directory(report_path, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(port=5000)