import google.generativeai as genai
# Use this code to test your API key.

gemini_api_key = "AIzaSyDWowSKJgFAwrPhrVYtfdKeURZs5YJh2p0" # Hide this in a .env.
genai.configure(api_key=gemini_api_key)
query = input ("What content would you like me to produce? :")
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content(query) 
print(response.text)