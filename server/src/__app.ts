import env from 'dotenv'; env.config()
import fs from 'fs'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'

const username = process.env.USERNAME || '';
const accessToken = process.env.ACCESS_TOKEN || '';

(async () => {
    const repoUrl = `https://${username}:${accessToken}@github.com/dogukanakkaya/test-private-repo.git`
    console.log(repoUrl);


    await git.clone({
        fs,
        http,
        dir: 'private-repo',
        url: repoUrl,
        ref: 'main',
        singleBranch: true
    })
})()

/*
import express, { Request, Response, Application } from 'express'

const app: Application = express()

const PORT = process.env.PORT || 8000

app.get("/", (req: Request, res: Response): void => {
    res.send("Hello Typescript with Node.js!")
})

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`)
})
*/