import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/health', (req: Request, res: Response) => {
  res.send('healthy <3');
});

export default app;
