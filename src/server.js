import Express from "express";
import { prisma } from "./lib/prisma.js";
import cors from "cors";
const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

app.post("/product", async (req, res) => {
  const { name, category, price, quantity } = req.body || {};
  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({
      error: "Missing required fields: name, category, price, quantity",
    });
  }

  await prisma.produtos.create({
    data: {
      // @ts-ignore
      name,
      // @ts-ignore
      category,
      // @ts-ignore
      price,
      // @ts-ignore
      quantity,
    },
  });
  res.status(201).send(req.body);
});

app.get("/products", async (req, res) => {
  let products = [];
  if (Object.keys(req.query || {}).length > 0) {
    products = await prisma.produtos.findMany({
      where: {
        // @ts-ignore
        name: req.query.name,
        // @ts-ignore
        category: req.query.category,
        // @ts-ignore
        price: req.query.price,
        // @ts-ignore
        quantity: req.query.quantity,
      },
    });
  } else {
    products = await prisma.produtos.findMany();
  }
  res.status(200).json(products);
});

app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body || {};
  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({
      error: "Missing required fields: name, category, price, quantity",
    });
  }

  const updated = await prisma.produtos.update({
    where: { id },
    data: {
      // @ts-ignore
      name,
      // @ts-ignore
      category,
      // @ts-ignore
      price,
      // @ts-ignore
      quantity,
    },
  });

  res.status(200).json(updated);
});

app.delete("/product/:id", async (req, res) => {
  await prisma.produtos.delete({
    where: { id: req.params.id },
  });
  res.status(204).json({ message: "User Deleted" });
});



app.listen(PORT, () => {
  console.log(`Server initialized in PORT ${process.env.PORT}`);
});
