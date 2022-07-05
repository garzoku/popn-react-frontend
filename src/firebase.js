// tells firebase we are using storage in this app
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZmTWDGhS9Bex0bab4R-HdY2Q3vpHwAxA",
  authDomain: "upload-file-cc6cf.firebaseapp.com",
  projectId: "upload-file-cc6cf",
  storageBucket: "upload-file-cc6cf.appspot.com",
  messagingSenderId: "462839988359",
  appId: "1:462839988359:web:96204dac20b48f87e6b822",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
