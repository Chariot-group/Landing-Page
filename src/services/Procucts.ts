class ProductsService {
  private static instance: ProductsService;
  private readonly BASE: string = "/api/products";

  public static getInstance(): ProductsService {
    if (!this.instance) {
      this.instance = new ProductsService();
    }
    return this.instance;
  }

  public async getProducts(): Promise<Response> {
    return await fetch(this.BASE).then((res) => res.json());
  }
}

export const ProductService = ProductsService.getInstance();
