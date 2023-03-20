import express from "express"
import postRoutes from "./routes/posts.js"
// import commentRoutes from "./routes/comments.js"
// import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions ={
    credentials:true,           
    optionSuccessStatus:200
}

// app.use(cors());
app.use(cors({corsOptions}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,  "../client-blog/public/upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage })

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes)
// app.use("/api/comments", commentRoutes)
// app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen (8800, ()=> {
    console.log ("Connected!!!")
})