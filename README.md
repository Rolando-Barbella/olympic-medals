Proyecto realizado con [Create React App](https://github.com/facebook/create-react-app)

# Olympic Medals

Una aplicación que se encarga de mostrar y actualizar un cuadro de medallas olimpicas de varios países

## Comandos

Para que la aplicación funcione, debes correr los siguientes dos comandos:

### `yarn start`

Corre la aplicacion en [http://localhost:3000](http://localhost:3000)

La página refresca automaticamente cada vez que realizamos un cambio.<br />
También tienes mensajes de errores y avisos en la consola.

## `yarn server`

Dispara el servidor con la data en [http://localhost:4000](http://localhost:4000)

El lugar donde la data vive en formato `json` se encuentra en el archivo `medals.json`, ahí puedes realizar cambios manuales si deseas.

Todo esto es logrado con la ayuda de [json-server](https://github.com/typicode/json-server)

## Como visualizar cada lección?

Supongamos quieres mirar el código de la lección 3, entonces sigue estos pasos:

- Dirigete al archivo al archivo madre `src/index`
- Cambia la siguiente linea `import App from './App` por `import App from './leccion-3/App`
