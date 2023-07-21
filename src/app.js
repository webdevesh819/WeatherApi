const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// This is to find the absolute path 
// console.log(__dirname)

// path.join (takes to argument 1 path , 2nd field that needs to be edited in that path)
// console.log(path.join(__dirname, '../public'))

// it gives us to the whole drectoryt
// #* DEFINE PATH FOR EXPRESS CONFIG
const publicdirpath = path.join(__dirname, '../public');

//express is a functon ,we call it once and use its properties,and methods
const app = express();


const port = process.env.PORT|| 3000;




// Handlebars allows us to  render dynamic content
// hbs (handlebars plugin) it use handlebars behind the scene 
//it is a templating  engine it allows 


// set allows to set a value to a given expresss setting
// we have key and value------here we set view engine as hbs

// #* Setup handle bar engines
app.set('view engine', 'hbs')



// TO RENAME VIEWS FILE AND change its directory
// #* DEFINE PATH FOR EXPRESS CONFIG
const viewsPath = path.join(__dirname, '../templates/views')

const partialPaths = path.join(__dirname, '../templates/partials')

// now we set this path for views
// this way we can put what ever name and ehatever directory we ewant


//#* setup views loaction
app.set('views', viewsPath);

hbs.registerPartials(partialPaths);


// this is to customize to server----this server the directory
// that has been set hear
app.use(express.static(publicdirpath))



// app.get() => this is to handle get requests


// this would take two arguments --1- is routes
//     e.g. => app.com  
//     app.com/about
//     app.com/contact 

// //     here i1st argument route is blank String, about   , and contact
// express route handler => this also take 2nd argument is a function which describes whhat to d0 when route visited
//     function called with 2 arguments 
//         1- req = (request) -> it is an object contains info about incoming request
//         2- res= (response) ->  this contains methods allowings us to customize what to send back to requester


app.get('', (req, res) => {
    // it allows to render handlebar template using view engine
    // first argument is file that is going to be rendered
    // second argument is an object which can conttain dynamic values
    // and can be used to dynamically allocate values in hbs file  
    res.render('index', {
        title: 'Weather app',
        name: "Deves Sharma"
    });
    // express goes to view 
    // converts it into html and shows it 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: "Deves Sharma"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help',
        name: "Deves Sharma"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
       return res.send({error:'please give a addrss'})
    }
    else{
        geocode(req.query.address,(error,{lat,long}={})=>{

            if(error)
            {
                return res.send({error})
            }
            else
            {
                forecast(lat,long,(error,response)=>{
                    if(error)
                    {
                        return res.send({error})
                    }
                    else{
                       // console.log(response);

                        res.send(
                            response
                        )
                    }
                })
            }
        })
    }
    
})



// You only send one response back to client
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({error:'please serch something'})
    }
    res.send({products:[]})
}
)


// This is gonna take all the request after /help/ route 
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        errorMessage:'help article not found',
        name:'Deves Sharma'
    })
})



// here * is a wildcard character which tell to match anything
// that hasn't been matched yet ( its kind like else)

// it needs to come last
// coz when request comes it matches in hererical oder from top to bottom
// whenver it gets matches it stops and serve that
// so when none matches the get request come to last and enters in 
// wild card character which says everything works
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        errorMessage:'Page not found',
        name:'Deves Sharma'
    })
})



app.listen(port, () => {
    console.log('server is up on port ' + port)
})





// req object contains query  which in turn contains all queries
