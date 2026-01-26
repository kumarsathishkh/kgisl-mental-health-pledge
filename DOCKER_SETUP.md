# Using MongoDB with Docker

If you don't have MongoDB installed locally, you can run it with Docker:

## Quick Start with Docker

```bash
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB in a container
docker run --name kgisl-mongo -d -p 27017:27017 mongo:latest

# Verify it's running
docker ps

# Stop MongoDB
docker stop kgisl-mongo

# Start MongoDB again
docker start kgisl-mongo
```

## With Docker Compose

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: kgisl-mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: kgisl-pledges
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./server
    container_name: kgisl-backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/kgisl-pledges
      NODE_ENV: development
    depends_on:
      - mongodb
    volumes:
      - ./server:/app
      - /app/node_modules

volumes:
  mongo-data:
```

Then run:

```bash
# Start both services
docker-compose up

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

## Verify MongoDB is Connected

The server will show one of these messages:

✓ **Connected:** `✓ Connected to MongoDB`

✗ **Error:** `✗ MongoDB connection error: ...`

If you see the error, check:
1. Is MongoDB running? (`docker ps`)
2. Is the MONGODB_URI correct in `.env`?
3. Is port 27017 available?
