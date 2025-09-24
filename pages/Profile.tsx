// src/pages/Profile.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../src/firebase/firebase";
import { clearUser, setUser } from "../store/userSlice";
import type { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Container, Title } from "@/components/shared";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Profile: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const ref = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(ref);

          let name = "";
          let surname = "";
          let phoneNumber = "";

          if (docSnap.exists()) {
            const data = docSnap.data();
            name = data.name ?? "";
            surname = data.surname ?? "";
            phoneNumber = data.phoneNumber ?? "";
          }

          dispatch(
            setUser({
              uid: currentUser.uid,
              email: currentUser.email ?? "",
              name,
              surname,
              phoneNumber,
            })
          );
        } catch (err) {
          console.error("Помилка під час завантаження даних користувача:", err);
        }
      } else {
        dispatch(clearUser());
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loadingUser)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-t-orange-500 border-r-orange-500 border-b-orange-500 border-l-transparent rounded-full animate-spin"></span>
      </p>
    );

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    toast.success("Ви вийшли з облікового запису!");
    navigate("/login");
  };

  return (
    <Container className="flex justify-center h-[100vh] items-center">
      <div
        className={cn(
          "w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] flex flex-col gap-2 sm:gap-3",
          className
        )}
      >
        <div className="flex justify-center items-center mb-3">
          <Title className="font-bold" text="Профіль" size="xl" />
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="shadow-sm h-[50px] sm:h-[55px] md:h-[60px] flex items-center pl-6 sm:pl-8 md:pl-10 rounded-2xl text-base sm:text-lg">
            <span className="mr-2 font-bold">Email:</span>
            {user.email || "-"}
          </div>
          <div className="shadow-sm h-[50px] sm:h-[55px] md:h-[60px] flex items-center pl-6 sm:pl-8 md:pl-10 rounded-2xl text-base sm:text-lg">
            <span className="mr-2 font-bold">Ім'я:</span>
            {user.name || "-"}
          </div>
          <div className="shadow-sm h-[50px] sm:h-[55px] md:h-[60px] flex items-center pl-6 sm:pl-8 md:pl-10 rounded-2xl text-base sm:text-lg">
            <span className="mr-2 font-bold">Прізвище:</span>
            {user.surname || "-"}
          </div>
          <div className="shadow-sm h-[50px] sm:h-[55px] md:h-[60px] flex items-center pl-6 sm:pl-8 md:pl-10 rounded-2xl text-base sm:text-lg">
            <span className="mr-2 font-bold">Телефон:</span>
            {user.phoneNumber || "-"}
          </div>
        </div>

        <Button className="h-[50px] text-lg font-medium" asChild>
          <Link to="/profile/edit">Редагувати</Link>
        </Button>
        <Button
          className="h-[50px] bg-red-600 hover:bg-red-500 text-lg font-medium"
          onClick={handleLogout}
        >
          Вийти
        </Button>
        <Link
          to="/ "
          className=" h-[54px] flex items-center justify-center gap-3
                   text-[oklch(0.705_0.213_47.604)] transition-all rounded-2xl  hover:bg-[#ff6a001a] text-lg font-bold"
        >
          Головна
        </Link>
      </div>
    </Container>
  );
};
