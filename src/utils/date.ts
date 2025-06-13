export function formatDate(date: string | Date) {
    const d = typeof date === "string" ? new Date(date) : date;

    return d.toLocaleString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}


export function getOrderStatus(purchaseDate: string | Date): "packaging" | "shipping" | "arrived" {
  const now = new Date();
  const purchase = new Date(purchaseDate);
  const minutes = (now.getTime() - purchase.getTime()) / 60000;

  if (minutes >= 10) return "arrived";
  if (minutes >= 5) return "shipping";
  return "packaging";
}

export function getOrderStepIndex(purchaseDate: string | Date): number {
  const now = new Date();
  const purchase = new Date(purchaseDate);
  const minutes = (now.getTime() - purchase.getTime()) / 60000;

  if (minutes >= 10) return 2; // Arrived
  if (minutes >= 5) return 1;  // Shipping
  return 0;                   // Packaging
}
