"use client";

import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderContext } from "@/providers/order";
import { use } from "react";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder() {
    await finishOrder(order[0].order.id);
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const totalPrice = order.reduce(
    (acc, item) => acc + item.product.price * item.amount,
    0
  );

  return (
    <dialog className={styles.modalContainer}>
      <section className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          <X size={40} color="#FF3F4B" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>
            Mesa <b>{order[0].order.table}</b>
          </span>

          {order.map((item) => (
            <section className={styles.item} key={item.id}>
              <img src={item.product.banner} width={120} height={120}/>
              <span>
                {item.amount}x - <b>{item.product.name} - {formatCurrency(item.product.price * item.amount)}</b>
              </span>
              <span className={styles.description}>{item.product.description}</span>
            </section>
          ))}

        
            <h3 className={styles.totalPrice}>Total: {formatCurrency(totalPrice)}</h3>
          <button className={styles.button} onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
