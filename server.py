from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

# -----------------------
# Serve Frontend
# -----------------------
@app.route("/")
def serve_home():
    return send_from_directory(".", "index.html")

# -----------------------
# Simple Python AI Logic
# -----------------------
def simple_ai(message):
    message = message.lower()

    if "hello" in message or "hi" in message:
        return "Hello! How can I assist you today?"

    if "name" in message:
        return "My name is Python AI Assistant."

    if "time" in message:
        return "Current time: " + datetime.now().strftime("%H:%M:%S")

    if "date" in message:
        return "Today's date: " + datetime.now().strftime("%d-%m-%Y")

    if "bye" in message:
        return "Goodbye! Have a nice day 😊"

    return "Sorry, I didn't understand that, but I'm learning!"

# -----------------------
# Chat API
# -----------------------
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    ai_reply = simple_ai(user_message)
    return jsonify({"reply": ai_reply})

# -----------------------
# Run Server
# -----------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
    
@app.post("/admin-login")
def admin_login():
    data = request.get_json()
    
    if data["username"] == "admin" and data["password"] == "12345":
        return jsonify({"success": True})
    
    return jsonify({"success": False})
