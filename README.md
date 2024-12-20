# UAS - PLANNER

## Descripción

Esta aplicación es una interfaz de usuario para operadores de drones, diseñada para procesar planes de vuelo basados en waypoints. Los usuarios pueden cargar sus planes de vuelo desde QGroundControl y recibir trayectorias realistas y completas. Aunque actualmente la funcionalidad se centra en el procesamiento de planes de vuelo, el objetivo final es crear una aplicación completa que permita:

- Generar planes de vuelo.
- Procesar trayectorias.
- Enviar planes a las autoridades para la aprobación.

Las trayectorias se procesarán en varias máquinas virtuales, cada una ejecutando el script [traj-runner](https://github.com/0xMastxr/traj-runner), que se encarga de recibir y procesar las trayectorias en orden.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone git@github.com:0xMastxr/uas-planner.git
   cd uas-planner

2. Instala las dependencias:
    ```bash
    npm install

## Uso

Para ejecutar la aplicación, utiliza el siguiente comando: ```npm run dev```. También debes ejecutar ```node traj-assigner``` para ejecutar el manejador de solicitudes.
    
Luego, abre tu navegador y dirígete a http://localhost:3000.

## Componentes

### FlightUploader.tsx
Este es el componente principal que permite a los usuarios subir planes de vuelo, asignar nombres personalizados y procesar las trayectorias. El estado de cada plan se muestra en función de su proceso actual: sin procesar, en cola, procesando, procesado, o error. Los resultados se pueden descargar como archivos CSV una vez procesados.