import { CollectionConfig } from "payload";

export const Order: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      required: true,
    },
    {
      name: "currency",
      label: "Currency",
      type: "text",
      required: true,
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "json",
      required: true,
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "receipt_url",
      label: "Receipt URL",
      type: "text",
      required: true,
    },
    {
      name: "checkout_session_id",
      label: "Checkout Session ID",
      type: "text",
      required: true,
    },
    {
      name: "transaction_id",
      label: "Transaction ID",
      type: "text",
      required: true,
    },
    {
      name: "payment_intent_id",
      label: "Payment Intent ID",
      type: "text",
      required: true,
    },
    {
      name: "orderType",
      label: "Order Type",
      type: "text",
      required: true,
    },
  ],
};
