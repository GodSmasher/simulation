# 3D Doppelpendel Simulation

Dieses Projekt demonstriert eine interaktive 3D-Simulation eines Doppelpendels. Die Anwendung kombiniert moderne Webtechnologien, um physikalische Dynamiken in Echtzeit zu visualisieren, Simulationsergebnisse zu speichern und statistische Daten grafisch darzustellen.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Technologien](#technologien)
- [Installation und Setup](#installation-und-setup)
  
## Überblick

In dieser Anwendung wird ein Doppelpendel in einer 3D-Umgebung simuliert. Der Benutzer kann Parameter wie Längen, Massen, Startwinkel, Dämpfung und Simulationsgeschwindigkeit über ein interaktives Formular anpassen. Die Simulation wird in Echtzeit visualisiert, während Diagramme den Verlauf der Winkel und der Gesamtenergie anzeigen. Außerdem werden Simulationsergebnisse in einer MongoDB-Datenbank gespeichert, sodass vergangene Läufe verglichen werden können.

## Features

- **3D-Visualisierung:**  
  Darstellung eines Doppelpendels mit realitätsnahen physikalischen Berechnungen (RK4-Integration) mittels [React Three Fiber](https://github.com/pmndrs/react-three-fiber).

- **Interaktive Steuerung:**  
  Anpassung von Simulationsparametern (Längen, Massen, Dämpfung, Startwinkel, Simulationsgeschwindigkeit) über ein benutzerfreundliches Formular.

- **Dynamische Diagramme:**  
  Anzeige von Echtzeit-Daten (Winkelverlauf und Energieverlauf) mit [Chart.js](https://www.chartjs.org/) und [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2).

- **Simulation speichern:**  
  Speicherung des aktuellen Simulationslaufs über einen Reset-Button; vergangene Simulationen werden unten in einer Übersicht angezeigt.

- **Backend Integration:**  
  Verwendung von Node.js, Express und Mongoose zur Bereitstellung einer RESTful API und Speicherung der Daten in MongoDB Atlas.

## Technologien

- **Frontend:**  
  - React  
  - React Three Fiber (3D-Rendering)  
  - React Chartjs 2 & Chart.js (Diagramme)  
  - HTML/CSS

- **Backend:**  
  - Node.js  
  - Express  
  - Mongoose

- **Datenbank:**  
  - MongoDB Atlas

- **Weitere Tools:**  
  - Git & GitHub  
  - Deployment-Services (z. B. Vercel/Netlify für das Frontend und Heroku/Render für das Backend)

## Installation und Setup

### Voraussetzungen

- Node.js (empfohlen: LTS-Version)
- npm (wird mit Node.js mitgeliefert)
- Git (optional, für Versionskontrolle)
- Ein MongoDB Atlas Account oder eine lokale MongoDB-Installation



