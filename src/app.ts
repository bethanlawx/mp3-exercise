import express, { Express, Request, Response } from 'express';
import processMp3File from './processMp3File';
const app: Express = express();

app.get('/health', (req: Request, res: Response) => {
  res.send('healthy <3');
});

app.post('/file-upload', (req: Request, res: Response) => {
  // TODO: check it is a MP3 file
  var data = Buffer.from('binary');
  req.on('data', (chunk) => {
    data = Buffer.concat([data, chunk])
  });
  req.on('end', function() {
    let frameCount = processMp3File(data);
    res.status(200).send({'frameCount': frameCount});
  });

  //TODO: Improve error handling
  req.on('error', function(err) {
    console.log(err.message);
    res.status(500).send('Error has occurred during file processing');
  });
});

export default app;
