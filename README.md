(ES) Idioma: Español

# Tutorial (Paso a paso)

En este tutorial voy a explicar cómo realizar con Angular una **`PWA`** e implementar diferentes **`Service Workers con la lógica personalizada que necesitemos`**.

La aplicación del repositorio contiene un ejemplo con todo lo nombrado en el tutorial y a parte un componente personalizado para poder mostrar al usuario la oportunidad de instalar la aplicación.

## Paso 1
Primero, creamos nuestro proyecto de angular
```bash
ng new angular-pwa-sw-example
```


## Paso 2
Compilamos el proyecto en modo producción (output: ***/dist***).

```bash
ng build --prod
```
## Paso 3

Levantamos la aplicación con el paquete [http-server](https://www.npmjs.com/package/http-server) de npm con el siguiente comando para que evite cacheo.

```bash
http-server -p 8080 -c-1 dist/angular-pwa-sw-example
```

***Levantamos nuestra aplicación de esta manera porque el servidor de desarrollo de Angular ( `ng serve` ) no permite el uso de Service Workers.***

## Paso 4
Seguidamente ejecutamos la herramienta [Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=es) de Google para hacer la auditoría de nuestra web y saber si cumple los checks necesarios para ser una PWA.

![Lighthouse-Nueva Aplicación Básica Angular Resultados](screenshots/pwa-basic-angular.png)


Como podemos ver, nuestra aplicación no se puede considerar una PWA según los criterios de Lighthouse porque aún no tenemos ninguna implementación *(manifest, service workers, offline display, ...)* para que lo sea realmente.

## Paso 5
Con la ayuda de `@angular/cli` vamos a añadir las características de una pwa a nuestra aplicación fácilmente.

Ejecutamos en la raiz de nuestro proyecto angular:
```
ng add @angular/pwa
```
\
Automáticamente nos va a añadir una serie de nuevos archivos y va a añadir alguna que otra configuración a nuestro proyecto. 

![Cambios en ficheros al añadir pwa](screenshots/changed-files-angular-pwa-add.png)


- **angular.json:** 
  - manifest.json en assets
  - serviceWorker: true 
  - ngswConfigPath: archivo de configuración para el service worker ngsw
- **package.json:** Añade dependencia a `@angular/service-worker`
- **index.html:**
  - link a manifest.json
  - meta theme-color para cuando se "instale" en algún dispositivo
  - noscript html tag
- **manifest.json:** configuración de la aplicación para cuando se "instale" en el dispositivo
- **ngsw-config.json:** archivo de configuración y estrategias de cacheo para el service worker que crea angular.
- **app.module.ts:** registra e instala el service worker `ngsw-worker.js` *(auto generado por angular basado en ngsw-config.json)*
- **icons**: iconos en diferentes tamaños para usarse como icono de aplicación cuando se instale

## Paso 6
Ejecutamos de nuevo Lighthouse para volver a auditar nuestra aplicación y ver qué ha cambiado.

![Lighthouse-Despues de añadir @angular/pwa](screenshots/lighthouse-after-add-pwa.png)

Como podemos ver, nuestra aplicación ya se considera una PWA y tiene la capacidad de ser instalada, ser usada offline, cachear tanto index.html como assets, css, ...etc.

Lo único que podemos ver que nos faltaría para cumplir todos y cada uno de los requisitos son:
- **Redireccionar el tráfico HTTP a HTTPS**: *(Esto lo realizaríamos a nivel de servidor. Al ser una prueba en local falla este punto)*
- **Proveer un icono especial para apple**:  *Como bien indica, lo más recomendado para iOS sería añadir un apartado especial para un icono con un formato específico para cuando es "instalada".*


## 🚀 Service Workers personalizados
Angular por defecto nos genera un service worker basado en el archivo `ngsw-config.json` el cual nos permite realizar:
- Estrategias de cacheo
- Estrategias de refresco de caché
- Capacidad de mostrar la applicación offline
- Servicios para la comunicación con el Service Worker que nos permite:
  - Saber si está disponible/instalado
  - Saber si hay una versión nueva de la aplicación o de algún fichero en caché y permite forzar un reload
  - Saber si hay alguna notificación push, si el usuario hizo click en la notificación, ...etc

Y todo esto podemos gestionarlo desde cualquier componente ya que son servicios de angular y los podemos inyectar ***(SwUpdate & SwPush)***

\
Peeeeeero, hay un pequeño problema. Como ya hemos hablado, Angular genera en tiempo de compilación el service worker `ngsw-worker.js` con lo cual, cualquier lógica personalizada que le hayamos aplicado al fichero será eliminada ya que el fichero será sobreescrito.

### **Posibles soluciones**
Para solventar esto en el caso de que necesitemos una lógica personalizada añadida, hay alguna que otra posible solución:

- Podemos crear un service worker a parte en otro fichero e inyectarlo en el `index.html` como un service worker normal de cualquier aplicación y en este caso, podríamos tener instalados 2 service workers totalmente separados ***(ngsw-worker.js & custom-logic-worker.js).*** Pero el problema con esta solución y angular es que para tener 2 service workers necesitamos que actuen en diferente scope y tendríamos que crearnos una estructura basada en carpetas, lazy-loading en el proyecto y todo lo necesario para que en la carpeta dist haya un scope diferente para cada pagina y su service worker.
#### Solución sugerida
- Si por el contrario queremos tener toda la potencia y opciones que ya nos aporta angular service worker y a parte añadir una lógica personalizada tendríamos que realizar:
  - Paso 1:
    - Crear nuevo service worker que será nuestro wrapper para juntar el creado por defecto de angular y el nuestro personalizado o nuestra lógica personalizada. ***(custom-worker.js)***
    
  - Paso 2:
    - Usar en nuestro `custom-worker.js` el método `importScripts()`, el cual nos sirve para añadir de manera síncrona uno o varios scripts dentro de nuestro worker scope.
    - De esta manera, añadimos con importScripts() el sw de angular **ngsw-worker.js.** Así podemos tener en nuestro `custom-worker.js` todo el script que Angular nos autogenera y a parte añadir nuestra lógica personalizada.
  - Paso 3:
    - Registrar en app.module.ts nuestro `custom-worker.js` en vez de el auto-generado por angular.
  - Paso 4:
    - Cambiar la configuración de nuestro angular.json para que al compilar nos añada en la carpeta dist nuestro `custom-worker.js` a nivel raiz.
    


