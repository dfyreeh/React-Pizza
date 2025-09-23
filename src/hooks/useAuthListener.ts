import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { doc, getDoc } from "firebase/firestore";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          name: userData.name ?? "",
          surname: userData.surname ?? "",
          phoneNumber: userData.phoneNumber ?? "",
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};
