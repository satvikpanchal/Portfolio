from flask import Flask, render_template, request, jsonify, flash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send_message", methods=["POST"])
def send_message():
    if request.method == "POST":
        # Retrieve form data
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        # Input validation
        if not name or not email or not message:
            return jsonify({"status": "error", "message": "All fields are required!"})

        try:
            # Create email
            msg = MIMEMultipart()
            msg["From"] = EMAIL_ADDRESS
            msg["To"] = EMAIL_ADDRESS  # Change this to your desired recipient email
            msg["Subject"] = f"Contact Form Submission from {name}"

            # Email body
            body = f"""
            Name: {name}
            Email: {email}
            Message: {message}
            """
            msg.attach(MIMEText(body, "plain"))

            # Send email using Gmail's SMTP server
            with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
                smtp.starttls()  # Start TLS encryption
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)

            return jsonify({"status": "success", "message": "Message sent successfully!"})

        except Exception as e:
            return jsonify({"status": "error", "message": f"Failed to send message: {e}"})


if __name__ == "__main__":
    app.run(debug=True)