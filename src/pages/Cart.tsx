import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Browse our beautiful flower arrangements</p>
            <Button onClick={() => navigate("/search")}>
              Continue Shopping
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm p-4 mb-4 flex items-center gap-4"
              >
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.floristName && (
                    <p className="text-sm text-gray-600">By {item.floristName}</p>
                  )}
                  <p className="text-[#C5E1A5] font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;