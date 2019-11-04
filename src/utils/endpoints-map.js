
const endpointsMap = {
  profile: 'api/v1/profile',
  venuesList: 'api/v1/venues',
  signIn: 'api/v1/auth/signin',
  singUp: 'api/v1/auth/signup',
  cancelGame: 'api/v1/game/cancel',
  venueDetails: 'api/v1/venues/info',
  venueUpdate: 'api/v1/venues/update',
  gamesList: 'api/v1/games/gathering',
  createVenue: 'api/v1/venues/create',
  profileUpdate: 'api/v1/profile/update',
  getTimeslot: 'api/v1/venues/timeslots',
  addTimeslot: 'api/v1/venues/addtimeslot',
  addValueImage: 'api/v1/venues/addimage',
  getSportTypes: 'api/v1/other/sporttypes',
  addDocumets: 'api/v1/profile/adddocument',
  confirmGameUser: 'api/v1/game/confirmuser',
  addProfileAvatar: 'api/v1/profile/addavatar',
  updatePassword: 'api/v1/auth/password/update',
  deleteValueImage: 'api/v1/venues/deleteimage',
  addVenueDocumets: 'api/v1/venues/adddocument',
  supportedCities: 'api/v1/other/supportedcities',
  recoveryPassword: 'api/v1/auth/password/recovery',
  getVenueTimeslots: 'api/v1/venues/venuetimeslots',
  deleteProfileDocument:'api/v1/profile/deletedocument',
};

export default endpointsMap;
