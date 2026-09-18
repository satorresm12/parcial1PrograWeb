"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type FormularioEvent = {
  preventDefault: () => void;
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, removeFromCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("");
  const [terms, setTerms] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    payment: false,
  });
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const nameInvalid = name.trim().length < 5;
  const emailInvalid = !/^\S+@\S+\.\S+$/.test(email);
  const paymentInvalid = payment === "";
  const formInvalid = nameInvalid || emailInvalid || paymentInvalid || !terms;

  const handleSubmit = async (event: FormularioEvent) => {
    event.preventDefault();

    if (formInvalid || loading) {
      return;
    }

    setLoading(true);
    setConfirmed(false);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });

    clearCart();
    setName("");
    setEmail("");
    setPayment("");
    setTerms(false);
    setTouched({ name: false, email: false, payment: false });
    setLoading(false);
    setConfirmed(true);
  };

  const productRows = [];
  for (const item of items) {
    productRows.push(
      <div key={item.id} className="border-b border-slate-200 pb-3">
        <div className="flex justify-between gap-3">
          <p className="font-medium text-slate-800">{item.title}</p>
          <p className="font-semibold text-slate-900">
            ${(item.price * item.quantity)}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            {item.quantity} * ${item.price}
          </p>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        </div>
      </div>,
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Datos de facturación
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Nombre completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-black outline-none focus:border-indigo-500"
                  placeholder="Tu nombre completo"
                />
                {touched.name && nameInvalid && (
                  <p className="mt-1 text-sm text-red-600">
                    El nombre debe tener mínimo 5 caracteres.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Correo de facturación
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-black outline-none focus:border-indigo-500"
                  placeholder="correo@ejemplo.com"
                />
                {touched.email && emailInvalid && (
                  <p className="mt-1 text-sm text-red-600">
                    Escribe un correo electrónico válido.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="payment"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Método de pago
                </label>
                <select
                  id="payment"
                  value={payment}
                  onChange={(event) => setPayment(event.target.value)}
                  onBlur={() => setTouched({ ...touched, payment: true })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-black outline-none focus:border-indigo-500"
                >
                  <option value="">Selecciona un método</option>
                  <option value="card">Tarjeta de crédito</option>
                  <option value="transfer">Transferencia bancaria</option>
                  <option value="cash">Pago contra entrega</option>
                </select>
                {touched.payment && paymentInvalid && (
                  <p className="mt-1 text-sm text-red-600">
                    Selecciona un método de pago.
                  </p>
                )}
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(event) => setTerms(event.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>Acepto los términos y condiciones.</span>
              </label>

              {loading && (
                <p className="text-sm text-indigo-600" role="status">
                  Procesando la orden, espera un momento...
                </p>
              )}

              <button
                type="submit"
                disabled={formInvalid || loading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {loading ? "Procesando..." : "Confirmar orden"}
              </button>

              {confirmed && (
                <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                  Pedido completado correctamente. El carrito fue vaciado.
                </p>
              )}
            </form>
          </section>

          <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Resumen de compra
            </h2>
            <button
              type="button"
              onClick={clearCart}
              disabled={items.length === 0}
              className="mb-5 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Vaciar carrito
            </button>

            {items.length === 0 ? (
              <p className="text-sm text-slate-500">El carrito está vacío.</p>
            ) : (
              <div className="space-y-4">
                {productRows}

                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
