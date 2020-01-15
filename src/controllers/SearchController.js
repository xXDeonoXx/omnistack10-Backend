const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;
    const techsArray = parseStringAsArray(techs);

    /**
     * pesquisa de entries filtradas usando Query e Projection Operators
     * do mongoose, ref --> https://docs.mongodb.com/manual/reference/operator/query/
     */
    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    console.log(req.query);

    return res.json({ devs });
  }
};
