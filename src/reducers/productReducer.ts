import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Product from "../types/Product";
import axios, { AxiosError } from "axios";
import ProductCreateInfo from "../types/ProductCreateInfo";

interface ProductReducer {
  products: Product[];
  productsOnPage: Product[];
  productById?: Product;
  createdProduct?: Product;
  updatedProduct?: Product;
  deleteSuccess?: boolean;
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
        console.log("sorting by category");
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
        console.log("sorting by price");
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
  },
  extraReducers: (build) => {
    build.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log("get all products finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.products = action.payload;
        state.productsOnPage = action.payload.slice(0, 12);
      }
    });
    build.addCase(getProductById.fulfilled, (state, action) => {
      console.log("get product by id finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.productById = action.payload;
      }
    });
    build.addCase(createProduct.fulfilled, (state, action) => {
      console.log("create product finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.createdProduct = action.payload;
      }
    });
    build.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("update product finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.updatedProduct = action.payload;
      }
    });
    build.addCase(deleteProduct.fulfilled, (state, action) => {
      console.log("delete product finished");

      if (action.payload instanceof AxiosError) {
        console.log(action.payload.message);
      } else {
        state.deleteSuccess = action.payload;
      }
    });
  },
});

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  console.log("GET ALL PRODUCTS!");
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
    console.log(`GET PRODUCT: ${id}!`);
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
    console.log("CREATING PRODUCT!");
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
  async (updateInfo: { product: any; id: number }) => {
    console.log(`UPDATING PRODUCT ${updateInfo.id}!`);
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
    console.log(`DELETING PRODUCT ${id}!`);
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
export const { sortProducts, setProductsOnPage } = productSlice.actions;
export default productReducer;
