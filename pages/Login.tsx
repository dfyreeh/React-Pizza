import React from "react";
import { Container, Title } from "@/components/shared";
import { cn } from "@/lib/utils";
import TextField from "@mui/material/TextField";
import { Button } from "../src/components/ui/index";
import Logo from "../src/assets/LogoLogin.png";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../src/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
interface Props {
  className?: string;
}

export const Login: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Отримуємо дані користувача з Firestore
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            name: userData.name ?? "",
            surname: userData.surname ?? "",
            phoneNumber: userData.phoneNumber ?? "",
          })
        );
        toast.success("Ви ввійшли до облікового запису!");
        navigate("/profile");
      } else {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            name: "",
            surname: "",
            phoneNumber: "",
          })
        );

        navigate("/profile/edit");
      }
    } catch (error: any) {
      console.error("Помилка входу:", error.message);
      toast.error("Не вдалося увійти. Перевірте email та пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className={cn("flex items-center justify-center h-[100vh] ", className)}
    >
      <div className="flex flex-col items-center gap-[1.5rem]">
        <div className="w-[360px] flex items-center justify-center">
          <img className="w-[160px] h-[160px]" src={Logo} alt="" />
        </div>

        <div className="w-[240px] sm:w-[280px] md:w-[300px] lg:w-[360px] text-center">
          <Title className="font-bold" text="Вхід в React Pizza" size="lg" />
        </div>

        <TextField
          className="w-[240px] h-[54px] rounded-2xl hover:border-primary sm:w-[280px] md:w-[300px] lg:w-[360px]"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",

              "&:hover fieldset": {
                borderColor: "oklch(0.705 0.213 47.604)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "oklch(0.705 0.213 47.604)",
                color: "oklch(0.705 0.213 47.604)",
              },
            },
            "&:hover .MuiInputLabel-root": {
              color: "oklch(0.705 0.213 47.604)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "oklch(0.705 0.213 47.604)",
            },
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="w-[240px] h-[54px] rounded-2xl hover:border-primary sm:w-[280px] md:w-[300px] lg:w-[360px]"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",

              "&:hover fieldset": {
                borderColor: "oklch(0.705 0.213 47.604)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "oklch(0.705 0.213 47.604)",
                color: "oklch(0.705 0.213 47.604)",
              },
            },
            "&:hover .MuiInputLabel-root": {
              color: "oklch(0.705 0.213 47.604)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "oklch(0.705 0.213 47.604)",
            },
          }}
          id="outlined-basic"
          label="Пароль"
          type="password"
          value={password}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-[240px] h-[54px] rounded-2xl hover:border-primary sm:w-[280px] md:w-[300px] lg:w-[360px]"
          onClick={handleLogin}
          loading={loading}
        >
          ВХІД
        </Button>

        <Link
          to="/loginVerify"
          className="w-[240px] h-[54px] rounded-2xl hover:border-primary sm:w-[280px] md:w-[300px] lg:w-[360px]   flex items-center justify-center gap-3
           text-[oklch(0.705_0.213_47.604)] transition-all    hover:bg-[#ff6a001a]"
        >
          РЕГЕСТРАЦІЯ
        </Link>
      </div>
    </Container>
  );
};
