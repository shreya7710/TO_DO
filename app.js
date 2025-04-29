require('dotenv').config();
const express = require('express')
const Groq = require('groq-sdk');
const app = express()
const port = 3000


const client = new Groq({
  apiKey: process.env['GROQ_API_KEY']
});


app.use(express.json());


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
  

  // install groq sdk (external package)

