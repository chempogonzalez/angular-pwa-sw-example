# Tutorial (Paso a paso)

En este artículo vamos a explicar cómo realizar con Angular una **`PWA`** e implementar diferentes **`Service Workers con la lógica personalizada que necesitemos`**.


Primero, creamos nuestro proyecto de angular
```bash
ng new angular-pwa-sw-example
```
\
Compilamos el proyecto en modo producción (output: ***/dist***).

```bash
ng build --prod
```
\
Levantamos la aplicación con el paquete [http-server](https://www.npmjs.com/package/http-server) de npm con el siguiente comando para que evite cacheo.

```bash
http-server -p 8080 -c-1 dist/angular-pwa-sw-example
```

##### Levantamos nuestra aplicación angular de esta manera porque el servidor de desarrollo de Angular ( `ng serve` ) no permite el uso de Service Workers.

\
Seguidamente ejecutamos la herramienta **[Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=es)** de Google para hacer la auditoría de nuestra web y saber si cumple los checks necesarios para ser una PWA.

![Lighthouse-Nueva Aplicación Básica Angular Resultados](screenshots/pwa-basic-angular.png)
