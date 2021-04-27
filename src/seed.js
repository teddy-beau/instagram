// NOTE: replace 'UTtayLBlLMdrGYV0rF9oBQJMdO83' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
   const users = [
      {
         userId: "UTtayLBlLMdrGYV0rF9oBQJMdO83",
         username: "teddy",
         fullName: "Teddy Beau",
         emailAddress: "hello@teddy-beau.com",
         following: ["2"],
         followers: ["2", "3", "4"],
         dateCreated: Date.now(),
      },
      {
         userId: "2",
         username: "zouzou13",
         fullName: "Zouzou",
         emailAddress: "zouzou13@gmail.com",
         following: [],
         followers: ["UTtayLBlLMdrGYV0rF9oBQJMdO83"],
         dateCreated: Date.now(),
      },
      {
         userId: "3",
         username: "marcopolo",
         fullName: "Marco",
         emailAddress: "marco@polo.com",
         following: [],
         followers: ["UTtayLBlLMdrGYV0rF9oBQJMdO83"],
         dateCreated: Date.now(),
      },
      {
         userId: "4",
         username: "christine1991",
         fullName: "Christine",
         emailAddress: "christine1991@gmail.com",
         following: [],
         followers: ["UTtayLBlLMdrGYV0rF9oBQJMdO83"],
         dateCreated: Date.now(),
      },
   ];

   // eslint-disable-next-line prefer-const
   for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection("users").add(users[k]);
   }

   // eslint-disable-next-line prefer-const
   for (let i = 1; i <= 4; ++i) {
      firebase
         .firestore()
         .collection("photos")
         .add({
            photoId: i,
            userId: "2",
            imageSrc: `/images/users/zouzou12/${i}.jpg`,
            caption: "New outfit!",
            likes: [],
            comments: [
               {
                  displayName: "christine1991",
                  comment: "Love this, looks like my next purchase!",
               },
               {
                  displayName: "marcopolo",
                  comment: "Would you mind if I used this picture?",
               },
            ],
            userLatitude: "40.7128°",
            userLongitude: "74.0060°",
            dateCreated: Date.now(),
         });
   }
}
