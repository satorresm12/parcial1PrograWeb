# ShopHub

Aplicación de productos hecha con Next.js. Incluye un carrito global manejado con React Context.

## Cómo ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Validación

Para revisar que el código no tenga errores de estilo, ejecutar:

```bash
npm run lint
```

También se puede comprobar la compilación completa con:

```bash
npm run build
```


## Decisiones de Arquitectura y Cambios del Parcial

### Punto 1: Evolución del Contexto

En el preparcial, `CartContext` solamente permitía agregar productos y contar la cantidad total de artículos. Para este parcial se amplió el modelo del carrito. Ahora `items` guarda cada producto una sola vez y cada producto tiene la propiedad `quantity`, que indica cuántas unidades fueron seleccionadas.

También se agregaron las operaciones `increaseQuantity`, `decreaseQuantity`, `removeFromCart` y `clearCart`. Para asegurar la inmutabilidad, las funciones usan `setItems` con la versión anterior del estado y construyen un arreglo nuevo. Se usan ciclos `for`, `filter` y el operador spread (`...`) para copiar productos y cambiar solamente la cantidad necesaria. Nunca se modifica directamente el arreglo anterior.

Por ejemplo, al aumentar la cantidad se copia el producto con `{ ...item, quantity: item.quantity + 1 }`. Al disminuirlo, se agrega al nuevo arreglo solamente si su cantidad todavía es mayor que cero. De esta forma el estado anterior se conserva y React puede detectar correctamente cada cambio.

### Punto 2: Cálculo de Totales

El contexto calcula `totalItems` sumando la propiedad `quantity` de todos los productos. También calcula `totalPrice` multiplicando el precio de cada producto por su cantidad y sumando los resultados.

Estos valores se calculan en cada render con un ciclo `for` y variables acumuladoras que empiezan en cero. No se guardan como estados separados, porque serían datos repetidos que pueden obtenerse directamente desde `items`. Así se evita tener estados que puedan quedar desactualizados. Después, `totalItems` y `totalPrice` se entregan mediante el Context para que el Header y el checkout los puedan utilizar.

### Punto 3: Arquitectura del Formulario

Se creó la ruta `/checkout` en `src/app/checkout/page.tsx`. Esta vista es un componente de cliente porque necesita `useState` y `useCart`. El resumen de compra obtiene los productos, las cantidades, los subtotales y el total desde el estado global del carrito.

El formulario está controlado por React. El nombre, el correo, el método de pago y el checkbox de términos tienen un estado propio. Cada input usa `value` o `checked` y actualiza su estado con `onChange`. El envío usa `preventDefault()` para evitar la recarga normal del navegador.

Para la validación se guarda qué campos ya fueron visitados. Los errores del nombre y del correo solo aparecen cuando el campo pierde el foco mediante `onBlur`. El nombre debe tener mínimo cinco caracteres y el correo debe cumplir un formato básico. El botón queda deshabilitado si existe algún dato inválido, si no se seleccionó un método de pago, si no se aceptaron los términos o si la orden está siendo procesada.

Al confirmar, se simula una espera asíncrona con `setTimeout`. Durante ese tiempo se muestra `Procesando...` y se deshabilita el botón para evitar envíos duplicados. Cuando termina, se ejecuta `clearCart()`, se reinician los campos del formulario y se muestra el mensaje de pedido completado.

La implementación utiliza Next.js con App Router, React Context para el estado global, React hooks (`useState` y `useContext`) para controlar la interfaz y clases de Tailwind CSS para los estilos.

Desde el resumen de compra, cada producto tiene un botón `Eliminar` que usa `removeFromCart(id)`. Al presionarlo, el producto desaparece y se actualizan el total y el contador del Header.

En la página de detalle de cada producto se agregó un control de cantidad con botones `+` y `−`. Estos botones usan `increaseQuantity` y `decreaseQuantity` del contexto global. Al disminuir una cantidad de 1, el producto se elimina automáticamente del carrito.

En el detalle del producto, el botón `−` permanece visible y se deshabilita cuando la cantidad es cero. En el checkout se agregó el botón `Vaciar carrito`, que ejecuta `clearCart()` y deja el contador en cero.
