import React, { useEffect, useRef, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { gsap } from "gsap";
import * as THREE from "three";
import Box2D from "box2dweb";

const GravityBackground = ({ setSelectedProject, toggleGravity, setHoveredLink, worldRef }) => {
    const mountRef = useRef(null);
    const hoveredObjectRef = useRef(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const areaRef = useRef(null);

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Calculate the number of spheres based on screen size
        const numSpheres = Math.floor((width * height) / 70000);

        // Create a scene
        const scene = new THREE.Scene();

        // Create an orthographic camera for 2D effect
        const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0); // Set background color to transparent
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
        const world = new b2World(new b2Vec2(0, -60), true);
        worldRef.current = world; // Store the world reference

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

        // Create top body
        const topBodyDef = new b2BodyDef();
        topBodyDef.position.Set(0, height / 60); // Adjusted position
        const topBody = world.CreateBody(topBodyDef);
        const topBox = new b2PolygonShape();
        topBox.SetAsBox(width / 30, 0.5);
        topBody.CreateFixture2(topBox, 0);

        // Define sizes for the circles
        const sizes = [75, 60, 50, 40];

        // Create spheres
        const spheres = [];

        for (let i = 0; i < numSpheres; i++) {
            // Randomly select a size
            const size = sizes[Math.floor(Math.random() * sizes.length)];

            // Create the circle geometry and material
            const sphereGeometry = new THREE.CircleGeometry(size, 9);
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x084c61 });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            // Ensure the circles are not placed outside the visible area
            const x = (Math.random() - 0.5) * (width - size * 2);
            const y = (Math.random() - 0.5) * (height - size * 2);

            sphere.position.set(x, y, 0); // Set z to 0 for 2D effect
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
            fixtureDef.friction = 0.6;
            fixtureDef.restitution = 0.5; // Bounce
            body.CreateFixture(fixtureDef);
            sphere.body = body;
        }

        // Define colors for the link spheres
        const colors = [0xD91E36, 0x33ff57, 0x3357ff, 0xff33a1, 0xffa133];

        // Create link spheres
        const linkSpheres = [];
        const numLinkSpheres = 5; // Number of link spheres
        const projectLinks = [
            { id: 1, url: "#", name: "?" },
            { id: 2, url: "#", name: "Bet Monitor" },
            { id: 3, url: "#", name: "BetCalc" },
            { id: 4, url: "#", name: "PlaysTV Scraper" },
            { id: 5, url: "#", name: "Contact" },
        ];

        // When creating the link spheres, store the original color in userData
        for (let i = 0; i < numLinkSpheres; i++) {
            // Randomly select a size
            const size = sizes[Math.floor(Math.random() * sizes.length)];

            // Create the circle geometry and material
            const linkSphereGeometry = new THREE.CircleGeometry(size, 9);
            const linkSphereMaterial = new THREE.MeshBasicMaterial({ color: colors[i] });
            const linkSphere = new THREE.Mesh(linkSphereGeometry, linkSphereMaterial);

            // Ensure the circles are not placed outside the visible area
            const x = (Math.random() - 0.5) * (width - size * 2);
            const y = (Math.random() - 0.5) * (height - size * 2);

            linkSphere.position.set(x, y, 0); // Set z to 0 for 2D effect
            scene.add(linkSphere);
            linkSpheres.push(linkSphere);

            // Create Box2D body for the link sphere
            const bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_dynamicBody;
            bodyDef.position.Set(linkSphere.position.x / 30, linkSphere.position.y / 30);

            const body = world.CreateBody(bodyDef);
            const circleShape = new b2CircleShape(size / 30);
            const fixtureDef = new b2FixtureDef();
            fixtureDef.shape = circleShape;
            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.6;
            fixtureDef.restitution = 0.5; // Bounciness
            body.CreateFixture(fixtureDef);
            linkSphere.body = body;

            // Add interactivity
            linkSphere.userData = {
                projectId: projectLinks[i].id,
                url: projectLinks[i].url,
                name: projectLinks[i].name,
                originalColor: {
                    r: linkSphere.material.color.r,
                    g: linkSphere.material.color.g,
                    b: linkSphere.material.color.b,
                },
            };

            // Use the first link sphere as the toggleGravity button and change to a different shape and colour
            if (i === 0) {
                linkSphere.userData.toggleGravity = true;
                linkSphere.material.color.set(0x7e00bd);
                linkSphere.userData.originalColor = {
                    r: linkSphere.material.color.r,
                    g: linkSphere.material.color.g,
                    b: linkSphere.material.color.b,
                };

                // Change to square geometry
                const squareGeometry = new THREE.PlaneGeometry(size * 2, size * 2);
                linkSphere.geometry = squareGeometry;

                // Update Box2D body shape to match square
                const squareShape = new b2PolygonShape();
                squareShape.SetAsBox(size / 30, size / 30);
                body.DestroyFixture(body.GetFixtureList());
                fixtureDef.shape = squareShape;
                body.CreateFixture(fixtureDef);
            }
        }

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(linkSpheres);
        
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (hoveredObjectRef.current !== intersectedObject) {
                    setHoveredLink(intersectedObject.userData.projectId); // Update hovered link
                    setTooltipTitle(intersectedObject.userData.name); // Set tooltip title
                    setTooltipOpen(true); // Show tooltip
                    document.body.style.cursor = 'pointer'; // Change cursor to pointer
                    if (hoveredObjectRef.current) {
                        // Change back to the original color
                        gsap.to(hoveredObjectRef.current.material.color, {
                            r: hoveredObjectRef.current.userData.originalColor.r,
                            g: hoveredObjectRef.current.userData.originalColor.g,
                            b: hoveredObjectRef.current.userData.originalColor.b,
                            duration: 0.3,
                        });
                    }
                    // Change to a slightly different color on hover
                    gsap.to(intersectedObject.material.color, {
                        r: Math.min(intersectedObject.userData.originalColor.r * 4, 1),
                        g: Math.min(intersectedObject.userData.originalColor.g * 4, 1),
                        b: Math.min(intersectedObject.userData.originalColor.b * 4, 1),
                        duration: 0.3,
                    });
                    hoveredObjectRef.current = intersectedObject;
                }
            } else {
                setHoveredLink(null); // Clear hovered link
                setTooltipOpen(false); // Hide tooltip
                document.body.style.cursor = 'default'; // Change cursor back to default
                if (hoveredObjectRef.current) {
                    // Change back to the original color
                    gsap.to(hoveredObjectRef.current.material.color, {
                        r: hoveredObjectRef.current.userData.originalColor.r,
                        g: hoveredObjectRef.current.userData.originalColor.g,
                        b: hoveredObjectRef.current.userData.originalColor.b,
                        duration: 0.3,
                    });
                    hoveredObjectRef.current = null;
                }
            }
        };

        const onClick = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(linkSpheres);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (intersectedObject.userData.toggleGravity) {
                    const currentGravity = worldRef.current.GetGravity();
                    let currentDirection;
                    if (currentGravity.y < 0) {
                        currentDirection = 'N';
                    } else if (currentGravity.y > 0) {
                        currentDirection = 'S';
                    } else if (currentGravity.x > 0) {
                        currentDirection = 'E';
                    } else {
                        currentDirection = 'W';
                    }

                    const directions = ['N', 'S', 'E', 'W'].filter(dir => dir !== currentDirection);
                    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                    toggleGravity(true, randomDirection); // Change gravity to a random direction that isn't the current one
                } else {
                    console.log("Clicked on project with ID:", intersectedObject.userData.projectId);
                    setSelectedProject(intersectedObject.userData.projectId);
                    toggleGravity(false); // Turn off gravity when modal is opened
                }
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("click", onClick);

		const animate = () => {
			requestAnimationFrame(animate);
			world.Step(1 / 60, 10, 10);
			spheres.forEach((sphere) => {
				const pos = sphere.body.GetPosition();
				sphere.position.set(pos.x * 30, pos.y * 30, 0);
				const angle = sphere.body.GetAngle();
				sphere.rotation.set(0, 0, angle);
			});
			linkSpheres.forEach((linkSphere) => {
				const pos = linkSphere.body.GetPosition();
				linkSphere.position.set(pos.x * 30, pos.y * 30, 0);
				const angle = linkSphere.body.GetAngle();
				linkSphere.rotation.set(0, 0, angle);
			});
		
			if (hoveredObjectRef.current) {
				const pos = hoveredObjectRef.current.position;
				setTooltipPosition({ x: pos.x + window.innerWidth / 2, y: -pos.y + window.innerHeight / 2 });
			}
		
			renderer.render(scene, camera);
		};

        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("click", onClick);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <Box>
            <Box ref={mountRef} style={{ width: "100%", height: "100vh" }} />
            <Tooltip
                title={tooltipTitle}
                open={tooltipOpen}
                placement="top"
                arrow
                PopperProps={{
                    anchorEl: {
                        getBoundingClientRect: () => {
                            return new DOMRect(
                                tooltipPosition.x,
                                tooltipPosition.y,
                                0,
                                0
                            );
                        },
                    },
                }}
            >
                <Box ref={areaRef} sx={{ position: "absolute", top: tooltipPosition.y, left: tooltipPosition.x }} />
            </Tooltip>
        </Box>
    );
};

export default GravityBackground;