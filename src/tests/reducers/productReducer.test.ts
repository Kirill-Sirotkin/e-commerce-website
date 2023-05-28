import productReducer, { sortProducts } from "../../reducers/productReducer";
import Product from "../../types/Product";

describe("Testing productReducer", () => {
  test("Check initialState", () => {
    const state = productReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      products: [],
    });
  });
  test("Check sorting by price", () => {
    const product1: Product = {
      id: 1,
      title: "",
      price: 100,
      description: "",
      category: { id: 1, name: "a", image: "" },
      images: [],
    };
    const product2: Product = {
      id: 2,
      title: "",
      price: 90,
      description: "",
      category: { id: 2, name: "c", image: "" },
      images: [],
    };
    const product3: Product = {
      id: 3,
      title: "",
      price: 80,
      description: "",
      category: { id: 3, name: "b", image: "" },
      images: [],
    };
    const state = productReducer(
      { products: [product3, product1, product2], productsOnPage: [] },
      sortProducts(["price", 1])
    );
    expect(state.products).toEqual([product3, product2, product1]);
  });
  test("Check sorting by category", () => {
    const product1: Product = {
      id: 1,
      title: "",
      price: 100,
      description: "",
      category: { id: 1, name: "a", image: "" },
      images: [],
    };
    const product2: Product = {
      id: 2,
      title: "",
      price: 90,
      description: "",
      category: { id: 2, name: "c", image: "" },
      images: [],
    };
    const product3: Product = {
      id: 3,
      title: "",
      price: 80,
      description: "",
      category: { id: 3, name: "b", image: "" },
      images: [],
    };
    const state = productReducer(
      { products: [product3, product1, product2], productsOnPage: [] },
      sortProducts(["category", 1])
    );
    expect(state.products).toEqual([product1, product3, product2]);
  });
});
