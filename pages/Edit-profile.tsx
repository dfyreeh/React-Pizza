// src/pages/EditProfile.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../src/firebase/firebase"; // путь оставь как у тебя
import { setUser } from "../store/userSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Container, Title } from "@/components/shared";
import TextField from "@mui/material/TextField";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const EditProfile: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (!user.uid) return;

    const fetchUser = async () => {
      const ref = doc(db, "users", user.uid!);
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name ?? "");
        setSurname(data.surname ?? "");
        setPhone(data.phoneNumber ?? "");

        // Обновляем Redux на всякий случай
        dispatch(
          setUser({
            ...user,
            name: data.name ?? "",
            surname: data.surname ?? "",
            phoneNumber: data.phoneNumber ?? "",
          })
        );
      }
      setLoading(false);
    };

    fetchUser();
  }, [user.uid, dispatch]);

  if (!user.uid)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-t-orange-500 border-r-orange-500 border-b-orange-500 border-l-transparent rounded-full animate-spin"></span>
      </p>
    );
  if (loading)
    return (
      <p className="w-full h-[100vh] flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-t-orange-500 border-r-orange-500 border-b-orange-500 border-l-transparent rounded-full animate-spin"></span>
      </p>
    );

  const handleSave = async () => {
    if (!name.trim() || !surname.trim() || !phone.trim()) {
      toast.error("Помилка збереження");
      alert("Заповніть всі поля: ім'я, прізвище та телефон.");
      return;
    }

    setSaving(true);
    try {
      const ref = doc(db, "users", user.uid!);
      await setDoc(
        ref,
        {
          name: name.trim(),
          surname: surname.trim(),
          phoneNumber: phone.trim(),
          email: user.email ?? "",
          updatedAt: new Date(),
        },
        { merge: true }
      );

      dispatch(
        setUser({
          ...user,
          name: name.trim(),
          surname: surname.trim(),
          phoneNumber: phone.trim(),
        })
      );
      toast.success("Дані змінено!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Помилка збереження");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="flex justify-center items-center">
      <div
        className={cn(
          "h-[100vh] flex flex-col justify-center gap-5",
          className
        )}
      >
        <div className="flex justify-center items-center">
          <Title className="font-bold" text="Заповніть профіль" size="lg" />
        </div>

        <div className="flex flex-col items-center gap-6">
          <TextField
            className="w-[240px] sm:w-[280px] md:w-[360px] h-[50px] sm:h-[54px] rounded-2xl hover:border-primary"
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
            label="І'мя"
            type="text"
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="w-[240px] sm:w-[280px] md:w-[360px] h-[50px] sm:h-[54px] rounded-2xl hover:border-primary"
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
            label="Прізвище"
            type="text"
            value={surname}
            variant="outlined"
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            className="w-[240px] sm:w-[280px] md:w-[360px] h-[50px] sm:h-[54px] rounded-2xl hover:border-primary"
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
            label="Телефон"
            type="text"
            value={phone}
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button
            className="w-[240px] sm:w-[280px] md:w-[360px] h-[50px] sm:h-[54px] rounded-2xl hover:border-primary"
            onClick={handleSave}
            disabled={saving}
            loading={saving}
          >
            Зберегти
          </Button>
        </div>
      </div>
    </Container>
  );
};
