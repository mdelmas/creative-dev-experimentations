import decomp from "poly-decomp";
import Matter from "matter-js";

const { Engine, Render, Runner, World, Bodies, Common } = Matter;

Common.setDecomp(decomp);

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");

if (!canvas) {
  throw new Error("Canvas element not found");
}

// Initialisation de l'environnement
const engine = Engine.create();
const render = Render.create({
  element: document.body,
  engine,
  canvas,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "#C4D7F2",
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Ajout d'un sol et d'une boîte
const walls = [
  Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight - 10,
    window.innerWidth,
    20,
    { isStatic: true }
  ),
  Bodies.rectangle(window.innerWidth / 2, 10, window.innerWidth, 20, {
    isStatic: true,
  }),
  Bodies.rectangle(10, window.innerHeight / 2, 20, window.innerHeight, {
    isStatic: true,
  }),
  Bodies.rectangle(
    window.innerWidth - 10,
    window.innerHeight / 2,
    20,
    window.innerHeight,
    {
      isStatic: true,
    }
  ),
];

const lettersBodies: Matter.Body[] = [];
const lettersPaths =
  document.querySelectorAll<SVGPathElement>("#letters svg path");
lettersPaths.forEach((letterPath, index) => {
  const vertices = Matter.Svg.pathToVertices(letterPath, 50);
  lettersBodies.push(
    Bodies.fromVertices(
      window.innerWidth / 6 + (window.innerWidth / 6) * index,
      200 + (Math.random() - 0.5) * 40,
      [vertices],
      {
        render: {
          fillStyle: "#F0F7EE",
        },
      },
      true
    )
  );
});

World.add(engine.world, [...walls, ...lettersBodies]);
