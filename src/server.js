import Express from "express"

import cors from "cors"
import productRoutes from "./routes/productRoutes.js"

const app = Express()

const PORT = process.env.PORT || 3000

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use(cors())

app.use(productRoutes)

app.listen(PORT, () => {
  console.log(`Server Initialized in PORT ${PORT}`);
})



