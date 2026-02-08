import Express from "express"
import path from "path"
import { fileURLToPath } from "url"

import cors from "cors"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = Express()

const PORT = process.env.PORT || 3000

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))
app.use(cors())
app.use(Express.static(path.join(__dirname, "../public")))

app.use(productRoutes)
app.use(authRoutes)

app.listen(PORT, () => {
  console.log(`Server Initialized in PORT ${PORT}`);
})



