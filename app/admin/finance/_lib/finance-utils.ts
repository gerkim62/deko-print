import type {
    Order,
    Product,
    WalkIn,
    RevenueSummary,
    CategoryRevenue,
    ProductPerformanceItem,
    Transaction,
  } from "../_types"
  
  export function calculateRevenueSummary(orders: Order[], walkIns: WalkIn[]): RevenueSummary {
    const orderRevenue = orders.reduce((sum, order) => sum + (order.pricePaid || 0), 0)
    const walkInRevenue = walkIns.reduce((sum, walkIn) => sum + walkIn.pricePaid, 0)
    const pendingPayments = orders
      .filter((order) => order.pricePaid === null)
      .reduce((sum, order) => sum + order.product.price * order.quantity, 0)
  
    return {
      totalRevenue: orderRevenue + walkInRevenue,
      orderRevenue,
      walkInRevenue,
      pendingPayments,
    }
  }
  
  export function calculateCategoryRevenue(products: Product[]): CategoryRevenue[] {
    const categoryMap = new Map<string, number>()
  
    products.forEach((product) => {
      const category = product.category
      const productRevenue =
        (product.orders?.reduce((sum, order) => sum + (order.pricePaid || 0), 0) || 0) +
        (product.walkIns?.reduce((sum, walkIn) => sum + walkIn.pricePaid, 0) || 0)
  
      categoryMap.set(category, (categoryMap.get(category) || 0) + productRevenue)
    })
  
    const totalRevenue = Array.from(categoryMap.values()).reduce((sum, revenue) => sum + revenue, 0)
  
    return Array.from(categoryMap.entries()).map(([category, revenue]) => ({
      category: formatCategory(category),
      revenue,
      percentage: totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0,
    }))
  }
  
  export function getTopProducts(products: Product[]): ProductPerformanceItem[] {
    return products
      .map((product) => {
        const unitsSold =
          (product.orders?.reduce((sum, order) => sum + order.quantity, 0) || 0) +
          (product.walkIns?.reduce((sum, walkIn) => sum + walkIn.quantity, 0) || 0)
  
        const revenue =
          (product.orders?.reduce((sum, order) => sum + (order.pricePaid || 0), 0) || 0) +
          (product.walkIns?.reduce((sum, walkIn) => sum + walkIn.pricePaid, 0) || 0)
  
        return {
          id: product.id,
          title: product.title,
          category: formatCategory(product.category),
          revenue,
          unitsSold,
          stockRemaining: product.stockRemaining,
        }
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }
  
  export function getRecentTransactions(orders: Order[], walkIns: WalkIn[]): Transaction[] {
    const orderTransactions: Transaction[] = orders.map((order) => ({
      id: `order-${order.id}`,
      date: order.createdAt,
      description: `Order: ${order.product.title} (x${order.quantity})`,
      amount: order.pricePaid || 0,
      type: "order",
      status: order.status,
      customer: order.customer.name,
    }))
  
    const walkInTransactions: Transaction[] = walkIns.map((walkIn) => ({
      id: `walkin-${walkIn.id}`,
      date: new Date(), // WalkIn doesn't have date in schema, using current date
      description: walkIn.product
        ? `Walk-in: ${walkIn.product.title} (x${walkIn.quantity})`
        : `Walk-in: Service${walkIn.service ? ` - ${walkIn.service}` : ""}`,
      amount: walkIn.pricePaid,
      type: "walkIn",
      customer: walkIn.customerName || "Walk-in Customer",
    }))
  
    return [...orderTransactions, ...walkInTransactions].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10)
  }
  
  function formatCategory(category: string): string {
    return category.replace("_", " ")
  }
  