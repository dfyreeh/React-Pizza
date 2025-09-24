import React from "react";
import { Container, Title } from "../src/components/shared/index";
import { Button } from "../src/components/ui/button";
import TextField from "@mui/material/TextField";
import Lottie from "lottie-react";
import monkey from "../src/assets/monkey.json";
import { cn } from "@/lib/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../src/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const LoginVerify: React.FC<Props> = ({ className }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    setErrorMessage("");
    if (password !== confirmPassword) {
      toast.error("Паролі не співпадають");
      return;
    }

    setLoading(true);  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          name: "",
          surname: "",
          phoneNumber: "",
        })
      );

      const userRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userRef, {
        email: firebaseUser.email ?? "",
        name: "",
        surname: "",
        phoneNumber: "",
        createdAt: new Date(),
      });

      toast.success("Ви успішно зареєструвалися!");
      navigate("/profile/edit");  
    } catch (error: any) {
      setErrorMessage(error.message);
      toast.error("Помилка реєстрації");
      console.error("Помилка реєстрації:", error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container
      className={cn("flex items-center justify-center h-[100vh] ", className)}
    >
      <div>
        <div className="flex flex-col gap-[1.1rem]">
          <div className="w-[360px] flex items-center justify-center">
            <Lottie
              animationData={monkey}
              loop
              autoplay
              style={{ width: 140, height: 140 }}
            />
          </div>

          <div className="w-[360px] text-center flex flex-col items-center">
            <Title className="font-bold" text="Реєстрація" size="lg" />
          </div>

          <TextField
            className="w-[360px] h-[54px] rounded-2xl hover:border-primary"
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
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            className="w-[360px] h-[54px] rounded-2xl hover:border-primary"
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
          <TextField
            className="w-[360px] h-[54px] rounded-2xl hover:border-primary"
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
            label="Підтвердіть пароль"
            type="password"
            value={confirmPassword}
            variant="outlined"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p className="text-red-500 w-[360px] text-center">{errorMessage}</p>}
          <Button className="w-[360px] h-[54px]" onClick={handleRegister} loading={loading}>
            ЗАРЕЄСТРУВАТИСЯ
          </Button>

          {/* <Link
            to="/login"
            className="w-[360px] h-[54px] flex items-center justify-center gap-3
           text-[oklch(0.705_0.213_47.604)] transition-all rounded-2xl  hover:bg-[#ff6a001a]"
          >
            ПОВЕРНУТИСЯ
          </Link> */}
        </div>
      </div>
    </Container>
  );
};
