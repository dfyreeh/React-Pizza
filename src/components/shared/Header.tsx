import React from "react";
import { cn } from "@/lib/utils";
import { Container, CartButton } from "./index";
import LogoImg from "@/assets/logo.png";
import { Button } from "../ui";
import { Link, useNavigate } from "react-router-dom";
import { SearchInput } from "./Search-input";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "../../../store/userSlice";
import { auth } from "@/firebase/firebase";
interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email ?? "",
            name: currentUser.displayName ?? "",
            surname: "",
            phoneNumber: currentUser.phoneNumber ?? "",
          })
        );
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Ліва частина */}
        <Link to="/">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <img
              src={LogoImg}
              alt="Logo"
              className="w-6 h-6 sm:w-8 md:w-9 flex-shrink-0"
            />
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-xl md:text-2xl uppercase font-black">
                React Pizza
              </h1>
              <p className="text-[10px] sm:text-sm text-gray-400 leading-3 hidden sm:block">
                смачніше не буває
              </p>
            </div>
          </div>
        </Link>

        <div className="mx-10 flex-1 hidden sm:block">
          <SearchInput />
        </div>

        {/* Права частина */}
        <div className="flex items-center gap-2 sm:gap-3">
          {loading ? (
            <Button
              variant="outline"
              className="flex items-center gap-1 text-sm sm:text-base"
            >
              <User size={16} />
            </Button>
          ) : user.uid ? (
            <Button
              onClick={handleProfileClick}
              variant="outline"
              className="flex items-center gap-1 text-sm sm:text-base"
            >
              <User size={16} /> Профіль
            </Button>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                className="flex items-center gap-1 text-sm sm:text-base hover:bg-orange-500 hover:text-white"
              >
                <User size={16} /> Вхід
              </Button>
            </Link>
          )}

          <CartButton />
        </div>
      </Container>
    </header>
  );
};
