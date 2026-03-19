export interface categoryRes {
  data: categorykeys[];
  success: boolean;
}
export interface categorykeys {
  categoryImage: string;
  categoryName: string;
  _id: string;
}
export interface productRes {
  data: productkeys[];
  success: boolean;
}

export interface productkeys {
  _id: string;
  productName: string;
  categoryId: string;
  sellPrice: number;
  quantity: number;
  maxPrice: number;
  productImage: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}
