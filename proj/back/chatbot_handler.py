from chatbot import app

# Serverless handler
def handler(event, context):
    return app(event, context)