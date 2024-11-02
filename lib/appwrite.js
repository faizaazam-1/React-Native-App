import { ID, Account, Client } from "react-native-appwrite";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "671f08850029e1b17070",
  databaseId: "671f0ac60017a5026252",
  userCollectionId: "671f0afa000e25c6c981",
  videoCollectionId: "671f0b37003e3aa407db",
  storageId: "671f159c0001e43d1d5d",
};

// Init your React Native SDK
const client = new Client();
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);

//test function
// export const creatUser = () => {
//   // Register User
//   account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
//     function (response) {
//       console.log(response);
//     },
//     function (error) {
//       console.log(error);
//     }
//   );
// };

export const creatUser = () => {};

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
