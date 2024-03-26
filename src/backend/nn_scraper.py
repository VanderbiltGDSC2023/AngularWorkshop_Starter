from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import datetime
import os
import google.generativeai as genai
import json
import firebase_admin
from firebase_admin import db

today = datetime.datetime.today().strftime("%d %B %Y")
tomorrow_raw = datetime.datetime.today() + datetime.timedelta(days=1)
tomorrow = tomorrow_raw.strftime("%d %B %Y")
DINING_HALLS = ["The Commons Dining Center", "Rothschild Dining Center - Contains Peanuts & Treenuts", "Zeppos Dining", "E. Bronson Ingram Dining Center"]
it = 0
DINING_HALLS_SHORT = ["Commons", "Rothschild", "Zeppos", "EBI"]

# Open the Selenium webdriver
for it in range(0, 4):
    i = DINING_HALLS[it] # Select the name of the dining hall for the web scraping
    driver = webdriver.Chrome() # Open the web driver.
    driver.get("https://netnutrition.cbord.com/nn-prod/vucampusdining") # Get Net Nutrition

    link_element = driver.find_element(By.XPATH, f"//a[@tabindex='0' and @href='#' and @class='cbo_nn_unitNameLink unit__name-link ' and text()='{i}']")
    link_element.click() # Find the dining hall and select it.

    wait = WebDriverWait(driver, 10) # Wait up to 10 seconds before timing out. New dining hall must load.
    wait.until(EC.presence_of_element_located((By.XPATH, "//div[@id='cbo_nn_menuListDiv']"))) # When the menu is loaded, stop waiting.

    dinner_link = driver.find_element(By.XPATH, "//a[contains(@onclick, 'menuListSelectMenu') and contains(., 'Dinner')]") # Click on "Dinner"
    dinner_link.click()
    wait = WebDriverWait(driver, 10) # Wait up to 10 seconds before timing out.
    wait.until(EC.presence_of_element_located((By.XPATH, "//div[@class='cbo_nn_itemHeaderDiv']")))
    
    grid_cells = driver.find_elements(By.CSS_SELECTOR, 'td[role="gridcell"]') # Select all the menu categories.

    BANNED_ITEMS = ["Condiments", "Pho", "Salad Bar", "Magnolia & Co", "Crafted Flatbreads"] # BORING. These clog up the results.
    food_list = []
    for cell in grid_cells:
        if not cell.text in BANNED_ITEMS: 
            cell.click()
            wait = WebDriverWait(driver, 10)
            foods = driver.find_elements(By.XPATH, "//a[@class='cbo_nn_itemHover']")
            for food in foods: 
                if food.text != "":
                    food_list.append(food.text)
            cell.click()
    driver.close()
    
    GOOGLE_API_KEY = "AIzaSyDWowSKJgFAwrPhrVYtfdKeURZs5YJh2p0" 
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
    stringified_food_list = ', '.join(food_list)
    fstring = f'''The following is a list of food items from a dining hall. 
                Classify them into one of four categories: main item, side item, 
                grains, and fruits/vegetables. Return the result as json and format it using
                markdown. The 4 lists should be named as main_items, side_items, fruits_vegetables, grains. 
                {stringified_food_list}'''
    response = model.generate_content(fstring)
    substr_of_res = response.text[response.text.index("{"):response.text.index("}")+1]
    obj = json.loads(substr_of_res)
    print(obj)
    if not firebase_admin._apps: # Check if the app is initialized. 
        cred_obj = firebase_admin.credentials.Certificate('backend/workshop7_config.json')
        default_app = firebase_admin.initialize_app(cred_obj, {
        'databaseURL': "https://workshop7-f6f8b-default-rtdb.firebaseio.com"
    }) 
    ref = db.reference(f'/{DINING_HALLS_SHORT[it]}')
    ref.set(obj)