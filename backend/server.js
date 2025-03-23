const express = require('express');
const app = express();
const generate = require('./character.js');
const allName = generate();

app.use(express.json());

const url = 'http://35.200.185.69:8000';

const extractName = async (num,query,retries=3,delay=500) => {
    for(let i=0;i<retries;i++){

        try {
          const response = await fetch(`${url}/v${num}/autocomplete?query=${query}`);
          if(!response.ok){
            console.error(`Failed request(Attemp${attempt+1}):${response.status}`);
            if(response.status===429){
                console.log(`Rate limited! Retrying after ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
                
            }
            throw new Error(`HTTP Error: ${response.status}`);
          }
          const data = await response.json();
          
      
          return data.results || [];
        } catch (error) {
            console.error(`Error fetching names:`, error);
            await new Promise(resolve => setTimeout(resolve, delay));
            return [];
        }
    }
};

const extractAllName = async (num) => {
  const uniqueNames = new Set();
  let requestDelay = 300;
  
  for (let i = 0; i < allName.length; i++) {
    try {
      const results = await extractName(num,allName[i],3,requestDelay);
      if (Array.isArray(results)) {
        results.forEach(name => uniqueNames.add(name));
      }
      console.log(`Processed ${i + 1}/${allName.length} names, found ${uniqueNames.size} unique names so far`);
      if(results.length===0){
        requestDelay+=200;
      }else{
        requestDelay=Math.max(300,requestDelay-100);
      }
    } catch (error) {
      console.error(`Error processing ${allName[i]}:`, error);
    }
  }
  
  return Array.from(uniqueNames);
};

app.get('/api/names', async (req, res) => {
  try {
    const query = req.query.q;
    const num = req.query.num || '1';

    if (query) {
      console.log(`Searching for names matching: ${query}`);
      const searchResults = await extractName(num,query);
      res.json(searchResults);
    } else {
      console.log('Extracting all names...');
      const allNames = await extractAllName(num);
      console.log(`Extracted ${allNames.length} unique names`);
      res.json(allNames);
    }
  } catch (e) {
    console.error('Server Error:', e);
    res.status(500).send('Server Error');
  }
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

