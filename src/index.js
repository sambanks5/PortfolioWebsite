import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import * as THREE from 'three';
import Box2D from 'box2dweb';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f9f3d9',
    },
    secondary: {
      main: '#f9b73f',
    },
    background: {
      paper: '#114036',
    },
    info: {
      main: '#A24936',
    },
  },
  typography: {
    fontFamily: '"Bricolage Grotesque", sans-serif',
    h1: {
      fontSize: 32,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 18.72,
    },
    h4: {
      fontSize: 16,
    },
    h5: {
      fontSize: 13.28,
    },
    h6: {
      fontSize: 10.72,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
          '& input[type=number]': {
            '-moz-appearance': 'textfield',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set the border radius to your desired value
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set the border radius to your desired value
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Set the border radius to your desired value
        },
      },
    },
  },
});

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Create a scene
    const scene = new THREE.Scene();

    // Create an orthographic camera for 2D effect
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Box2D setup
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2Body = Box2D.Dynamics.b2Body;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    const b2World = Box2D.Dynamics.b2World;
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

    // Create a Box2D world with gravity pointing downwards
    const world = new b2World(new b2Vec2(0, -10), true);

    // Create ground body at the bottom of the visible canvas
    const groundBodyDef = new b2BodyDef();
    groundBodyDef.position.Set(0, -height / 60); // Adjusted position
    const groundBody = world.CreateBody(groundBodyDef);
    const groundBox = new b2PolygonShape();
    groundBox.SetAsBox(width / 30, 0.5);
    groundBody.CreateFixture2(groundBox, 0);

    // Create left wall body
    const leftWallBodyDef = new b2BodyDef();
    leftWallBodyDef.position.Set(-width / 60, 0); // Adjusted position
    const leftWallBody = world.CreateBody(leftWallBodyDef);
    const leftWallBox = new b2PolygonShape();
    leftWallBox.SetAsBox(0.5, height / 30);
    leftWallBody.CreateFixture2(leftWallBox, 0);

    // Create right wall body
    const rightWallBodyDef = new b2BodyDef();
    rightWallBodyDef.position.Set(width / 60, 0); // Adjusted position
    const rightWallBody = world.CreateBody(rightWallBodyDef);
    const rightWallBox = new b2PolygonShape();
    rightWallBox.SetAsBox(0.5, height / 30);
    rightWallBody.CreateFixture2(rightWallBox, 0);

    // Define sizes for the circles
    const sizes = [30, 40, 50]; // Small, medium, large

    // Create spheres
    const spheres = [];
    const numSpheres = 37; // Limit the number of spheres

    for (let i = 0; i < numSpheres; i++) {
      // Randomly select a size
      const size = sizes[Math.floor(Math.random() * sizes.length)];

      // Create the circle geometry and material
      const sphereGeometry = new THREE.CircleGeometry(size, 20);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        (Math.random() - 0.5) * width,
        Math.random() * height,
        0 // Set z to 0 for 2D effect
      );
      scene.add(sphere);
      spheres.push(sphere);

      // Create Box2D body for the sphere
      const bodyDef = new b2BodyDef();
      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.Set(sphere.position.x / 30, sphere.position.y / 30);
      const body = world.CreateBody(bodyDef);
      const circleShape = new b2CircleShape(size / 30);
      const fixtureDef = new b2FixtureDef();
      fixtureDef.shape = circleShape;
      fixtureDef.density = 1.0;
      fixtureDef.friction = 0.3;
      fixtureDef.restitution = 0.4; // Bounciness
      body.CreateFixture(fixtureDef);
      sphere.body = body;
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Step the Box2D world
      world.Step(1 / 60, 10, 10);

      // Update sphere positions
      spheres.forEach((sphere) => {
        const pos = sphere.body.GetPosition();
        sphere.position.set(pos.x * 30, pos.y * 30, 0);
        const angle = sphere.body.GetAngle();
        sphere.rotation.set(0, 0, angle);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThreeScene />
      {/* <App /> */}
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();