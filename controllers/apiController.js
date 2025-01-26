const axios = require('axios');

exports.getAllCharacters = async (req, res) => {
    
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = response.data.results;
        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los personajes');
    }
};


exports.getCharacterByName = async (req, res) => {
    const characterName = req.params.name;

    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
        const character = response.data.results[0];

        if (character) {
            res.json(character);
        } else {
            res.status(404).send('Personaje no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el personaje');
    }
};