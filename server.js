const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Mock flight data (replace with real API calls)
const flights = [
  { source: 'JFK', destination: 'LAX', cost: 200, duration: 5.5, distance: 4000 },
  { source: 'JFK', destination: 'ORD', cost: 150, duration: 2.5, distance: 1200 },
  { source: 'ORD', destination: 'LAX', cost: 180, duration: 4, distance: 2800 },
  { source: 'JFK', destination: 'DFW', cost: 170, duration: 3, distance: 1600 },
  { source: 'DFW', destination: 'LAX', cost: 150, duration: 3.5, distance: 2000 },
];

function findRoute(source, destination, criteria = 'cost') {
  // Create a graph from the flights data
  const graph = {};
  flights.forEach(flight => {
    if (!graph[flight.source]) {
      graph[flight.source] = [];
    }
    graph[flight.source].push({
      destination: flight.destination,
      cost: flight.cost,
      duration: flight.duration,
      distance: flight.distance,
    });
  });

  // Priority queue to store nodes to visit
  const queue = [];
  queue.push({ node: source, cost: 0, duration: 0, distance: 0, path: [source] });

  // Visited nodes to avoid revisiting
  const visited = {};

  while (queue.length > 0) {
    // Sort queue based on the criteria (cost, duration, or distance)
    queue.sort((a, b) => a[criteria] - b[criteria]);

    // Get the node with the smallest value for the criteria
    const current = queue.shift();

    // If we reach the destination, return the result
    if (current.node === destination) {
      return {
        route: current.path,
        cost: current.cost,
        duration: current.duration,
        distance: current.distance,
      };
    }

    // Mark the node as visited
    visited[current.node] = true;

    // Explore neighbors
    if (graph[current.node]) {
      graph[current.node].forEach(neighbor => {
        if (!visited[neighbor.destination]) {
          queue.push({
            node: neighbor.destination,
            cost: current.cost + neighbor.cost,
            duration: current.duration + neighbor.duration,
            distance: current.distance + neighbor.distance,
            path: [...current.path, neighbor.destination],
          });
        }
      });
    }
  }

  // If no route is found
  return { error: 'No route found.' };
}

// Example usage:
console.log(findRoute('JFK', 'LAX', 'cost')); // Finds the cheapest route
console.log(findRoute('JFK', 'LAX', 'duration')); // Finds the fastest route
console.log(findRoute('JFK', 'LAX', 'distance')); // Finds the shortest route

// API endpoint to find route
app.post('/find-route', (req, res) => {
  const { source, destination, criteria } = req.body;

  if (!source || !destination) {
    return res.status(400).json({ error: 'Source and destination are required.' });
  }

  const result = findRoute(source, destination, criteria);
  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});