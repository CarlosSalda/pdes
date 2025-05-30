import React from "react";
import { useStore } from "../../store/useStore";
import SearchAppBar from "./components/SearchAppBar";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip,
  CardMedia,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const productsList = useStore((state) => state.productsList);
  const navigate = useNavigate();

  const goToSingleProduct = (id: string) => {
    navigate(`/single-product/${id}`);
  };

  return (
    <>
      <SearchAppBar />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
          justifyContent: "center",
        }}
      >
        {productsList?.results.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: { xs: "100%", sm: 200, md: 240 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.pictures[0].url ?? ""}
                alt={product.name}
              />
            </CardContent>
            <CardContent sx={{ flexGrow: 1, minHeight: 150 }}>
              <Tooltip title={product.name} arrow>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "pointer", // indica que hay algo al hover
                  }}
                >
                  {product.name}
                </Typography>
              </Tooltip>
              <CardActions
                sx={{
                  justifyContent: "center", // centrar horizontal
                  marginTop: 7,
                }}
              >
                <Typography variant="h5">Precio: ${product.price}</Typography>
              </CardActions>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button size="small">
                <VisibilityIcon
                  onClick={() => goToSingleProduct(product.id)}
                  sx={{ fontSize: 35 }}
                />
              </Button>
              <Button size="medium">
                <AddShoppingCartIcon sx={{ fontSize: 30 }} />{" "}
              </Button>
            </CardActions>
          </Card>
        ))}

        {(!productsList || productsList.results.length === 0) && (
          <Typography variant="body1" align="center" sx={{ width: "100%" }}>
            No hay productos para mostrar.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Home;
