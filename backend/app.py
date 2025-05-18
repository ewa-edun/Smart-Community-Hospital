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
                'top_health_issues': df['disease'].value_counts().head(5).to_dict(),
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

@app.route('/hospital-analyze', methods=['POST'])
def hospital_analyze():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        df = pd.read_csv(file)

       # Only sum numeric columns, and coerce errors
        for col in ['total_beds', 'icu_beds', 'ventilators', 'oxygen_supply']:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors='coerce')

        # Example stats based on your columns
        total_hospitals = len(df)
        total_beds = int(df['total_beds'].sum()) if 'total_beds' in df.columns else 'N/A'
        total_icu_beds = int(df['icu_beds'].sum()) if 'icu_beds' in df.columns else 'N/A'
        total_ventilators = int(df['ventilators'].sum()) if 'ventilators' in df.columns else 'N/A'
        total_oxygen = int(df['oxygen_supply'].sum()) if 'oxygen_supply' in df.columns else 'N/A'
        operational = df['operational_status'].value_counts().to_dict() if 'operational_status' in df.columns else {}

        # Example demand: group by location or type if you want
        icu_bed_demand = df.groupby('location')['icu_beds'].sum().to_dict() if 'icu_beds' in df.columns and 'location' in df.columns else {}
        oxygen_demand = df.groupby('location')['oxygen_supply'].sum().to_dict() if 'oxygen_supply' in df.columns and 'location' in df.columns else {}
        medication_demand = {}  # No medication data in your CSV

        # Example chart: operational status
        plt.figure(figsize=(8, 6))
        pd.Series(operational).plot(kind='bar')
        plt.title('Operational Status')
        plt.xlabel('Status')
        plt.ylabel('Number of Hospitals')
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        chart_data = base64.b64encode(buffer.read()).decode('utf-8')
        plt.close()

        # Save analysis report as Excel
        report_path = os.path.join(os.getcwd(), "hospital_analysis_report.xlsx")
        df.to_excel(report_path, index=False)

        return jsonify({
            'chart': chart_data,
            'stats': {
                'total_records': len(df),
                'total_hospitals': total_hospitals,
                'total_beds': total_beds,
                'total_icu_beds': total_icu_beds,
                'total_ventilators': total_ventilators,
                'total_oxygen': total_oxygen,
                'icu_beds_used': total_icu_beds,  # Use total_icu_beds as "used" for now
                'oxygen_used': total_oxygen,      # Use total_oxygen as "used" for now
                'medications_used': 0,      
                'operational_status': operational,
                'icu_bed_demand': icu_bed_demand,
                'oxygen_demand': oxygen_demand,
                'medication_demand': medication_demand,
           'alerts': {
                'oxygen': 'Oxygen supply may run out in 3 days',
                'icu': 'Prepare 10 more ICU beds',
                'medications': 'Critical medication stock running low'
            },
           'suggestions': {
                'allocation': 'Allocate more ICU beds in Zone Y',
                'medications': 'Request additional meds A and B',
                'capacity': 'Prepare for increased patient load in Emergency Department'
             },
           }
        })

    except Exception as e:
        print("Error during hospital analysis:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/download/hospital_analysis_report.xlsx', methods=['GET'])
def download_hospital_report():
    report_path = os.getcwd()
    filename = "hospital_analysis_report.xlsx"
    if not os.path.exists(os.path.join(report_path, filename)):
        return jsonify({'error': 'Report not found'}), 404
    return send_from_directory(report_path, filename, as_attachment=True)



if __name__ == '__main__':
    app.run(debug=True, port=5000)