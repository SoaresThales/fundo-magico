# Fundo Magico - AI Background Generator

A web application that generates dynamic background styles using AI, n8n, and Google Gemini. You provide a text description, and the AI generates custom HTML and CSS, rendering a real-time preview on the screen.

## Demo


## Technologies
- HTML, CSS, JavaScript (Vanilla)
- n8n (Workflow Automation)
- Google Gemini API (LLM)
- Webhooks

## Architecture Flow
Frontend -> n8n Webhook -> Gemini AI -> JSON Parse (HTML/CSS) -> Frontend DOM Injection

## How to run locally

1. Clone the repository:
``bash
git clone [https://github.com/yourusername/fundo-magico.git](https://github.com/yourusername/fundo-magico.git)
``
2. Configure the webhook:
Duplicate the src/js/config.example.js file, rename it to src/js/config.js, and insert your local n8n webhook URL:
``bash
window.config = {
  webhookUrl: "YOUR_N8N_WEBHOOK_URL"
};
``  

Security Notice
For security reasons, this public repository does not include:

Real production endpoints

API credentials or keys

The internal n8n workflow structure

To run this project fully, you must configure your own local n8n instance and provide a valid Google Gemini API key.

Project Goals
This project was built as a study case to explore:

AI integration via APIs

Back-end orchestration and automation with n8n

Dynamic UI generation and DOM manipulation

Front-end and AI architecture communication
