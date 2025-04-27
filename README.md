# Movie Database Project Setup Instructions

## Overview
Inside the dataset folder, you will find movie details that can be added to your database. This data will be used to perform semantic search on the movies.

## Setup Steps

1. *Clone the repository* to your local machine.

2. *Create environment file*
   - Create an .env or .env.local file in the root directory of the project.
   - Inside the .env file, define the following environment variables:
     
     API_TOKEN=<your_together_ai_token>
     MONGODB_URI=<your_mongodb_connection_url>
     

3. *Install dependencies*
   bash
   npm install
   

4. *Start the development server*
   bash
   npm run dev
