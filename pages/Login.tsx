import React from "react";
import { Container, Title } from "@/components/shared";
import { cn } from "@/lib/utils";
import TextField from "@mui/material/TextField";
import { Button } from "../src/components/ui/index";
import Logo from "../src/assets/LogoLogin.png";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const Login: React.FC<Props> = ({ className }) => {
  const [phone, setPhone] = React.useState("");
  return (
    <Container
      className={cn("flex items-center justify-center h-[100vh] ", className)}
    >
      <div className="flex flex-col gap-[1.5rem]">
        <div className="w-[360px] flex items-center justify-center">
          <img className="w-[160px] h-[160px]" src={Logo} alt="" />
        </div>

        <div className="w-[360px] text-center">
          <Title className="font-bold" text="Вхід в React Pizza" size="lg" />
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
          label="Номер телефону"
          defaultValue="+38"
          variant="outlined"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button className="w-[360px] h-[54px]">НАСТУПНИЙ</Button>

        <Link
          to="/"
          className="w-[360px] h-[54px] flex items-center justify-center gap-3
           text-[oklch(0.705_0.213_47.604)] transition-all rounded-2xl  hover:bg-[#ff6a001a]"
        >
          ПОВЕРНУТИСЯ
        </Link>
        <Link
          to="/loginVerify"
          className="w-[360px] h-[54px] flex items-center justify-center gap-3
           text-[oklch(0.705_0.213_47.604)] transition-all rounded-2xl  hover:bg-[#ff6a001a]"
        >
          TEST
        </Link>
      </div>
    </Container>
  );
};
