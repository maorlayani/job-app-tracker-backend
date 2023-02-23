import express, { Application, Request, Response } from 'express'


const app: Application = express()

app.listen(3000, () => console.log('Server running at port 3030'))