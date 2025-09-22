import React from "react";
import { Container, Title } from "../src/components/shared/index";
import { Button } from "../src/components/ui/button";
import TextField from "@mui/material/TextField";
import Lottie from "lottie-react";
import monkey from "../src/assets/monkey.json";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
interface Props {
  className?: string;
}

export const LoginVerify: React.FC<Props> = ({ className }) => {
  const [phone, setPhone] = React.useState("");
  return (
    <Container
      className={cn("flex items-center justify-center h-[100vh] ", className)}
    >
      <div>
        <div className="flex flex-col gap-[1.5rem]">
          <div className="w-[360px] flex items-center justify-center">
            <Lottie
              animationData={monkey}
              loop
              autoplay
              style={{ width: 180, height: 180 }}
            />
          </div>

          <div className="w-[360px] text-center flex flex-col items-center">
            <Title className="font-bold" text="+380 99 300 34 89" size="lg" />
            <p className="font-bold text-center text-base w-[290px] text-gray-500">
              Ми відправили вам повідомлення на номер телефону з кодом
            </p>
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
            label="Код"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button className="w-[360px] h-[54px]">ПІДТВЕРДИТИ</Button>

          <Link
          to="/login"
          className="w-[360px] h-[54px] flex items-center justify-center gap-3
           text-[oklch(0.705_0.213_47.604)] transition-all rounded-2xl  hover:bg-[#ff6a001a]"
        >
          ПОВЕРНУТИСЯ
        </Link>
        </div>
      </div>
    </Container>
  );
};
