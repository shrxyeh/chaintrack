#!/usr/bin/env python3
"""
QR Code Generator for Supply Chain App
Generates sample QR codes with product information in JSON format
"""

import json
import qrcode
import os
from datetime import datetime

# Sample product data
SAMPLE_PRODUCTS = [
  
    {
        "productId": "002", 
        "productName": "Premium Coffee Beans",
        "location": "Munnar, Kerela"
    }
   
]

def generate_qr_code(data, filename):
    """Generate QR code from data and save to file"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    print(f"Generated: {filename}")

def main():
    # Create output directory
    output_dir = "qr_codes"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    print("Generating QR codes for Supply Chain App...")
    print("=" * 50)
    
    # Generate QR codes for each product
    for product in SAMPLE_PRODUCTS:
        # Convert to JSON string
        json_data = json.dumps(product)
        
        # Create filename
        filename = f"{output_dir}/product_{product['productId']}_{product['productName'].replace(' ', '_')}.png"
        
        # Generate QR code
        generate_qr_code(json_data, filename)
    
    # Generate a sample with delimited format
    sample_delimited = "product-999|Test Product|Test Location"
    generate_qr_code(sample_delimited, f"{output_dir}/sample_delimited.png")
    
    print("\n" + "=" * 50)
    print(f"Generated {len(SAMPLE_PRODUCTS) + 1} QR codes in '{output_dir}' directory")
    print("\nSample QR code content (JSON format):")
    print(json.dumps(SAMPLE_PRODUCTS[0], indent=2))
    print("\nSample QR code content (delimited format):")
    print(sample_delimited)
    print("\nInstructions:")
    print("1. Scan any QR code with your app's scanner")
    print("2. The form should auto-fill with product name and location")
    print("3. Check the QR History tab to see scan records")

if __name__ == "__main__":
    main() 