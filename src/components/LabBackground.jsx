import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Stars } from '@react-three/drei';
import * as THREE from 'three';

const NetworkLattice = () => {
    const ref = useRef();

    // Generate organic curvy lines or a grid?
    // Let's do a rotating Icosahedron wireframe for "security/structure"

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = t * 0.05;
        ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    });

    return (
        <group ref={ref}>
            <lineSegments>
                <edgesGeometry args={[new THREE.IcosahedronGeometry(2, 2)]} />
                <lineBasicMaterial color="#333" transparent opacity={0.3} />
            </lineSegments>
            <points>
                <icosahedronGeometry args={[2, 2]} />
                <pointsMaterial size={0.03} color="#444" transparent opacity={0.5} />
            </points>

            {/* Inner Core */}
            <mesh>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#000" wireframe transparent opacity={0.1} />
            </mesh>
        </group>
    );
};

const LabBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, background: '#050505' }}>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <fog attach="fog" args={['#050505', 3, 10]} />
                <NetworkLattice />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default LabBackground;
