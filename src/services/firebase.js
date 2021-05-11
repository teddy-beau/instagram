import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
   const result = await firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get();

   return result.docs.map((user) => user.data().length > 0);
}

// Get user from the Firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
   const result = await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", userId)
      .get();

   const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));
   return user;
}

export async function getUserByUsername(username) {
   const result = await firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get();

   return result.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function getSuggestedProfiles(userId, following) {
   const results = await firebase
      .firestore()
      .collection("users")
      .limit(10)
      .get();

   return results.docs
      .map((user) => ({
         ...user.data(),
         docId: user.id,
      }))
      .filter(
         (profile) =>
            profile.userId !== userId && !following.includes(profile.userId)
      );
}

export async function updateLoggedInUserFollowing(
   loggedInUserDocId, // currently logged in user document id
   profileId, // the user the logged in user has requested to follow
   isFollowingProfile // true/false (currently following or not?)
) {
   return firebase
      .firestore()
      .collection("users")
      .doc(loggedInUserDocId)
      .update({
         following: isFollowingProfile
            ? FieldValue.arrayRemove(profileId)
            : FieldValue.arrayUnion(profileId),
      });
}

export async function updateFollowedUserFollowers(
   profileDocId,
   loggedInUserDocId,
   isFollowingProfile
) {
   return firebase
      .firestore()
      .collection("users")
      .doc(profileDocId)
      .update({
         followers: isFollowingProfile
            ? FieldValue.arrayRemove(loggedInUserDocId)
            : FieldValue.arrayUnion(loggedInUserDocId),
      });
}

export async function getPhotos(userId, following) {
   const result = await firebase
      .firestore()
      .collection("photos")
      .where("userId", "in", following)
      .get();

   const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id,
   }));

   const photoWithUserDetails = await Promise.all(
      userFollowedPhotos.map(async (photo) => {
         let userLikedPhoto = false;
         if (photo.likes.includes(userId)) {
            userLikedPhoto = true;
         }
         const user = await getUserByUserId(photo.userId);
         const { username } = user[0];
         return { username, ...photo, userLikedPhoto };
      })
   );

   return photoWithUserDetails;
}

// export async function getUserIdByUsername(username) {
//    const result = firebase.firestore().collection("users").
// }

export async function getUserPhotosByUsername(username) {
   const [user] = await await getUserByUsername(username);
   const result = await firebase
      .firestore()
      .collection("photos")
      .where("userId", "==", user.userId)
      .get();

   return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
   }));
}

export async function isUserFollowingProfile(
   loggedInUserUsername,
   profileUserId
) {
   const result = await firebase
      .firestore()
      .collection("users")
      .where("username", "==", loggedInUserUsername)
      .where("following", "array-contains", profileUserId)
      .get();

   const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
   }));

   return response.userId;
}

export async function toggleFollow(
   isFollowingProfile,
   activeUserDocId,
   profileDocId,
   profileUserId,
   followingUserId
) {
   await updateLoggedInUserFollowing(
      activeUserDocId, // currently logged in user (me)
      profileUserId, // currently viewed userId
      isFollowingProfile // is the user following this profile ? boolean
   );
   await updateFollowedUserFollowers(
      profileDocId, // currently logged in user (me)
      followingUserId, // currently viewed userId requested to follow
      isFollowingProfile // is the user following this profile ? boolean
   );
}
