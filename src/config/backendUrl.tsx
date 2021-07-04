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
  createUser: url + APIStarter.users,
  getSingleUserByEmail: url + APIStarter.users,
  getUsersByName: url + APIStarter.users + "/name",
  getSingleFacility: url + APIStarter.facilities,

  getAllFacilities: url + APIStarter.facilities,
  getFacilitiesByName: url + APIStarter.facilities + "/name",
  getFacilitiesByType: url + APIStarter.facilities + "/type",
  updateFacility: url + APIStarter.facilities,
  postFacilityImage: url + APIStarter.facilities + "/images",
  createFacility: url + APIStarter.facilities,
  deleteSingleFacility: url + APIStarter.facilities,

  createBooking: url + APIStarter.bookings,
  getEntireBookings: url + APIStarter.bookings + "/facility",
  getBookingForAWeek: url + APIStarter.bookings + "/facility/week",
  getBookingForAMonth: url + APIStarter.bookings + "/facility/month",
  deleteSingleBooking: url + APIStarter.bookings,
};

export default APIUrl;
