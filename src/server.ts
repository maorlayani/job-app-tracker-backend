import express, { Application, Request, Response } from 'express'
// import path from 'path'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
// app.use(express.static('public'))


// if (process.env.NODE_ENV === 'production') {
// Express serve static files on production environment
// app.use(express.static(path.resolve(__dirname, 'public')))
// } else {
// Configuring CORS 
const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://jobs-app-tracker.vercel.app/'],
    "Access-Control-Allow-Origin": 'https://jobs-app-tracker.vercel.app/',
    credentials: true
}
app.use(cors(corsOptions))
// }
import applicationsRoutes from './api/tracker/tracker.routes'
import companysDatasRoutes from './api/company-data/companyData.routes'
import technologiesRoutes from './api/technology/technology.routes'

// routes 
app.use('/api/tracker', applicationsRoutes)
app.use('/api/company', companysDatasRoutes)
app.use('/api/technology', technologiesRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/board/123 it will still respond with 
// our SPA (single page app) (the index.html file) and allow react-router to take it from there
// app.get('/**', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

const port = process.env.PORT || 3030
app.listen(port, () => console.log('Server running at port: ' + port))

// module.exports = app;