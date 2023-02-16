export const createFullProducts = (products, stocks) => (
    products.map((item) => {
        const currentStock = stocks.find((stock) => stock.product_id === item.id);
        return { ...item, count: currentStock?.count }
    })
)
