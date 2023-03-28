import express from 'express'
import userRoute from './routes/users.mjs'

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));
server.use(express.json());

server.use("/users", userRoute);

server.listen(server.get('port'), function () {
    console.log('server is running on port', server.get('port'));
})

