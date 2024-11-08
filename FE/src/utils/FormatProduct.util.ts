export const formatProductData = (product: any) => {
  return {
    ...product,
    releaseDate: product.releaseDate
      ? new Date(product.releaseDate).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A",

    // Chuyển đổi định dạng tiền tệ
    currentPrice: product.currentPrice
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.currentPrice)
      : "N/A",
  };
};
