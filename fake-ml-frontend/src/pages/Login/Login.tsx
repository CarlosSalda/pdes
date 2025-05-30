import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Image } from "./components";
import imageLogin from "@src/assets/logo.png";
import { login } from "../../helpers/api/apiCalls";
import { useStore } from "../../store/useStore";
import Cookies from "js-cookie";

interface FormField {
  id: number;
  label: string;
  required: boolean;
  model: string;
  type?: string;
}

const Login: React.FC = () => {
  const [status, setStatus] = useState<{ valid: boolean }>({ valid: true });
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: 1, label: "Email", required: true, model: "" },
    { id: 2, label: "Contraseña", required: true, model: "", type: "password" },
  ]);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const setToken = useStore((state) => state.setToken);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
  ) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, model: e.target.value } : field,
      ),
    );
  };

  const loginHandler = async () => {
    setStatus({ valid: true });
    setDisabled(true);

    const response = await login({
      email: formFields[0].model,
      password: formFields[1].model,
    }).catch((err) => {
      console.log("Error al enviar el login", err);
      setStatus({ valid: false });
      setDisabled(false);
    });

    if (response && response.status === "success") {
      setToken(response.data.token);
      Cookies.set("token", response.data.token, { expires: 7, secure: true });
      navigate("/home");
    } else {
      setStatus({ valid: false });
    }
    setDisabled(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image imageSrc={imageLogin} cover={true} />
        <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
          {formFields.map((field) => (
            <TextField
              key={field.id}
              margin="normal"
              fullWidth
              label={field.label}
              type={field.type ?? "text"}
              value={field.model}
              name={field.label}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange(e, field.id)}
              error={!status.valid && field.required && !field.model}
              helperText={
                !status.valid && field.required && !field.model
                  ? "Este campo es requerido"
                  : ""
              }
            />
          ))}
          {!status.valid && (
            <Typography variant="body2" color="error" align="center">
              Email o contraseña incorrectos
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={loginHandler}
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
