import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const Model = ({ url = '', scale = 1, position }: { url: string; scale: number; position: [number, number, number] }) => {
    const gltf = useLoader(GLTFLoader, url);
    return <primitive object={gltf.scene} scale={scale} position={position} />;
};

interface CarData {
    url: string; // URL 3D модели
    position: [number, number, number]; // Позиция в виде кортежа
}

const carsUrlPos: { [key: string]: CarData } = {
    Koenigsegg: {
        url: '/img/car-model/koenigsegg_one.glb',
        position: [0., -1, 0]
    },
    /* 'Nissan GT - R': {
        url: '/img/car-model/nissan_gt-r.glb',
        position: [10, -10, 10]
    }, */
    'CR - V': {
        url: '/img/car-model/honda_cr-v.glb',
        position: [0, -3, -12]
    },
    'Rolls - Royce': {
        url: '/img/car-model/rolls-royce_ghost.glb',
        position: [0.10, -1.3, 1.2]
    },
};

interface ModelViewerProps {
    carName: keyof typeof carsUrlPos; // Используем ключи из carsUrlPos
}

const ModelViewer = ({ carName }: ModelViewerProps) => {
    const carData = carsUrlPos[carName];

    if (!carData) {
        // Если не найдена модель, можно возвратить пустой компонент или сообщение об ошибке
        return <img src="/img/car-detail/View2.png" alt="" />;
    }

    const { url, position } = carData;

    return (
        <Canvas style={{ width: '148px', height: '120px' }}>
            <ambientLight />
            <pointLight position={position} />
            <Model url={url} scale={1.3} position={position} />
            <OrbitControls />
        </Canvas>
    );
};

export default ModelViewer;