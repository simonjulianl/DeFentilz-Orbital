switch (process.env.ENVIRONMENT) {
  case "TEST":
    var url = "http://localhost:5000";
    break;
  case "PRODUCTION":
    var url = "https://bonus-server.herokuapp.com";
    break;
  default:
    var url = "http://localhost:5000";
    break;
}

const APIStarter = {
  facilities: "/api/facilities",
  users: "/api/users",
  rewards: "/api/rewards",
  bookings: "/api/bookings",
};

// TODO : Populate this
const APIUrl = {
  getSingleUserByEmail: url + APIStarter.users,
  getUsersByName: url + APIStarter.users + "/name",
  getSingleFacility: url + APIStarter.facilities,
  getAllFacilities: url + APIStarter.facilities,
  updateFacility: url + APIStarter.facilities,
  postFacilityImage: url + APIStarter.facilities + "/images",
  createFacility: url + APIStarter.facilities,
};

export default APIUrl;
