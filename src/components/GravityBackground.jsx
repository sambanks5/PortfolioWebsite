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
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const numSpheres = Math.floor((width * height) / 70000);

        const scene = new THREE.Scene();

        const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // Box2D setup
        const b2Vec2 = Box2D.Common.Math.b2Vec2;
        const b2BodyDef = Box2D.Dynamics.b2BodyDef;
        const b2Body = Box2D.Dynamics.b2Body;
        const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
        const b2World = Box2D.Dynamics.b2World;
        const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
        const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        // gravity pointing downwards
        const world = new b2World(new b2Vec2(0, -60), true);
        worldRef.current = world;

        const groundBodyDef = new b2BodyDef();
        groundBodyDef.position.Set(0, -height / 60);
        const groundBody = world.CreateBody(groundBodyDef);
        const groundBox = new b2PolygonShape();
        groundBox.SetAsBox(width / 30, 0.5);
        groundBody.CreateFixture2(groundBox, 0);

        // left wall body
        const leftWallBodyDef = new b2BodyDef();
        leftWallBodyDef.position.Set(-width / 60, 0);
        const leftWallBody = world.CreateBody(leftWallBodyDef);
        const leftWallBox = new b2PolygonShape();
        leftWallBox.SetAsBox(0.5, height / 30);
        leftWallBody.CreateFixture2(leftWallBox, 0);

        // right wall body
        const rightWallBodyDef = new b2BodyDef();
        rightWallBodyDef.position.Set(width / 60, 0);
        const rightWallBody = world.CreateBody(rightWallBodyDef);
        const rightWallBox = new b2PolygonShape();
        rightWallBox.SetAsBox(0.5, height / 30);
        rightWallBody.CreateFixture2(rightWallBox, 0);

        // top body
        const topBodyDef = new b2BodyDef();
        topBodyDef.position.Set(0, height / 60);
        const topBody = world.CreateBody(topBodyDef);
        const topBox = new b2PolygonShape();
        topBox.SetAsBox(width / 30, 0.5);
        topBody.CreateFixture2(topBox, 0);

        const sizes = [65, 50, 40, 35];
        const spheres = [];

        for (let i = 0; i < numSpheres; i++) {
            const size = sizes[Math.floor(Math.random() * sizes.length)];

            const sphereGeometry = new THREE.CircleGeometry(size, 9);
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xdcdee0 });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            const x = (Math.random() - 0.5) * (width - size * 2);
            const y = (Math.random() - 0.5) * (height - size * 2);

            sphere.position.set(x, y, 0); // Set z to 0 for 2D effect
            scene.add(sphere);
            spheres.push(sphere);

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

        const colors = [0xffffff, 0x59CD90, 0x3FA7D6, 0xFAC05E, 0xEE6352, 0x161925, 0xB1CC74]; //First is white as gets ignored anyway no idea why. 

        const linkSpheres = [];
        const numLinkSpheres = 7;
        const projectLinks = [
            { id: 1, url: "#", name: "About" },
            { id: 2, url: "#", name: "BetMonitor" },
            { id: 3, url: "#", name: "BetCalculator" },
            { id: 4, url: "#", name: "PlaysTV Scraper" },
            { id: 5, url: "#", name: "AudioSwitcher" },
            { id: 6, url: "#", name: "BackgroundChecker" },
            { id: 7, url: "#", name: "RecipeApp" },
        ];

        for (let i = 0; i < numLinkSpheres; i++) {
            const size = sizes[Math.floor(Math.random() * sizes.length)];

            const linkSphereGeometry = new THREE.CircleGeometry(size, 9);
            const linkSphereMaterial = new THREE.MeshBasicMaterial({ color: colors[i] });
            const linkSphere = new THREE.Mesh(linkSphereGeometry, linkSphereMaterial);

            const x = (Math.random() - 0.5) * (width - size * 2);
            const y = (Math.random() - 0.5) * (height - size * 2);

            linkSphere.position.set(x, y, 0); // Set z to 0 for 2D effect
            scene.add(linkSphere);
            linkSpheres.push(linkSphere);

            const bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_dynamicBody;
            bodyDef.position.Set(linkSphere.position.x / 30, linkSphere.position.y / 30);

            const body = world.CreateBody(bodyDef);
            const circleShape = new b2CircleShape(size / 30);
            const fixtureDef = new b2FixtureDef();
            fixtureDef.shape = circleShape;
            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.6;
            fixtureDef.restitution = 0.5;
            body.CreateFixture(fixtureDef);
            linkSphere.body = body;

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

            if (i === 0) {
                linkSphere.userData.toggleGravity = true;
                linkSphere.material.color.set(0xB14AED);
                linkSphere.userData.originalColor = {
                    r: linkSphere.material.color.r,
                    g: linkSphere.material.color.g,
                    b: linkSphere.material.color.b,
                };

                const squareGeometry = new THREE.PlaneGeometry(size * 2, size * 2);
                linkSphere.geometry = squareGeometry;

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
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(linkSpheres);

            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (hoveredObjectRef.current !== intersectedObject) {
                    setHoveredLink(intersectedObject.userData.projectId);
                    setTooltipTitle(intersectedObject.userData.name);
                    setTooltipOpen(true);
                    document.body.style.cursor = 'pointer';
                    if (hoveredObjectRef.current) {
                        gsap.to(hoveredObjectRef.current.material.color, {
                            r: hoveredObjectRef.current.userData.originalColor.r,
                            g: hoveredObjectRef.current.userData.originalColor.g,
                            b: hoveredObjectRef.current.userData.originalColor.b,
                            duration: 0.3,
                        });
                    }
                    gsap.to(intersectedObject.material.color, {
                        r: Math.min(intersectedObject.userData.originalColor.r * 4, 1),
                        g: Math.min(intersectedObject.userData.originalColor.g * 4, 1),
                        b: Math.min(intersectedObject.userData.originalColor.b * 4, 1),
                        duration: 0.3,
                    });
                    hoveredObjectRef.current = intersectedObject;
                }
            } else {
                setHoveredLink(null);
                setTooltipOpen(false);
                document.body.style.cursor = 'default';
                if (hoveredObjectRef.current) {
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
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(linkSpheres);
        
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (intersectedObject.userData.toggleGravity) {
                    setSelectedProject(null); // Set selected project to null to display aboutMe information
                } else {
                    console.log("Clicked on project with ID:", intersectedObject.userData.projectId);
                    setSelectedProject(intersectedObject.userData.projectId);
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
            mount.removeChild(renderer.domElement);
        };
    }, [setHoveredLink, setSelectedProject, worldRef]);

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