import { Slug } from "../types/slug";
import { updateUserData } from "./userDataHelper";

export function archiveListing(listingID: number, user: Slug) {
  const userDataClone: Slug = JSON.parse(JSON.stringify(user));
  userDataClone.archivedListingIDs.push(listingID);

  updateUserData(userDataClone);
}

export function unarchiveListing(listingID: number, user: Slug) {
  const userDataClone: Slug = JSON.parse(JSON.stringify(user));
  userDataClone.archivedListingIDs = userDataClone.archivedListingIDs.filter((id) => id !== listingID);

  updateUserData(userDataClone);
}

export function archiveUser(userID: number, user: Slug) {
  const userDataClone: Slug = JSON.parse(JSON.stringify(user));
  userDataClone.archivedUserIDs.push(userID);

  updateUserData(userDataClone);
}

export function unarchiveUser(userID: number, user: Slug) {
  const userDataClone: Slug = JSON.parse(JSON.stringify(user));
  userDataClone.archivedUserIDs = userDataClone.archivedUserIDs.filter((id) => id !== userID);

  updateUserData(userDataClone);
}
