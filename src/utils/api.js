const { RESTDataSource } = require("@apollo/datasource-rest");

class FlightApi extends RESTDataSource {
    baseURL = "http://localhost:4000/";
    getTracksForHome() {
        return this.get('tracks');
      }
  }
  module.exports = FlightApi;