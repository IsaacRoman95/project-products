<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Sobre el proyecto
<p id="description">Aplicación web sobre ventas y productos mediante usuarios autenticados.</p>

<h2>🛠️ Installation Steps:</h2>
<p>Para desplegar el proyecto de forma local puede usted seguir los siguientes pasos</p>
<br>
<p>1. Clona el repositorio:</p>

```
gh repo clone IsaacRoman95/project-products
```
<br>

<p>2. Instala las dependencias PHP con Composer:</p>

```
composer install
```
<br>

<p>3. Copia el archivo .env.example y renómbralo a .env. Luego configura las variables de entorno según tu entorno local:</p>
<p>Se recomienda mantener la estructura y la configurar mencionada en el archivo de .env.example puesto que alli ya se realizó la configuración correspondiente a la base de datos, asi como el envio de los correos de confirmación.</p>

```
cp .env.example .env
```
<br>

<p>4. Genera la clave de aplicación:</p>

```
php artisan key:generate
```
<br>

<p>5. Creación del Enlace Simbólico:</p>
<p>Esto con el fin de poder acceder a los archivos almacenados en storage/app/public desde public/storage</p>

```
php artisan storage:link
```
<br>

<p>6. Crea una base de datos en mysql con el nombre dbproducts</p>
<p>Es importante mantener el mismo nombre para que no existan conflictos al momento de ejecutar las migraciones de la base de datos.</p>

```
CREATE DATABASE IF NOT EXISTS dbproducts;
```
<p>En el caso que usted decida crear la base de datos con otro nombre debe especificar ese nombre de su base de datos en el archivo .env</p>

<br>

<p>7. Ejecuta las migraciones y los seeders</p>
<p>Esto generará de forma automática las tablas de la base de datos y sus respectivos registros de pruebas.</p>

```
php artisan migrate --seed
```
<br>

<p>8. Ejecuta la aplicación</p>
<p>Por ultimo para ejecutar la aplicación, ubícate en el proyecto y escribe los siguientes comandos en consolas diferentes. De esta forma podrás inicializar el servidor y poder probar la página web.</p>

```
npm run dev
php artisan serve
```

<br>

<h2>CAPTURAS DE LA APP</h2>
<h3>PAGINA DE INICIO</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/8d4436b3-2162-4445-8965-6585ac04a4a6)

<h3>PAGINA DE REGISTRO</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/b6f282dd-b0d0-401c-ad89-148527dc2e65)

<h3>Pagina de Login</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/5718fdf0-2e80-4d31-92cd-98cf2f52e793)

<h3>Dashboard</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/3d93ba4a-1c84-4784-9166-ae1d5b46a7c3)

<h3>LISTA DE VENTAS REALIZADAS</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/d0fcfc92-e3bb-4ac2-92bd-3d66b51ffd1f)

<h3>Nueva venta</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/4276d21a-cded-4a28-8162-b0fdef8fe8f7)

<h3>Agregando productos</h3>

 ![image](https://github.com/IsaacRoman95/project-products/assets/81668182/3282aecc-0ede-4b25-9f10-28ec90a040b2)

<h3>Guardando la venta </h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/5e6c2a19-efd1-4c74-90e3-f2d39db78861)

<h3>Detalle de la venta</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/0544ebe3-1a73-4134-a7c6-8774f082e544)

<h3>Lista de Productos</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/51483170-30aa-4a85-bbdd-cef2883ece7b)

<h3>Editar Producto</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/245b7ac9-3c37-4372-8530-c3931b11432b)

<h3>Lista de grupos</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/08646bb2-ca32-4c93-a419-75bd30a95fea)

<h3>Lista de subgrupos</h3>

![image](https://github.com/IsaacRoman95/project-products/assets/81668182/449d43ae-ab33-460d-a877-f26c359d002b)

<br>
<h2>💻 Algunos de los packages utilizados fueron</h2>

Technologies used in the project:

*   Laravel
*   Laravel Breeze
*   Spatie Laravel Permissions
*   Carbon
*   Blueprint
*   Inertia

Extra:

*    ReactJS
*    TailwindCSS
*    ToastJS

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
