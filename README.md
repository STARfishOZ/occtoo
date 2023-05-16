# Getting Started with OCCTOO React App

In the .env file you will have two different apis, both working fine.
For the infinite scroll I decided to go with tanstack virtual docs.
Virtual scroll in this case optimise the performance. First I thought just to go with Intersection Observer,
but natively it gives opportunity to hide only the content inside the row component, which looks weird and incorrect.

Also you have generic component that renders everything, and super mapping for a complex object :D
I think this should be fine. Hopefully you are fine with the result. It is quite hard to go with something unique,
with so much examples around the web.

Additionally, I would use Radix UI as the accessibility tool here. As for testing I would use jest + react-testing-tools.

## Available Scripts

In the project directory, you can run:

### `npm start`
