/**
 * Função usada para transformar uma string separada por virgulas em um array de strings
 */

module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map(tech => tech.trim());
};
