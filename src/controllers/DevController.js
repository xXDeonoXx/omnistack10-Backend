const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    // desconstrução das variaveis da requisição
    const { github_username, techs, latitude, longitude } = req.body;

    // Checa se Dev ja existe e retorna ele
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      // tratamento do array contendo todas as 'techs' enviadas
      const techsArray = parseStringAsArray(techs);

      // resposta da pesquisa do perfil do github
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      // desconstrução das informações do GitHub
      const { name = login, avatar_url, bio } = apiResponse.data;

      // coordenadas
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      // criação da entry
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  }
};
