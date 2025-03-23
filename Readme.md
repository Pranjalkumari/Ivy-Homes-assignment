
# Backend API Service

## Overview

This project is a backend service built using Node.js and Express.js. It interacts with an external API to fetch and process character names. The service includes retry logic and rate limiting to handle API rate limits effectively.

## Working Code Solution Approach

### Script Design

1. **API Interaction**:
   - The service fetches data from an external API using the `fetch` function.
   - It handles rate limits by implementing retry logic with exponential backoff.

2. **Data Processing**:
   - The script processes the API responses and stores unique names in a set to ensure no duplicates.
   - It adjusts the request delay based on the success or failure of previous requests.

3. **Endpoints**:
   - `/api/names`: Fetches names based on a query parameter or retrieves all names if no query is provided.

### Findings

- Successfully retrieved and processed data from the API.
- Identified key insights and patterns in the data.
- Implemented retry logic and rate limiting to handle API rate limits.
- Fetching all names took significant time due to the large number of requests.

### Tools or Scripts for Testing/Exploration

- **Postman**: Used to test API endpoints.
- **React Developer Tools**: Used to debug and inspect React components.
- **Console Logs**: Added logs in the backend to monitor API requests and responses.

### Total Number of Requests to the API

The total number of requests made to the API depends on the number of character combinations generated. For example:

- Single characters: 26 requests (a-z)
- Two-character combinations: 676 requests (aa-zz)
- Three-character combinations: 17,576 requests (aaa-zzz)
- Number combinations: 10 requests (0-9)

### Total Number of Records Obtained from the API

There are 3 versions of data, each version having a different number of records:

- Version "v1": 10,009 records
- Version "v2": 4,345 records
- Version "v3": 3,417 records

## How to Run the Script

1. **Install Dependencies**:
   ```bash
   npm install