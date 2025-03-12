# Aplicación de Usuarios Aleatorios

Esta es una aplicación web que genera una lista de 10 usuarios aleatorios utilizando la API de RandomUser.me. La aplicación está construida con Spring Boot para el backend y HTML/CSS/JavaScript para el frontend.

## Tecnologías Utilizadas

- Backend:
  - Java 11
  - Spring Boot 2.7.0
  - Spring WebFlux
  - Lombok
  
- Frontend:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

## Uso de WebFlux

Esta aplicación utiliza Spring WebFlux para el manejo de peticiones HTTP de manera reactiva. WebFlux proporciona un modelo de programación no bloqueante que permite manejar un gran número de conexiones concurrentes con menos recursos. En nuestra implementación, utilizamos `Flux` para procesar el stream de datos de usuarios de manera eficiente, permitiendo una mejor gestión de la memoria y un rendimiento optimizado en comparación con aproximaciones tradicionales. La naturaleza reactiva de WebFlux nos permite procesar los datos de usuarios a medida que llegan, sin necesidad de esperar a que se complete toda la respuesta.

## Requisitos Previos

- Java 11 o superior
- Maven 3.6 o superior

## Instalación y Ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/Erneston97/Bootcam-nttdata-salesforce.git
cd Bootcam-nttdata-salesforce
```

2. Compilar el proyecto:
```bash
mvn clean install
```

3. Ejecutar la aplicación:
```bash
mvn spring-boot:run
```

4. Abrir el navegador y visitar:
```
http://localhost:8080
```

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── randomusers/
│   │               ├── controller/
│   │               │   └── UserController.java
│   │               ├── model/
│   │               │   └── User.java
│   │               ├── service/
│   │               │   └── UserService.java
│   │               └── RandomUsersApplication.java
│   └── resources/
│       └── static/
│           ├── css/
│           │   └── styles.css
│           ├── js/
│           │   └── app.js
│           └── index.html
```

## Características

- Genera una lista de 10 usuarios aleatorios
- Muestra información detallada de cada usuario:
  - Nombre
  - Género
  - Ubicación
  - Correo electrónico
  - Fecha de nacimiento
  - Fotografía
- Interfaz responsiva y moderna
- Diseño atractivo con efectos hover en las tarjetas de usuario

## API Endpoints

- GET `/api/users`: Retorna una lista de 10 usuarios aleatorios