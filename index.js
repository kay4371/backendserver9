const unirest = require ('unirest')
const cheerio = require ('cheerio')
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/hello', (req, res) => {
  res.send('Great! I am the greatest')
})

app.get('/great', (req, res) => {
  res.send('Great! Success at last')
})


// app.post('/checkname', function (req, res) {
//   res.status(401).send({ message: "Sorry, no Homer's!" });

//   res.send({
//     passed: true,
//     message: 'Welcome, friend!',
//   });
// });


// app.get('/checkname/:name', function (req, res) {
//   if (req.params.name.toLowerCase() === 'homer') {
//     res.status(401).send({ message: "Sorry, no Homer's!" });
//   } else {
//     res.json('Welcome!');
//   }
// });


app.post('/checkname', function (req, res) {
  // if (req.body.name.toLowerCase() === 'homer') {
//     res.status(401).send({ message: "Sorry, no Homer's!" });
res.send( req.body.name );
// res.json( req.body.name );
    const getOrganicData = () => {
      let user_location=(req.body.name);//the users location details is received from here
       let userspecific = ("crime"+user_location);
     let weblink=("https://www.google.com/search?q="+userspecific+"&gl=us&hl=en");
      return unirest
       // .get("https://www.google.com/search?q=lagosadeolaodekucrimeinsecurityadeola-odeku&gl=us&hl=en")
       .get(weblink)
        .headers({
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        })
        .then((response) => {
          let $ = cheerio.load(response.body);
    
          let titles = [];
          let links = [];
          let snippets = [];
          let displayedLinks = [];
    
          $(".yuRUbf > a > h3").each((i, el) => {
            titles[i] = $(el).text();
          });
          $(".yuRUbf > a").each((i, el) => {
            links[i] = $(el).attr("href");
          });
          $(".g .VwiC3b ").each((i, el) => {
            snippets[i] = $(el).text();
          });
          $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
            displayedLinks[i] = $(el).text();
          });
    
          const organicResults = [];
    
          for (let i = 0; i < titles.length; i++) {
            organicResults[i] = {
              title: titles[i],
              links: links[i],
              snippet: snippets[i],
              displayedLink: displayedLinks[i],
            };
          }
          console.log(organicResults)
        });
    };
    
    getOrganicData();

});


app.get('/checkname/:name', function (req, res) {
  if (req.params.name.toLowerCase() === 'homer') {
    res.status(401).send({ message: "Sorry, no Homer's!" });
  } else {
    res.json('Welcome!');
  }
});



  //view
  app.post('/view', async function (req, res) {
    try {
      await client.connect();
      const database = client.db('olukayode_sage');
      const kaydata = database.collection('olukayode_collection');
  
      const findResult3 = await kaydata.find({}).toArray();
      console.log('Found documents =>', findResult);
  
      //This query returns all the documents in the documents collection. If you add this below the insertMany example you'll see the document's you've inserted.
      console.log("Entry displayed successfully");
    } finally {
      await client.close();
    }
  });


  app.get('testing', function (req, res) {
   let a = 2
   let b =3
   c=a*b
    console.log(c)
    }
  );
 

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

  
