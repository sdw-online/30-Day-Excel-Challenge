import pandas as pd
import os 
from dotenv import load_dotenv


# -- 1. Set up constants + variables
load_dotenv()

ROOT_PATH_OF_DATASET    = os.getenv("ROOT_PATH_OF_DATASET")
file_name               = "monthly_sales_data"



# -- 2. Create synthetic dataset 
dataset = {
    "Date": ["01/01/2024", "01/02/2024", "01/03/2024", "01/04/2024", "01/05/2024", "01/06/2024", "01/07/2024"],
    "Region": ["North", "South", "East", "West", "North", "East", "West"],
    "Product": ["Electronics", "Clothing", "Furniture", "Electronics", "Clothing", "Furniture", "Electronics"],
    "Sales Amount (£)": [1200, 900, 750, 1500, 1000, 800, 1600],
    "Units Sold": [15, 30, 10, 18, 25, 12, 20],
    "Discount (%)": [10, 15, None, 20, None, 5, None]
}



# -- 3. Convert data into a dataframe
monthly_sales_data = pd.DataFrame(dataset)


# -- 4. Save to Excel
monthly_sales_data.to_csv(f"{ROOT_PATH_OF_DATASET}/{file_name}.csv", 
                          index=False, 
                          encoding="utf-8-sig")