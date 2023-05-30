import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../types/Product";
import axios, { AxiosError } from "axios";
import ProductCreateInfo from "../types/ProductCreateInfo";
import ProductUpdateInfo from "../types/ProductUpdateInfo";

interface ProductReducer {
  products: Product[];
  productsOnPage: Product[];
  productById?: Product;
  createdProduct?: Product;
  updatedProduct?: Product;
  deleteSuccess?: boolean;
  createResultMessage?: string;
  updateResultMessage?: string;
}

const initialState: ProductReducer = {
  products: [],
  productsOnPage: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    sortProducts: (
      state,
      action: PayloadAction<["category" | "price", number]>
    ) => {
      if (action.payload[0] === "category") {
        state.products.sort((a, b) => {
          const nameA = a.category.name.toUpperCase();
          const nameB = b.category.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
      } else {
        state.products.sort((a, b) => {
          return a.price - b.price;
        });
      }

      const startIndex = (action.payload[1] - 1) * 12;
      let endIndex = action.payload[1] * 12;

      if (endIndex >= state.products.length) endIndex = state.products.length;
      state.productsOnPage = state.products.slice(startIndex, endIndex);
    },
    setProductsOnPage: (state, action: PayloadAction<number>) => {
      const startIndex = (action.payload - 1) * 12;
      let endIndex = action.payload * 12;

      if (endIndex >= state.products.length) endIndex = state.products.length;
      state.productsOnPage = state.products.slice(startIndex, endIndex);
    },
    resetDeleteStatus: (state) => {
      state.deleteSuccess = false;
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllProducts.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.products = action.payload;
        state.productsOnPage = action.payload.slice(0, 12);
      }
    });
    build.addCase(getProductById.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.productById = action.payload;
      }
    });
    build.addCase(createProduct.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.createResultMessage = action.payload.message;
      } else {
        state.createdProduct = action.payload;
      }
    });
    build.addCase(updateProduct.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
        state.updateResultMessage = action.payload.message;
      } else {
        state.updatedProduct = action.payload;
      }
    });
    build.addCase(deleteProduct.fulfilled, (state, action) => {
      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.deleteSuccess = action.payload;
      }
    });
  },
});

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  try {
    const result = await axios.get<Product[]>(
      "https://api.escuelajs.co/api/v1/products"
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

export const getProductById = createAsyncThunk(
  "getProductById",
  async (id: number) => {
    try {
      const result = await axios.get<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (product: ProductCreateInfo) => {
    try {
      const result = await axios.post<Product>(
        "https://api.escuelajs.co/api/v1/products/",
        product
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (updateInfo: { product: ProductUpdateInfo; id: number }) => {
    try {
      const result = await axios.put<Product>(
        `https://api.escuelajs.co/api/v1/products/${updateInfo.id}`,
        updateInfo.product
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: number) => {
    try {
      const result = await axios.delete<boolean>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productReducer = productSlice.reducer;
export const { sortProducts, setProductsOnPage, resetDeleteStatus } =
  productSlice.actions;
export default productReducer;
