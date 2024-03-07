from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import base64
import os
import io
from PIL import Image
import pdf2image
import google.generativeai as genai

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams

# Load environment variables
load_dotenv()

# Configure Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

def get_gemini_response(input_text, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([input_text, pdf_content[0], prompt])
    return response.text

def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        # Convert the PDF to image
        images = pdf2image.convert_from_bytes(uploaded_file.read(), poppler_path=r'C:/Program Files (x86)/poppler/Library/bin')

        first_page = images[0]

        # Convert to bytes
        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()  # encode to base64
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")

@app.route('/resumeCheck', methods=['POST'])
def resume_check():
    input_text = request.form.get('input_text', '')
    resume_file = request.files['resume_file']

    if resume_file is not None:
        pdf_content = input_pdf_setup(resume_file)
        prompt = """
        You are an experienced Technical Human Resource Manager,your task is to review the provided resume against the job description. 
        Please share your professional evaluation on whether the candidate's profile aligns with the role. 
        Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
        """
        response = get_gemini_response(input_text, pdf_content, prompt)
        return jsonify({"response": response}), 200
    else:
        return jsonify({"error": "No PDF file uploaded"}), 400

@app.route('/resumeRate', methods=['POST'])
def resume_rate():
    job_file = request.files['job_file']
    resume_file = request.files['resume_file']

    if resume_file is not None:
        input_text = input_pdf_setup(job_file)
        pdf_content = input_pdf_setup(resume_file)

        prompt = """
        You are an skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality, 
        your task is to evaluate the resume against the provided job description. give me the percentage of match if the resume matches
        the job description. First the output should come as percentage and then keywords missing and last final thoughts.
        """

        response = get_gemini_response(input_text, pdf_content, prompt)
        return jsonify({"response": response}), 200
    else:
        return jsonify({"error": "No PDF file uploaded"}), 400


# List of technology skills
technology_skills = [
    "Python", "Java", "JavaScript", "C++", "HTML", "CSS", "iOS Development", "Android Development",
    "React Native", "SQL", "NoSQL", "AWS", "Azure", "Google Cloud", "CI/CD", "Docker", "Kubernetes",
    "Network Security", "Ethical Hacking", "Data Mining", "Data Visualization", "TensorFlow",
    "Scikit-learn", "Natural Language Processing", "Computer Vision", "Internet of Things",
    "Blockchain Development", "UI/UX Design", "Hadoop", "Spark", "Automated Testing", "Selenium",
    "Git", "SVN", "Linux", "Unix Administration", "RESTful APIs", "SOAP", "Scrum", "Kanban", "Jira",
    "Trello", "Shell Scripting", "VMware", "VirtualBox", "Node.js", "Django", "Flask", "React",
    "Angular", "Vue.js", "Object-Oriented Design", "ETL", "Data Warehousing", "Quantum Computing",
    "AR/VR Development", "Microservices Architecture", "Game Development", "Cloud Architecture",
    "Digital Marketing Analytics", "Firmware Development", "Serverless Computing",
    "Embedded Systems Programming", "UX Research", "IT Service Management", "ITIL Framework",
    "Data Governance", "Data Science", "Malware Analysis", "Computer Forensics",
    "Reverse Engineering", "Threat Intelligence", "Vulnerability Assessment", "Penetration Testing",
    "Incident Response", "Secure Coding Practices", "Security Architecture Design", "Risk Management",
    "Identity and Access Management", "Cybersecurity Governance", "Data Privacy", "Encryption Techniques",
    "Authentication Mechanisms", "Blockchain Protocols", "Smart Contract Development",
    "Decentralized Application Development", "Consensus Algorithms", "Cryptocurrency Exchanges",
    "Web3 Development", "Cross-Platform Development", "3D Modeling and Animation", "Computer Graphics",
    "Real-Time Rendering", "Physics Simulation", "Audio Programming", "Networking Protocols",
    "Information Retrieval", "Speech Recognition", "Robotics Programming", "Drone Programming",
    "Computer Vision Algorithms", "SPRING", "Hibernate", "JPA", "SOAP", "REST", "JavaScript", "HTML", "XSD", "XSLT", "JS", "OJET", "JSON",
    "XML", "BPEL", "Microservices", "Springboot", "ORACLE 12C", "PLSQL", "WebLogic", "Tomcat", "JBoss", "JMS",
    "MQ", "OSB", "PKI", "SSO", "SAML","React Native", "Swift", "Kotlin", "Flutter", "Vue.js", "AngularJS", "TypeScript", "GraphQL", "Firebase",
    "MongoDB", "PostgreSQL", "Microsoft SQL Server", "SQLite", "BigQuery", "Redshift", "Elasticsearch",
    "Apache Kafka", "RabbitMQ", "Redis", "GraphQL", "Apollo GraphQL", "AWS Lambda", "Google Cloud Functions",
    "Azure Functions", "AWS DynamoDB", "Google Cloud Firestore", "Azure Cosmos DB", "Firebase Realtime Database",
    "Apache Cassandra", "Neo4j", "Distributed Systems", "Containerization", "Microservices Architecture",
    "Serverless Computing", "GraphQL", "Docker Swarm", "Google Kubernetes Engine", "Azure Kubernetes Service",
    "AWS Elastic Kubernetes Service", "Terraform", "Ansible", "Chef", "Puppet", "Prometheus", "Grafana",
    "ELK Stack (Elasticsearch, Logstash, Kibana)", "Jenkins", "CircleCI", "Travis CI", "GitLab CI/CD",
    "GitHub Actions", "Datadog", "New Relic", "Splunk", "Kibana", "Jaeger", "Istio", "Linkerd", "Envoy",
    "Istio", "Linkerd", "Envoy", "AWS API Gateway", "Google Cloud Endpoints", "Azure API Management",
    "NGINX", "Apache HTTP Server", "AWS CloudFront", "Google Cloud CDN", "Azure CDN", "Cloudflare"
]

# List of soft skills
soft_skills = [
    "Communication", "Teamwork", "Problem-Solving", "Adaptability", "Creativity", "Time Management",
    "Leadership", "Critical Thinking", "Attention to Detail", "Organization", "Interpersonal Skills",
    "Conflict Resolution", "Decision Making", "Emotional Intelligence", "Resilience", "Flexibility",
    "Self-Motivation", "Empathy", "Negotiation", "Open-mindedness", "Stress Management", "Patience",
    "Collaboration", "Innovation", "Presentation Skills", "Networking", "Customer Service",
    "Strategic Thinking", "Analytical Skills", "Problem Sensitivity", "Initiative", "Team Building",
    "Persuasion", "Cultural Awareness", "Delegation", "Motivation", "Conflict Management",
    "Empowering Others", "Influence", "Feedback Delivery", "Project Management", "Risk Management",
    "Client Management", "Vendor Management", "Mentoring", "Coaching", "Diplomacy", "Feedback Receptivity",
    "Cross-functional Collaboration", "Advisory Skills", "Inspirational Leadership", "Ethical Decision Making",
    "Respectfulness", "Self-awareness", "Inclusivity", "Diversity Management", "Team Empowerment",
    "Goal Setting", "Team Conflict Resolution", "Problem Anticipation", "Customer Retention",
    "Product Knowledge", "Technical Writing", "Active Listening", "Empathetic Communication",
    "Crisis Management", "Consensus Building", "Decision Facilitation", "Intercultural Competence",
    "Remote Collaboration", "Continuous Learning", "Remote Team Management", "Customer-Centric Mindset",
    "Change Management", "Cross-Cultural Communication", "Conflict Avoidance", "Respect for Diversity",
    "Emotional Regulation", "Constructive Feedback", "Facilitation Skills", "Team Performance Evaluation",
    "Work-Life Balance", "Customer Feedback Analysis", "Strategic Planning", "Value Proposition Development",
    "Service Excellence", "Feedback Analysis", "Stakeholder Management", "Innovation Management",
    "Business Development", "Problem Diagnosis", "Networking Skills", "Presentation Skills",
    "Customer Engagement", "Collaborative Problem Solving", "Decision Support",
    "Customer Satisfaction Enhancement", "Project Leadership"
]


def pdfparser(pdf_file):
    fp = open(pdf_file, 'rb')
    # pdf_content = pdf_file.read()
    # Use io.BytesIO to create a file-like object from the content
    # fp = io.BytesIO(pdf_content)

    rsrcmgr = PDFResourceManager()
    retstr = io.StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    
    for page in PDFPage.get_pages(fp):
        interpreter.process_page(page)
    
    text = retstr.getvalue()
    retstr.close()
    fp.close()
    
    return text


def extract_skills(text):
    extracted_skills = []
    for skill in technology_skills + soft_skills:
        if skill.lower() in text.lower():
            extracted_skills.append(skill)
    return extracted_skills

def calculate_skill_percentage(resume_skills, job_skills):
    res = 0
    for i in job_skills:
        if i in resume_skills:
            res += 1
    percentage = (res / len(job_skills)) * 100 if job_skills else 0
    return percentage

@app.route('/resumeMatcher', methods=['POST'])
def analyze_resume():
    if 'resume_file' not in request.files or 'job_file' not in request.files:
        return jsonify({"error": "Both resume and job description files are required."}), 400

    resume_file = request.files['resume_file']
    job_file = request.files['job_file']

    if resume_file.filename == '' or job_file.filename == '':
        return jsonify({"error": "Both resume and job description files must be selected."}), 400

    if resume_file and job_file:
        resume_filename = resume_file.filename
        job_filename = job_file.filename

        resume_file.save(os.path.join("uploads", resume_filename))
        job_file.save(os.path.join("uploads", job_filename))

        resume_text = pdfparser(os.path.join("uploads", resume_filename))
        job_text = pdfparser(os.path.join("uploads", job_filename))
        resume_skills = extract_skills(resume_text)
        job_skills = extract_skills(job_text)
        skill_match_percentage = calculate_skill_percentage(resume_skills, job_skills)

        return jsonify({
            "resume_skills": resume_skills,
            "job_skills": job_skills,
            "skill_match_percentage": skill_match_percentage
        }), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
