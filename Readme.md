# 3D Doppelpendel Simulation

Dieses Projekt demonstriert eine interaktive 3D-Simulation eines Doppelpendels. Die Anwendung kombiniert moderne Webtechnologien, um physikalische Dynamiken in Echtzeit zu visualisieren, Simulationsergebnisse zu speichern und statistische Daten grafisch darzustellen.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Technologien](#technologien)
- [Installation und Setup](#installation-und-setup)
- [Verwendung](#verwendung)
- [Backend API](#backend-api)
- [Ausblick](#ausblick)
- [Lizenz](#lizenz)

## Überblick

In dieser Anwendung wird ein Doppelpendel in einer 3D-Umgebung simuliert. Der Benutzer kann Parameter wie Längen, Massen, Dämpfung, Startwinkel und Simulationsgeschwindigkeit über ein interaktives Formular anpassen. Die Simulation wird in Echtzeit visualisiert, während Diagramme den Verlauf der Winkel und der Gesamtenergie anzeigen. Zusätzlich werden Simulationsergebnisse in einer MongoDB-Datenbank gespeichert, sodass vergangene Läufe analysiert und verglichen werden können.

## Features

- **3D-Visualisierung:**  
  Darstellung eines Doppelpendels mit realitätsnahen physikalischen Berechnungen (RK4-Integration) mittels [React Three Fiber](https://github.com/pmndrs/react-three-fiber).

- **Interaktive Steuerung:**  
  Anpassung von Simulationsparametern (Längen, Massen, Dämpfung, Startwinkel, Simulationsgeschwindigkeit) über ein benutzerfreundliches Formular.

- **Dynamische Diagramme:**  
  Anzeige von Echtzeit-Daten (Winkelverlauf und Energieverlauf) mit [Chart.js](https://www.chartjs.org/) und [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2).

- **Simulation speichern:**  
  Speicherung des aktuellen Simulationslaufs per Reset-Button. Vorherige Läufe werden in einer Übersicht angezeigt.

- **Backend Integration:**  
  Verwendung von Node.js, Express und Mongoose zur Bereitstellung einer RESTful API sowie Speicherung der Simulationsergebnisse in MongoDB Atlas.

## Technologien

- **Frontend:**  
  - React  
  - React Three Fiber (3D-Rendering)  
  - React Chartjs 2 & Chart.js (Diagramme)  
  - HTML / CSS

- **Backend:**  
  - Node.js  
  - Express  
  - Mongoose

- **Datenbank:**  
  - MongoDB Atlas

- **Weitere Tools:**  
  - Git & GitHub  
  - Deployment-Dienste (z. B. Vercel/Netlify für das Frontend und Heroku/Render für das Backend)

## Installation und Setup

### Voraussetzungen

- Node.js (empfohlen: LTS-Version)
- npm (wird mit Node.js mitgeliefert)
- Git (optional, für Versionskontrolle)
- Ein MongoDB Atlas Account oder eine lokale MongoDB-Installation

## Verwendung
Simulation anpassen:
Nutze das Parameterformular, um Längen, Massen, Dämpfung, Startwinkel und Simulationsgeschwindigkeit zu ändern.

Simulation beobachten:
Die 3D-Szene zeigt das Doppelpendel in Echtzeit, und Diagramme visualisieren den Verlauf der Winkel (θ1, θ2) sowie den Energieverlauf.

Simulation speichern:
Durch Drücken des "Reset & Save Run"-Buttons wird der aktuelle Simulationslauf gespeichert und in einer Übersicht der vorherigen Simulationen angezeigt.

## Backend API
Die RESTful API stellt folgende Endpunkte bereit:

GET /
Liefert eine Bestätigung, dass der Server läuft.

POST /api/simulations
Speichert ein Simulationsergebnis.
Beispiel-Request-Body:

{
  "parameters": {
    "L1": 2,
    "L2": 2,
    "m1": 1,
    "m2": 1,
    "damping": 0.1,
    "theta1": 0.785,
    "theta2": 1.047,
    "simulationSpeed": 1
  },
  "resultData": {
    "time": [0, 0.2, 0.4, ...],
    "theta1": [0.78, 0.79, ...],
    "theta2": [1.04, 1.03, ...],
    "energy": [<wert>, <wert>, ...]
  }
}

## Ausblick
Weitere Erweiterungsmöglichkeiten:

Erweiterte Visualisierungen:
Zusätzliche Diagramme zur Darstellung weiterer Messgrößen wie Geschwindigkeit oder Energie.

Interaktivere Steuerungen:
Erweiterte Drag-and-Drop-Funktionen oder Echtzeit-Interaktionen.

Datenexport:
Möglichkeit, Simulationsergebnisse als CSV oder JSON herunterzuladen.

Benutzerverwaltung:
Authentifizierung und personalisierte Simulationen.

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert – siehe LICENSE für Details.


