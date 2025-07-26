export const Maths = {
  // Returns true if (x, y) is inside the polygon defined by vertices
  pointInPolygon: (point: Vertex, vertices: Array<Vertex>): boolean => {
    const x = point.x,
      y = point.y;
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i].x,
        yi = vertices[i].y;
      const xj = vertices[j].x,
        yj = vertices[j].y;
      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  },
};

export interface Vertex {
  x: number;
  y: number;
}

export interface Polygon {
  name: string;
  vertices: Array<Vertex>;
}
