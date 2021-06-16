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
};

export default APIUrl;
