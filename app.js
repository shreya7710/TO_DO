require('dotenv').config();
const express = require('express')
const Groq = require('groq-sdk');
const app = express()
const port = 3000


const client = new Groq({
  apiKey: process.env['GROQ_API_KEY']
});




app.use(express.json());
// ✔️ express.json() is a built-in middleware function in Express.
// ✔️ app.use(...) is used to apply middleware globally to all incoming requests.
// ✔️ It parses incoming JSON request bodies and makes the data available as a JavaScript object in req.body.

// Converts raw JSON string into a usable JavaScript object.
// Example: { "name": "Shreya" } becomes req.body.name → 'Shreya'.


// Simplifies Code:
// No need to manually parse JSON using JSON.parse().

// Required for APIs:
// Essential when building REST APIs where clients send data in JSON format.






// When a client (like Postman, frontend app, or another server) sends data to your backend using:

// POST (e.g., submit a form),

// PUT (e.g., update a record),

// PATCH (e.g., partially update something),

// ...and that data is sent in JSON format (like { "name": "Shreya" }),
// then your Express server needs to read and understand that JSON.

// But Express cannot understand raw JSON by itself.
// That's why you need:

// js
// Copy
// Edit
// app.use(express.json());






app.get('/hello', (req, res, next) => {
  res.status(201).json({
      "msg":'Hello this is get  Request!'}
  )

})



app.post('/prompt', async (req, res, next) => {



  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: req.body.prompt }],
    model: 'llama3-8b-8192',
  });

  console.log(chatCompletion['choices[0].message.content']);

    // res.status(201).json({
    //     "msg":'Hello I am post API Request!'}
    // )
  
    res.status(201).json({
      response:chatCompletion.choices[0].message.content}
  )
  })


 
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  

  //==================================
  // install groq sdk (external package)

