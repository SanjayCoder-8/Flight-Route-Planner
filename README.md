# Flight-Route-Planner
The Flight Route Planner is a JavaScript-based tool designed to help users find optimal flight routes between airports based on specific criteria such as cost, duration, or distance. It uses Dijkstra's algorithm to calculate the most efficient route between two airports, considering the given constraints.

Features
Find Optimal Routes: Determine the best flight route between two airports.

Criteria: Choose between cost.

Flexible Input: Easily add or modify flight data to suit your needs.

Clear Output: Returns the route, total cost, total duration, and total distance in a structured format.

Installation
No installation is required to use this tool. Simply copy the code into your JavaScript environment (e.g., Node.js, browser console, or any JS runtime).

How It Works
The tool uses Dijkstra's algorithm to find the optimal route. Here's a high-level overview of the process:

Graph Construction: The flight data is converted into a graph where airports are nodes and flights are edges with associated weights (cost, duration, or distance).

Priority Queue: The algorithm uses a priority queue to explore the most promising paths first, based on the selected criteria.

Optimal Path: The algorithm continues until it finds the shortest path to the destination or exhausts all possibilities.
Limitations
The tool assumes that all flights are one-way. For round-trip routes, you would need to call the function twice (e.g., findRoute('JFK', 'LAX') and findRoute('LAX', 'JFK')).

It does not account for layover times or other real-world constraints like flight availability.

License
This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it as needed.

Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

Enjoy finding your optimal flight routes! ✈️
