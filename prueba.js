/* Estado de las variables */
const state = { Y: 0, X: 0 }

/* Valores que introduce el usuario */

const MAX_X = 2
const MAX_Y = 10
const Z = 4

/* Llenado de la jarra */
const fillJug = (jugs, key = 'X', max = MAX_X) => ({ ...jugs, [key]: max })

/* Vaciado de la jarra */
const emptyJug = (jugs, key = 'X') => ({ ...jugs, [key]: 0 })

/* Transferencia de una a otra*/
const XToY = ({ X, Y }) => {
    const quantityNeededToFillY = MAX_Y - Y

    return {
        X: X > quantityNeededToFillY
            ? X - quantityNeededToFillY : 0,
        Y: X > quantityNeededToFillY
            ? Y + quantityNeededToFillY : Y + X
    }
}

const YToX = ({ X, Y }) => {
    const quantityNeededToFillX = MAX_X - X

    return {
        X: Y > quantityNeededToFillX
            ? Y - quantityNeededToFillX : 0,
        Y: Y > quantityNeededToFillX
            ? X + quantityNeededToFillX : Y + X
    }
}

/* Verifica si el estado actual ya existe */
const isRepeated = (path, { Y, X }) =>
    !!path.find(x => x.Y === Y && x.X === X)


    /* Funcion que recibe los parametros para hacer el calculo del camino mas corto */
    function getShortestPath(start, target) {

        /* Matrices que se utilizarann para almacenar la ruta mas corta y para almacenar los estados */
        const queue = []
        const path = []
    
        path.push(start)
        queue.push(path)
    
        while (queue.length) {
            /* El primer elemento de la cola se elimina y se almacena en la variable. */
            const lastPath = queue.shift()
            /*  El último estado se selecciona de la matriz de la última ruta */
            const lastState = lastPath[lastPath.length - 1]
    
            /* Si la cantidad en la jarra es igual al valor objetivo que está buscando, devuelve la lista del estado obtenido (ruta más corta). */
            if (target === lastState.X || target === lastState.Y)
                return lastPath
    
            /* Añadimos los posibles estados que se pueden generar a partir del último. */
            const states = new Set([fillJug(lastState), fillJug(lastState, 'Y', MAX_Y),
            XToY(lastState), YToX(lastState), emptyJug(lastState), emptyJug(lastState, 'Y')])
    
            /* Se ejecutan las siguientes instrucciones por cada estado obtenido en el paso anterior.
            Se revisa que el estado generado aún no está incluido en la ruta (ruta de la solución).
            En caso de que se cumpla la condición anterior, crea una nueva lista (nueva ruta) con los estados de la última ruta.
            En esta nueva ruta se agrega el nuevo estado de los jugs ( newPath.push(item) ), luego la nueva ruta se agrega a la cola.*/
            for (let item of states) {
                if (!isRepeated(lastPath, item)) {
                    const newPath = [...lastPath]
                    newPath.push(item)
                    queue.push(newPath)
                }
            }
        }
        
        /* Finalmente, si durante el ciclo repetitivo no se encuentra el estado objetivo, devuelve nulo. */
        return null
    }
    
    path = getShortestPath(state, Z)
    
    console.log(path)

    path = getShortestPath(state, Z)

console.log(JSON.stringify(path, null,'\t'))

document.write(JSON.stringify(path, null,'\t'))