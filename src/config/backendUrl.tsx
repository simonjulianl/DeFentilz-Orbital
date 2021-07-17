let url: string;
switch (process.env.ENVIRONMENT) {
  case "TEST":
    url = "http://localhost:5000";
    break;
  case "PRODUCTION":
    url = "https://bonus-server.herokuapp.com";
    break;
  default:
    url = "http://localhost:5000";
    break;
}

const APIStarter = {
  facilities: "/api/facilities",
  users: "/api/users",
  rewards: "/api/rewards",
  bookings: "/api/bookings",
  walletRequests: "/api/walletRequests",
};

// TODO : Populate this
const APIUrl = {
  // user endpoints
  createUser: url + APIStarter.users,
  getSingleUserByEmail: url + APIStarter.users,
  getUsersByName: url + APIStarter.users + "/name",
  getUsersByEmail: url + APIStarter.users,
  topUpWalletValue: url + APIStarter.users + "/topUp",
  deleteSingleUser: url + APIStarter.users,

  // facility endpoints
  getAllFacilities: url + APIStarter.facilities,
  getSingleFacility: url + APIStarter.facilities,
  getFacilitiesByName: url + APIStarter.facilities + "/name",
  getFacilitiesByType: url + APIStarter.facilities + "/type",
  updateFacility: url + APIStarter.facilities,
  postFacilityImage: url + APIStarter.facilities + "/images",
  createFacility: url + APIStarter.facilities,
  deleteSingleFacility: url + APIStarter.facilities,

  // booking endpoints
  createBooking: url + APIStarter.bookings,
  getEntireBookings: url + APIStarter.bookings + "/facility",
  getBookingByEmail: url + APIStarter.bookings + "/user",
  getBookingForAWeek: url + APIStarter.bookings + "/facility/week",
  getBookingForAMonth: url + APIStarter.bookings + "/facility/month",
  deleteSingleBooking: url + APIStarter.bookings,

  // wallet request endpoints
  createWalletRequest: url + APIStarter.walletRequests,
  getAllWalletRequests: url + APIStarter.walletRequests,
  deleteWalletRequestById: url + APIStarter.walletRequests,
};

export default APIUrl;
