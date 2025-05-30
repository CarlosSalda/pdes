import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useStore, type ProductListItem } from "../../store/useStore";
import { getProductById } from "../../helpers/api/ml";
import SearchAppBar from "../Home/components/SearchAppBar";
import ImageCarousel from "./components/ImageCarousel";

interface RouteParams extends Record<string, string> {
  id: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const token = useStore((state) => state.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductListItem | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (product && Object.keys(product).length > 0) {
          return;
        } else {
          const fetched = await getProductById(id ?? "", token);
          setProduct(fetched.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, token, product]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Producto no encontrado</Typography>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </Box>
    );
  }

  return (
    <>
      <SearchAppBar />
      <Box display="flex" justifyContent="center" p={2}>
        <Card sx={{ maxWidth: 600, width: "100%" }}>
          <ImageCarousel
            images={product.pictures.map((pic) => pic.url)}
            height={300}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price ?? 40000}
            </Typography>
            {/* Aquí podrías renderizar descripción u otros campos */}
            {product.description && (
              <Typography variant="body1">{product.description}</Typography>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Volver
            </Button>
            <Button variant="contained" color="primary">
              Añadir al carrito
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetail;
