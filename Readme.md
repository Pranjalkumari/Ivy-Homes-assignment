
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
- Version-based character distribution:

Version 1: Supports a-z, aa-zz, aaa-zzz (only small alphabets)

Version 2: Supports a-z, aa-zz, 0-9, 00-99

Version 3: Supports a-z, aa-zz, aaa-zzz, and special characters (,, ., +, -)

-Some queries returned an empty result set, indicating that certain inputs do not yield results across all API versions.

-Version 3 of the API appears to return more complex or formatted names, while version 1 and version 2 have more constraints on what queries yield results.

-Queries with single characters, especially numbers, do not always return results consistently across different API versions.

-Certain patterns suggest that some characters or symbols may be more frequently present in API responses than others.

-The API might have an internal filtering mechanism that affects the count and type of results returned.

-Version 3 contains arithmetic operations in some of its responses, as seen in query results.

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


# Additional Analysis:

-Version Differences:

Version 3 appears to have more variations in responses, sometimes returning formatted text or encoded strings.

Version 1 and Version 2 have stricter constraints and do not return results for many queries.

The difference in count values between versions suggests varying levels of data filtering. 

Version 3 contains arithmetic operations in some query responses, suggesting it may process or generate different types of data.

-Rate Limit Behavior:

A gradual increase in request delay improves API response rates.

Empty responses may indicate temporary restrictions or data availability differences per query.

-Query-Based Trends:

Some letters and symbols might be more likely to yield results than others.

The presence of special characters in some responses suggests that API data might contain encoded values or additional metadata.

## How to Run the Script

1. **Install Dependencies**:
   ```bash
   npm install
