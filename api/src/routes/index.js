const { Router } = require('express');
const axios = require('axios');
const cors = require('cors');
const { Dog, Mood } = require('../db');
const {APIKEY} = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const app = Router();
var DogApi = [];
var MoodDB = [];

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const getDog = async () => {
    try{

        let api = [];
        if( !DogApi.length){
            api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`).then(r => r.data);
            DogApi = api;
        } else {
            api = DogApi;
        }
        let BBDD = await Dog.findAll({ include: { model: Mood, attributes: ['name'], thorugh: {attributes: []}}});
        return [...api, ...BBDD];
    } catch (e){
        console.error(e);
    }
    
} 
const getMood = async () => {
    try{

        let moods = [];
        if( !MoodDB.length ){
            moods = await Mood.findAll();
            MoodDB = moods
        } else {
            moods = MoodDB;
        }
        return moods;
    } catch(e){
        console.error(e);
    }
}

app.get('/', (req, res) => {
    return res.json({data : 'Bienvenidos a la api'})
})
app.get('/dogs',async (req, res) => {
    try{

        let {name} = req.query;
        let dogs = await getDog();
        let razas = name
        ? dogs.filter( e => e.name.toLowerCase().includes(name.toLowerCase()))
        : dogs;
        
        razas = razas.map( e => {
            if ( e.id < 265){
                
                return {
                    id: e.id,
                    name : e.name,
                    weight : e.weight.metric,
                    image : e.image.url,
                    temperament : e.temperament
                }
            } else {
                let moods = e.Moods.map(e => e.dataValues.name).join(', ');
                
                return {
                    id: e.id,
                    name: e.name,
                    weight : e.weight,
                    image: e.image,
                    temperament: moods
                };
            }
        })
        razas.length? res.status(200).send(razas) : res.json({Error: 'No se encontró ninguna raza que corresponda'});
        
    } catch(e) {
        console.error(e);
    }
    
})

app.get('/dogs/:idRaza', async (req, res) => {
    try{

        const {idRaza} = req.params;
        let dogs = await getDog();
        let dog = dogs.find( e => String(e.id) === String(idRaza) ); 
        
        if(idRaza < 265){

            const url = dog.image.url;
            const perro = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${dog.name}&api_key=${APIKEY}`).then(r => r.data);
            
            const {name, weight,
                temperament,
                height, life_span
            } = perro[0];
            
            return res.json({name, weight: weight.metric,
                height: height.metric, temperament,
                url, life_span});
        } 
        let temperament = dog.Moods.map( e => e.dataValues.name).join(', ');
        res.status(200).json({name: dog.name, weight: dog.weight, 
            height: dog.height, temperament, url: dog.image, life_span: dog.years})
        
            
    } catch(e) {
        console.error(e);
    }

})
        
        
app.get('/temperament', async (req, res) => {

    let dog = await getDog();
    let alltemps = [];
    dog.map( e  => e.temperament).forEach( e => {
        if(e){

            let temps = e.split(', ');
            alltemps = [...alltemps, ...temps];
        }
    });
    let temps = alltemps.reduce((arr, e) => {

        if( arr.length) {
            return arr.includes(e) ? arr : [...arr, e]; 
        } else{

            return [...arr, e];
        }
    }, []);

    await Promise.all(temps.map(  e => Mood.findOrCreate({where: {name: e}, defaults : {name: e}}))) ;
    
    res.json(temps.sort());
    
    
})


app.post('/dog', async (req, res) => {
    try{

        let {name, height, weight, years, image, temperament} = req.body;
        let dog = await getDog();
        
        let doggie = await dog.find( e => e.name.toLowerCase() === name.toLowerCase());
        
        if ( doggie ) return res.send({msg : 'La raza ya existe'});
        name = name[0].toUpperCase() + name.slice(1);

        let moods = await getMood();
        let [obj, check] = await Dog.findOrCreate({
            where: { name},
            defaults: {name, height, weight, years, image}
        });

        let temps = await temperament.map( ele => moods.find( e => e.dataValues.name === ele ));
        
        temps = temps.map(e => e.dataValues.id);

         await obj.setMoods(temps);
        return check? res.status(200).send({msg: 'Raza creada con éxito'}) 
        : res.send({msg : 'La raza ya existe'});
        
    } catch(e){
        console.error(e);
    }
})

app.put('/:idRaza', async (req, res) => {
    try{
        
        let{name, weight, height, image, years, temperament} = req.body;
        let{idRaza} = req.params;
        await Dog.update({name, weight, height, image, years},
            {where:{id : idRaza}});
        let [obj] = await Dog.findAll({where : {id: idRaza}})
        
        let moods = await getMood();
        let temps = await temperament.map( ele => moods.find( e => e.dataValues.name === ele ));
    
        temps = temps.map(e => e.dataValues.id);

        await obj.setMoods(temps);
        return res.send({msg: 'Raza actualizada'});

    }catch(e){
        console.error(e);
    }
})

app.delete('/:idRaza', async (req, res) =>{
    try{

        const {idRaza} = req.params;
        await Dog.destroy({where: {id: idRaza}});
        res.status(200).send({msg: 'Raza eliminada'})
    } catch(e){
        console.error(e);
    }
})

//Good

module.exports = app;
